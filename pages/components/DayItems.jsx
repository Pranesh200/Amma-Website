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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

function DayItems({ customerName, customerPhone }) {
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

  useEffect(() => {
    console.log("CHECK", checkedItems);
  }, [checkedItems]);

  const handleCheckboxChange = (day, values) => {
    console.log("HELLLLLo");
    setCheckedItems((prevState) => ({
      ...prevState,
      [day]: values,
    }));
  };
  const handleQuantityChange = (day, itemName, quantity) => {
    setCheckedItems((prev) => {
      const foundIndex = prev[day].findIndex(
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
        const updatedItems = [...prev[day]];
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
    console.log(
      "HERE",
      checkedItems[day]?.some((i) => i === item)
    );
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
          const selected = items.map((item) => ({
            name: item,
            quantity: quantityState[day]?.[item] || 1, // Use quantityState if available, otherwise default to 1
          }));
          return [...acc, ...selected];
        },
        []
      );

      const response = await axios.post("/api/checked-items", {
        customerName,
        customerPhone,
        checkedItems,
      });

      toast({
        title: "Submitted!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("submit", response);
    } catch (error) {
      console.log(customerName);
      console.log(customerPhone);
      console.log(checkedItems);
    }
  };

  return (
    <>
      {" "}
      {loading && <Spinner color="white"></Spinner>}
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
                  {items.map((item) => (
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
                        onChange={(e) =>
                          handleQuantityChange(day, item, e.target.value)
                        }
                      />
                    </Flex>
                  ))}
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
