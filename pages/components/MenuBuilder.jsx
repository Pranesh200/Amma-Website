import { VStack, Input, useToast, Box, Button, Heading, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertPop from "./AlertPop";
import DayItems from "./DayItems";
import Stats from "./Stats";
import { createClient } from "@supabase/supabase-js";


export default function MenuBuilder() {
    // Initialize a new Supabase client
    const supabase = createClient(
        "https://bpnihamszdrqhtpvaizk.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmloYW1zemRycWh0cHZhaXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNDEzMjcsImV4cCI6MTk5MzcxNzMyN30.HbXoEwm4pYh8W6tStK-0Uz_yIArLRL6I75p1a8eKNhk"
    );

    // Define the data to be inserted into the menu table
    const sampleData = {
        item_name: "Cheeseburger",
        day_of_week: "Monday",
    };

    const toast = useToast();
    const [data, setData] = useState();
    const mystyle = {
        gap: "64px"
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        const insertData = {
            item_name: data.item_name,
            day_of_week: data.day_of_week,
            start_date: new Date(Date.now()),
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };

        //        Use the Supabase client to insert the data into the menu table
        supabase
            .from("menu")
            .insert(insertData)
            .then((result) => {
                console.log("RESULT", result);
            })
            .catch((error) => {
                console.log("ERROR", error);
            });
        console.log(data.item_name);
        toast({
            title: "Submitted!",
            status: "success",
            duration: 3000,
            isClosable: true
        });

        setData(data);
    };
    console.log(data);
    console.log(errors)

    return (
        <Box>
            <div style={mystyle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack mb={20}>
                        <Heading as="h4" fontSize="20px" color='white'>
                            Item Name:
                        </Heading>
                        <Input
                            type="text"
                            color='white'
                            _placeholder={{ color: 'inherit' }}

                            placeholder="Item Name"
                            {...register("item_name", {
                                required: "Please enter item name",
                                minLength: 3,
                                maxLength: 100
                            })}
                        />
                        <Heading as="h4" fontSize="20px" color='white'>
                            Item Day:
                        </Heading>
                        {errors.lastname && <AlertPop title={errors.lastname.message} />}
                        <Select bg='white' color='black' placeholder='Select day of the week' {...register("day_of_week", {
                            required: "Please select a day of the week"
                        })}>
                            <option value='Monday'>Monday</option>
                            <option value='Tuesday'>Tuesday</option>
                            <option value='Wednesday'>Wednesday</option>
                            <option value='Thursday'>Thursday</option>
                            <option value='Friday'>Friday</option>
                            <option value='Saturday'>Saturday</option>
                            <option value='Sunday'>Sunday</option>
                        </Select>
                        <Button
                            borderRadius="md"
                            bg="rgb(255, 79, 18)"
                            _hover={{ bg: "cyan.200" }}
                            variant="ghost"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </VStack>
                </form>
            </div>
        </Box>
    );
}
