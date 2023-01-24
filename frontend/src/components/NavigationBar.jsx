import {
  Avatar,
  Button,
  Flex,
  forwardRef,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  AddIcon,
  ArrowBackIcon,
  CalendarIcon,
  SearchIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = forwardRef((props, ref) => (
  <Flex
    gap={"8px"}
    justify="center"
    align="center"
    ref={ref}
    borderRadius={10}
    p={2}
    bg="green.200"
    cursor="pointer"
    {...props}
  >
    <Text userSelect="none" marginLeft={1}>
      Mariusz Pudzianowski
    </Text>
    <Avatar
      size="xs"
      src="https://yt3.googleusercontent.com/ytc/AL5GRJVulvC-ZrmKn1wq3J6qvBbJY_GW55Igdmfw9Sc0=s900-c-k-c0x00ffffff-no-rj"
    />
  </Flex>
));

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <Flex bg={"green.400"} h={"80px"} align={"center"} paddingX="10%">
      <HStack>
        <CalendarIcon boxSize={7} />
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          HOSPITECH
        </Text>
      </HStack>
      <Spacer />
      <HStack gap={"24px"}>
        <Button
          variant="link"
          color="gray.800"
          fontWeight={pathname === "/schedule" && "bold"}
          onClick={() => navigate("/schedule")}
        >
          Harmonogram
        </Button>
        <Button
          variant="link"
          color="gray.800"
          fontWeight={pathname === "/protocols" && "bold"}
          onClick={() => navigate("/protocols")}
        >
          Protokoły
        </Button>
        <Menu>
          <MenuButton
            as={Link}
            fontWeight={pathname.startsWith("/wzhz") && "bold"}
          >
            WZHZ
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => navigate("/wzhz/browse")}
              icon={<SearchIcon />}
            >
              Przeglądaj
            </MenuItem>
            <MenuItem onClick={() => navigate("/wzhz/add")} icon={<AddIcon />}>
              Dodaj członka
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Profile}></MenuButton>
          <MenuList>
            <MenuItem>Hospitacje</MenuItem>
            <MenuItem>Zajęcia</MenuItem>
            <MenuDivider />
            <MenuItem icon={<SettingsIcon />}>Ustawienia</MenuItem>
            <MenuItem icon={<ArrowBackIcon boxSize="3.5" />} color="red.500">
              Wyloguj
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default NavigationBar;
