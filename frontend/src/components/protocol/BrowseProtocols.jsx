import { AddIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, PREFIX } from "../../config";
import { mapDegree } from "../../utils";

const BrowseProtocols = () => {
  const navigate = useNavigate();
  const [hospitations, setHospitations] = useState([]);

  const fetchHospitations = async () => {
    const res = await fetch(
      `${BASE_URL}${PREFIX}/hospitations?hasProtocol=true`
    );
    const data = await res.json();
    setHospitations(data);
  };

  useEffect(() => {
    fetchHospitations();
  }, []);

  console.log(hospitations);

  if (hospitations.length === 0) {
    return (
      <Flex justify="center" align="center" h="400px">
        <VStack gap={"12px"}>
          <WarningTwoIcon boxSize={12} color="gray.600" />
          <Text w="300px" textAlign="center">
            Brak protokołów do wyświetlenia
          </Text>
          <Button
            rightIcon={<AddIcon />}
            colorScheme="green"
            size="sm"
            onClick={() => navigate("/hospitations/add")}
            marginBottom="200px"
          >
            Stwórz protokół
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
        {hospitations.map(({ hospitatedLecturer }) => {
          const { lecturerId, firstName, lastName, degree } =
            hospitatedLecturer;
          return (
            <Card
              direction="row"
              variant="outline"
              w={"100%"}
              key={lecturerId}
              align={"center"}
              _hover={{ bg: "green.50" }}
            >
              <CardBody>
                <HStack marginY={"auto"}>
                  <Flex direction="column" basis="400px">
                    <Text>Imie i nazwisko prowadzącego</Text>
                    <Heading
                      size={"md"}
                    >{`${mapDegree[degree]} ${firstName} ${lastName}`}</Heading>
                  </Flex>
                </HStack>
              </CardBody>
            </Card>
          );
        })}
      </VStack>
      <Divider w="70%" m="auto" />
      <Flex w={"70%"} m="auto" p={3}>
        <Button
          marginLeft="auto"
          colorScheme="green"
          rightIcon={<AddIcon />}
          onClick={() => navigate("/protocols/add")}
        >
          Stwórz protokół
        </Button>
      </Flex>
    </>
  );
};

export default BrowseProtocols;
