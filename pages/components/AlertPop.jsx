import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export default function AlertPop(props) {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertTitle color="white" mr={2}>{props.title}</AlertTitle>
        </Alert>
    );
}
