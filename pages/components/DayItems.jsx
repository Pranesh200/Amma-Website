import {
  Checkbox,
  CheckboxGroup,
  Stack,
  Button,
  Box,
  useToast,
  Spinner,
  Flex,
  Input,
  NumberInput,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
function DayItems({ customerName, customerEmail }) {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [quantityState, setQuantityState] = useState({});
  const allChecked = Object.values(checkedItems).flat()?.length === 21;
  const isIndeterminate =
    Object.values(checkedItems).flat()?.length > 0 && !allChecked;
  const toast = useToast();

  useEffect(() => {
    // Fetch the menu data from the API endpoint
    setLoading(true);
    const fetchMenu = async () => {
      const res = await fetch("/api/menu");
      const data = await res.json();
      console.log("data", data);
      setMenu(data);
      setLoading(false);
    };
    fetchMenu();
    const initialCheckedItems = {};
    Object.keys(menu).forEach((day) => {
      initialCheckedItems[day] = [];
    });
    setCheckedItems(initialCheckedItems);
  }, []);

  const handleCheckboxChange = (day, values) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [day]: values,
    }));
  };
  const handleQuantityChange = (day, itemName, quantity) => {
    setCheckedItems((prev) => {
      const foundIndex = prev[day]?.findIndex(
        (item) => item.itemName === itemName
      );
      if (foundIndex === -1) {
        // item not found, add new item to the list
        return {
          ...prev,
          [day]: [...prev[day], { itemName, quantity, isChecked: true }],
        };
      } else {
        // item found, update the properties
        const updatedItems = prev.hasOwnProperty(day) ? [...prev[day]] : [];
        updatedItems[foundIndex] = {
          ...updatedItems[foundIndex],
          quantity,
          isChecked: true,
        };
        return {
          ...prev,
          [day]: updatedItems,
        };
      }
    });
  };

  const isChecked = (day, item) => {
    return checkedItems[day]?.some((i) => i === item);
  };

  const handleAllCheckboxChange = (day, checked) => {
    const values = checked ? menu[day].map((item) => item.item_name) : [];
    handleCheckboxChange(day, values);
  };

  const handleSubmit = async () => {
    try {
      const selectedItems = Object.entries(checkedItems).reduce(
        (acc, [day, items]) => {
          const selected = items?.map((item) => ({
            name: item,
            quantity: quantityState[day]?.[item] || 1, // Use quantityState if available, otherwise default to 1
          }));
          return [...acc, ...selected];
        },
        []
      );
      const checkedItemsString = JSON.stringify(checkedItems);


      const response = await axios.post("/api/checked-items", {
        customerName,
        customerPhone: customerEmail,
        checkedItems,
      });
      toast({
        title: "Submitted!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (response.status == 200) {
        const emailResponse = await axios.post("/api/send-grid", {
          subject: "Order Confirmation",
          customerName,
          customerPhone: customerEmail,
          checkedItems,
        });
      }
    } catch (error) {
      toast({
        title: "Not Submitted",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
      console.log(customerName);
      console.log(customerEmail);
      console.log(checkedItems);
    }
  };

  return (
    <>
      {" "}
      {loading && <Spinner color="white"></Spinner>}
      <Heading as="h4" fontSize="20px" color="white">
        Please click the checkbox of the item you would like, and enter quantity
        (numbers only)
      </Heading>
      <Heading as="h4" fontSize="20px" color="orange">
        If the order is successful, you will see a green success message and
        recieve an email confirmation (Please contact me if you do not receive
        an email or confirmation):
      </Heading>
      <Box display="flex" flexDirection="column">
        {Object.entries(menu).map(([day, items]) => (
          <Box key={day} mb={4}>
            <CheckboxGroup
              value={checkedItems[day]}
              onChange={(values) => handleCheckboxChange(day, values)}>
              <Checkbox
                color="white"
                isChecked={checkedItems[day]?.length === items?.length}
                isIndeterminate={
                  checkedItems[day]?.length > 0 &&
                  checkedItems[day]?.length < items?.length
                }
                onChange={(e) =>
                  handleAllCheckboxChange(day, e.target.checked)
                }>
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}>
                  {day}
                </span>
              </Checkbox>
              {items.length > 0 && (
                <Stack pl={6} mt={1} spacing={1}>
                  {items?.map((item) => (
                    <Flex key={item}>
                      <Checkbox
                        checked={isChecked(day, item)}
                        value={item}
                        color="white">
                        {item}
                      </Checkbox>
                      <Input
                        ml={2}
                        placeholder="Quantity"
                        type="number"
                        color="white"
                        default={1}
                        min={1}
                        max={10}
                        pattern="^[0-9]*$"
                        inputMode="numeric" // Added this line to restrict input to only numbers
                        onChange={(e) =>
                          handleQuantityChange(day, item, e.target.value)
                        }
                      />
                    </Flex>
                  ))}
                  <NumberInput step={5} defaultValue={15} min={10} max={30} />
                </Stack>
              )}
            </CheckboxGroup>
          </Box>
        ))}
      </Box>
      <Button mt={4} colorScheme="orange" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default DayItems;
