import { Checkbox, CheckboxGroup, Stack, Button, Box, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function DayItems({ customerName, customerPhone }) {
    const [menu, setMenu] = useState({});
    const [checkedItems, setCheckedItems] = useState({});
    const allChecked = Object.values(checkedItems).flat()?.length === 21
    const isIndeterminate = Object.values(checkedItems).flat()?.length > 0 && !allChecked
    const toast = useToast();

    useEffect(() => {
        // Fetch the menu data from the API endpoint
        const fetchMenu = async () => {
            const res = await fetch("/api/menu");
            const data = await res.json();
            console.log("data", data);
            setMenu(data);
        };
        fetchMenu();
        const initialCheckedItems = {};
        Object.keys(menu).forEach(day => {
            initialCheckedItems[day] = [];
        });
        setCheckedItems(initialCheckedItems);
    }, []);



    const handleCheckboxChange = (day, values) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [day]: values
        }))
    }

    const handleAllCheckboxChange = (day, checked) => {
        const values = checked ? menu[day].map(item => item.item_name) : []
        handleCheckboxChange(day, values)
    }

    const handleSubmit = async () => {
        try {
            console.log("HEREEEE")
            const response = await axios.post('/api/checked-items', {
                customerName,
                customerPhone,
                checkedItems
            })
            toast({
                title: "Submitted!",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            console.log("submit", response)
        } catch (error) {
            console.log(customerName)
            console.log(customerPhone)
            console.log(checkedItems)
        }
    }


    return (
        <>
            {console.log(menu)}
            <Box display="flex" flexDirection="column">
                {Object.entries(menu).map(([day, items]) => (
                    <Box key={day} mb={4}>
                        <CheckboxGroup value={checkedItems[day]} onChange={(values) => handleCheckboxChange(day, values)}>
                            <Checkbox
                                color="white"
                                isChecked={checkedItems[day]?.length === items?.length}
                                isIndeterminate={checkedItems[day]?.length > 0 && checkedItems[day]?.length < items?.length}
                                onChange={(e) => handleAllCheckboxChange(day, e.target.checked)}
                            >
                                <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{day}</span>
                            </Checkbox>
                            {items.length > 0 && (
                                <Stack pl={6} mt={1} spacing={1}>
                                    {items.map(item => (
                                        <Checkbox key={item} value={item} color="white">
                                            {item}
                                        </Checkbox>
                                    ))}
                                </Stack>
                            )}
                        </CheckboxGroup>
                    </Box>
                ))}
            </Box>

            <Button mt={4} colorScheme="orange" onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default DayItems
