import { VStack, Input, useToast, Box, Button, Heading, Divider } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertPop from "./AlertPop";
import DayItems from "./DayItems";
import Stats from "./Stats";
export default function Builder() {
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
    const onSubmit = (data, checkedItems) => {
        console.log("Customer Name:", data.customerName);
        console.log("Phone Number:", data.phoneNumber);
        console.log("Checked Items:", checkedItems);
        toast({
            title: "Submitted!",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        setData(data);
    };


    return (
        <Box>
            <div style={mystyle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack mb={20}>
                        <Heading as="h4" fontSize="20px" color='white'>
                            Your Name:
                        </Heading>
                        <Input
                            type="text"
                            color='white'
                            _placeholder={{ color: 'lightgray' }}
                            placeholder="Customer Name"
                            {...register("customerName", {
                                required: "Please enter Customer's name",
                                message: "Please enter a valid name",
                                minLength: 3,
                                maxLength: 100
                            })}
                        />
                        {errors.customerName && <AlertPop title={errors.customerName.message} />}
                        <Heading as="h4" fontSize="20px" color='white'>
                            Your Email:
                        </Heading>
                        <Input
                            type="email"
                            color='white'
                            _placeholder={{ color: 'lightgray' }}
                            placeholder="example@domain.com"
                            {...register("customerEmail", {
                                required: "Please enter an email address",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />
                        {errors.customerEmail && <AlertPop title={errors.customerEmail.message} />}
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

            {data && (
                <DayItems customerName={data.customerName} customerEmail={data.customerEmail} />
            )}

        </Box>
    );
}
