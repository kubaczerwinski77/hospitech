import { AddIcon, DeleteIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL, PREFIX } from "../../config";
import { mapDegree } from "../../utils";
import { useNavigate } from "react-router-dom";

const BrowseWzhz = () => {
  const [wzhz, setWzhz] = useState([]);
  const navigate = useNavigate();

  const fetchWzhz = async () => {
    const res = await fetch(`${BASE_URL}${PREFIX}/lecturers?wzhz=true`);
    const data = await res.json();
    setWzhz(data);
  };

  useEffect(() => {
    fetchWzhz();
  }, []);

  if (wzhz.length === 0) {
    return (
      <Flex justify="center" align="center" h="400px">
        <VStack gap={"12px"}>
          <WarningTwoIcon boxSize={12} color="gray.600" />
          <Text w="300px" textAlign="center">
            Aktualnie do komisji nie jest dodany żaden członek.
          </Text>
          <Button
            rightIcon={<AddIcon />}
            colorScheme="green"
            size="sm"
            onClick={() => navigate("/wzhz/add")}
            marginBottom="200px"
          >
            Dodaj członka
          </Button>
        </VStack>
      </Flex>
    );
  }

  return (
    <>
      <Flex w={"70%"} m="auto" p={3}>
        <Heading size={"md"}>Członkowie komisji WZHZ:</Heading>
      </Flex>
      <Divider w="70%" m="auto" />
      <VStack h="750px" overflow="scroll" w="70%" m="auto" paddingTop={3}>
        {wzhz.map(({ lecturerId, degree, department, firstName, lastName }) => (
          <Card
            direction="row"
            variant="outline"
            w={"100%"}
            key={lecturerId}
            align={"center"}
            _hover={{ bg: "green.50" }}
          >
            <Image
              fit="cover"
              w={"100px"}
              borderRadius="full"
              h="100px"
              src={`https://xsgames.co/randomusers/avatar.php?g=male&random=${Math.random()}`}
              m={3}
            />
            <CardBody>
              <HStack marginY={"auto"}>
                <Flex direction="column" basis="400px">
                  <Text>Imie i nazwisko prowadzącego</Text>
                  <Heading
                    size={"md"}
                  >{`${mapDegree[degree]} ${firstName} ${lastName}`}</Heading>
                </Flex>
                <Flex direction="column" basis={"350px"}>
                  <Text>Katedra</Text>
                  <Heading size={"md"}>{department}</Heading>
                </Flex>
                <Spacer />
                <Flex
                  bg={"red.500"}
                  p={3}
                  borderRadius={5}
                  _hover={{ cursor: "pointer" }}
                >
                  <DeleteIcon color={"white"} />
                </Flex>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
      <Divider w="70%" m="auto" />
      <Flex w={"70%"} m="auto" p={3}>
        <Button
          marginLeft="auto"
          colorScheme="green"
          rightIcon={<AddIcon />}
          onClick={() => navigate("/wzhz/add")}
        >
          Dodaj członka
        </Button>
      </Flex>
    </>
  );
};

export default BrowseWzhz;
