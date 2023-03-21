import {
    Heading,
    HStack,
    Stack,
    Stat,
    StatHelpText,
    StatLabel
} from "@chakra-ui/react";
import React from "react";

export default function Stats(props) {
    return (
        <Stat mt={5}>
            <Heading my={2} as="h4" fontSize="20px" color='white'>
                Submitted Result
            </Heading>
            <Stack
                p={4}
                borderWidth="3px"
                borderRadius="md"
                direction="column"
                align="flex-start"
            >
                <HStack>
                    <StatLabel color='white'>Name: {props.Firstname}</StatLabel>
                    <StatLabel color='white'>{props.Lastname}</StatLabel>
                </HStack>
                <StatHelpText color='white'>Password: {props.Password}</StatHelpText>
            </Stack>
        </Stat>
    );
}
