import { Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  return (
    <Flex bg={"teal.500"} h={"80px"} align={"center"} p={"0 32px"}>
      <CalendarIcon margin={"0 8px 0 32px"} boxSize={6} />
      <Text fontSize={"xl"} fontWeight={"bold"}>
        HOSPITECH
      </Text>
      <Spacer />
      <ButtonGroup>
        <Button
          variant={"link"}
          size={"md"}
          colorScheme={"black"}
          onClick={() => navigate("/schedule")}
        >
          <Text fontWeight={pathname === "/schedule" && "bold"}>
            Harmonogram
          </Text>
        </Button>
        <Button
          variant={"link"}
          size={"md"}
          colorScheme={"black"}
          onClick={() => navigate("/protocols")}
        >
          <Text fontWeight={pathname === "/protocols" && "bold"}>
            Protokoły
          </Text>
        </Button>
        <Button
          variant={"link"}
          size={"md"}
          colorScheme={"black"}
          onClick={() => console.log("Logout")}
        >
          Wyloguj
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default NavigationBar;
