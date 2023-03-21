import { VStack } from "@chakra-ui/react";
import React from "react";
import MenuBuilder from "./MenuBuilder";
import DashboardBuilder from './DashboardBuilder'

export default function Form() {
    return <VStack mt={8} spacing="3px"><DashboardBuilder /></VStack>;
}
