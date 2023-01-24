import React from "react";
import { Flex, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL, PREFIX } from "../../config";
import { useEffect } from "react";
import { mapDayOfTheWeek, mapDegree } from "../../utils";

const Schedule = () => {
  const [hospitations, setHospitations] = useState([]);
  const [status, setStatus] = useState();
  const [error, setError] = useState();

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
  }, []);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <>{error}</>;
  }

  return (
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
        {hospitations.map(
          ({
            hospitationId,
            classesForHospitation,
            hospitatedLecturer,
            wzhzReviewer,
            secondReviewer,
          }) => (
            <HStack key={hospitationId} p={5} borderRadius={5} bg="gray.200">
              {classesForHospitation.map(
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
                {hospitatedLecturer.firstName} {hospitatedLecturer.lastName}
              </Text>
              <Flex direction="column">
                <Text w={"400px"}>
                  {mapDegree[wzhzReviewer.degree]} {wzhzReviewer.firstName}{" "}
                  {wzhzReviewer.lastName} (WZHZ)
                </Text>
                <Text w={"400px"}>
                  {mapDegree[secondReviewer.degree]} {secondReviewer.firstName}{" "}
                  {secondReviewer.lastName}
                </Text>
              </Flex>
            </HStack>
          )
        )}
      </VStack>
    </>
  );
};

export default Schedule;
