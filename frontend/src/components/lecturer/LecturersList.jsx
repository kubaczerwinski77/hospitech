import { CalendarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, PREFIX } from "../../config";
import { mapDegree } from "../../utils";

const LecturersList = () => {
  const [lecturers, setLecturers] = useState([]);
  const navigate = useNavigate();

  const fetchLecturers = async () => {
    const res = await fetch(`${BASE_URL}${PREFIX}/lecturers`);
    const data = await res.json();
    setLecturers(data);
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  return (
    <>
      <Flex w={"70%"} m="auto" p={3}>
        <Heading size={"md"}>Prowadzący:</Heading>
      </Flex>
      <Divider w="70%" m="auto" />
      <Flex
        h="750px"
        overflow="scroll"
        w="70%"
        m="auto"
        paddingTop={3}
        flexWrap="wrap"
        gap={2}
      >
        {lecturers.map(({ lecturerId, degree, firstName, lastName }) => (
          <Card
            direction="row"
            variant="outline"
            w={"49%"}
            key={lecturerId}
            align={"center"}
            _hover={{ bg: "green.50" }}
            overflow="hidden"
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
                <Spacer />
                <Flex
                  direction={"column"}
                  justify="center"
                  aling="center"
                  bg={"green.300"}
                  p={2}
                  borderRadius={15}
                  _hover={{ cursor: "pointer" }}
                  gap={"4px"}
                  onClick={() => navigate(`/lecturers/${lecturerId}`)}
                >
                  <CalendarIcon color={"white"} boxSize={10} m="auto" />
                  <Text color={"white"} fontWeight="bold">
                    ZAJĘCIA
                  </Text>
                </Flex>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </Flex>
      <Divider w="70%" m="auto" />
    </>
  );
};

export default LecturersList;
