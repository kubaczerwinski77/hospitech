import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  SkeletonText,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL, PREFIX } from "../../config";
import { useEffect } from "react";
import { mapDayOfTheWeek, mapDegree } from "../../utils";
import { AddIcon, WarningTwoIcon } from "@chakra-ui/icons";
import AddHospitationModal from "./AddHospitationModal";

const Schedule = () => {
  const [hospitations, setHospitations] = useState([]);
  const [status, setStatus] = useState();
  const [, setError] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const manageRequest = async () => {
      setStatus("loading");
      try {
        const res = await fetch(`${BASE_URL}${PREFIX}/hospitations`);
        const data = await res.json();
        setHospitations(data);
        setStatus("success");
      } catch (e) {
        setStatus("failed");
        setError(e);
      }
    };

    manageRequest();
  }, [isOpen]);

  if (status === "loading") {
    return (
      <VStack m={10}>
        <Box m="auto" padding="6" borderRadius={5} bg="white" width="80%">
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
        </Box>
        <Box m="auto" padding="6" borderRadius={5} bg="white" width="80%">
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
        </Box>
        <Box m="auto" padding="6" borderRadius={5} bg="white" width="80%">
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
        </Box>
      </VStack>
    );
  }

  if (status === "error") {
    return (
      <Flex justify="center" align="center" h="300px">
        <VStack>
          <WarningTwoIcon boxSize={12} color="gray.600" />
          <Text w="400px" textAlign="center">
            Nie udało się wczytać harmonogramu, spróbuj ponownie później.
          </Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <>
      {hospitations.length === 0 ? (
        <Flex justify="center" align="center" h="300px">
          <VStack>
            <WarningTwoIcon boxSize={12} color="gray.600" />
            <Text w="300px" textAlign="center">
              W harmonogramie na ten moment nie ma żadnych hospitacji.
            </Text>
            <Button
              rightIcon={<AddIcon />}
              colorScheme="green"
              size="sm"
              onClick={onOpen}
            >
              Dodaj hospitację
            </Button>
          </VStack>
        </Flex>
      ) : (
        <>
          <VStack>
            <HStack gap="10px" paddingTop={5}>
              <Text as="b" w="100px">
                Kod:
              </Text>
              <Text as="b" w="300px">
                Nazwa:
              </Text>
              <Text as="b" w="100px">
                Miejsce:
              </Text>
              <Text as="b" w="150px">
                Termin:
              </Text>
              <Text as="b" w="200px">
                Hospitowany:
              </Text>
              <Text as="b" w="400px">
                Hospitujący:
              </Text>
            </HStack>
            <Flex
              direction="column"
              h="750px"
              w="1400px"
              gap="10px"
              overflow="scroll"
            >
              {hospitations.map(
                ({
                  hospitationId,
                  classesForHospitation,
                  hospitatedLecturer,
                  wzhzReviewer,
                  secondReviewer,
                }) => (
                  <HStack
                    key={hospitationId}
                    p={5}
                    borderRadius={10}
                    bg="gray.200"
                    shadow="md"
                  >
                    {classesForHospitation
                      .slice(0, 1)
                      .map(
                        ({
                          classId,
                          course,
                          room,
                          building,
                          dayOfTheWeek,
                          startTime,
                          endTime,
                        }) => (
                          <HStack key={classId} gap={"10px"}>
                            <Text w={"100px"}>{course.code}</Text>
                            <Text w={"300px"}>{course.name}</Text>
                            <Text w={"100px"}>
                              {room} {building}
                            </Text>
                            <Flex direction="column" w={"150px"}>
                              <Text>{mapDayOfTheWeek[dayOfTheWeek]}</Text>
                              <Text>
                                {startTime} - {endTime}
                              </Text>
                            </Flex>
                            <Text></Text>
                          </HStack>
                        )
                      )}
                    <Text w={"200px"}>
                      {mapDegree[hospitatedLecturer.degree]}{" "}
                      {hospitatedLecturer.firstName}{" "}
                      {hospitatedLecturer.lastName}
                    </Text>
                    <Flex direction="column">
                      <Text w={"400px"}>
                        {mapDegree[wzhzReviewer.degree]}{" "}
                        {wzhzReviewer.firstName} {wzhzReviewer.lastName} (WZHZ)
                      </Text>
                      <Text w={"400px"}>
                        {mapDegree[secondReviewer.degree]}{" "}
                        {secondReviewer.firstName} {secondReviewer.lastName}
                      </Text>
                    </Flex>
                  </HStack>
                )
              )}
            </Flex>
          </VStack>
          <Flex w="1380px" m="auto">
            <Button
              rightIcon={<AddIcon />}
              colorScheme="green"
              marginLeft="auto"
              onClick={onOpen}
            >
              Dodaj hospitację
            </Button>
          </Flex>
        </>
      )}

      <AddHospitationModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Schedule;
