import { Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import React from "react";

const NavigationBar = () => {
  return (
    <Flex bg={"teal.500"} h={"80px"} align={"center"} p={"0 32px"}>
      <CalendarIcon margin={"0 8px 0 32px"} boxSize={6} />
      <Text fontSize={"xl"} fontWeight={"bold"}>
        HOSPITECH
      </Text>
      <Spacer />
      <ButtonGroup>
        <Button variant={"link"} size={"md"} colorScheme={"black"}>
          Harmonogram
        </Button>
        <Button variant={"link"} size={"md"} colorScheme={"black"}>
          Protokoły
        </Button>
        <Button variant={"link"} size={"md"} colorScheme={"black"}>
          Wyloguj
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default NavigationBar;