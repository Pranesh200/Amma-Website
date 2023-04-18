import {
  VStack,
  useToast,
  Box,
  Button,
  Heading,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertPop from "./AlertPop";
import { createClient } from "@supabase/supabase-js";
import OrderTable from "./OrderTable";
import ItemTable from "./ItemTable";

// Initialize a new Supabase client
const supabase = createClient(
  "https://bpnihamszdrqhtpvaizk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmloYW1zemRycWh0cHZhaXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNDEzMjcsImV4cCI6MTk5MzcxNzMyN30.HbXoEwm4pYh8W6tStK-0Uz_yIArLRL6I75p1a8eKNhk"
);

export default function MenuBuilder() {
  const toast = useToast();
  const [orders, setOrders] = useState();
  const mystyle = {
    gap: "64px",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const day = data.day_of_week;
    console.log(day);
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*, menu!inner(*)")
      .eq("menu.day_of_week", day);
    if (error) {
      console.log(error);
      toast({
        title: "Error occurred.",
        description: "Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      console.log(orders);
      setOrders(orders);
    }
  };
  console.log("WE HERE", orders);

  return (
    <>
      <VStack>
        <Box>
          <div style={mystyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack mb={20}>
                <Heading as="h4" fontSize="20px" color="white">
                  Item Day:
                </Heading>
                {errors.lastname && (
                  <AlertPop title={errors.lastname.message} />
                )}
                <Select
                  bg="white"
                  color="black"
                  placeholder="Select day of the week"
                  {...register("day_of_week", {
                    required: "Please select a day of the week",
                  })}>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Select>
                <Button
                  borderRadius="md"
                  bg="rgb(255, 79, 18)"
                  _hover={{ bg: "cyan.200" }}
                  variant="ghost"
                  type="submit">
                  Submit
                </Button>
              </VStack>
            </form>
          </div>
        </Box>
        {orders && <OrderTable orders={orders} />}
      </VStack>
      {orders && <ItemTable orders={orders} />}
    </>
  );
}
