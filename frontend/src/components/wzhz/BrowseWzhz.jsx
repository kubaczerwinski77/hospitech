import { AddIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
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

const BrowseWzhz = () => {
  const [wzhz, setWzhz] = useState([]);

  const fetchWzhz = async () => {
    const res = await fetch(`${BASE_URL}${PREFIX}/lecturers?wzhz=true`);
    const data = await res.json();
    setWzhz(data);
  };

  useEffect(() => {
    fetchWzhz();
  }, []);

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
                <Flex bg={"red.500"} p={3} borderRadius={5}>
                  <DeleteIcon color={"white"} />
                </Flex>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
      <Divider w="70%" m="auto" />
      <Flex w={"70%"} m="auto" p={3}>
        <Button marginLeft="auto" colorScheme="green" rightIcon={<AddIcon />}>
          Dodaj członka
        </Button>
      </Flex>
    </>
  );
};

export default BrowseWzhz;
