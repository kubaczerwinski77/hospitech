import { Flex, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, PREFIX } from "../../config";
import {
  mapDayOfTheWeekShort,
  mapDegree,
  mapProtocolAnswears,
} from "../../utils";
import _ from "lodash";

const ChooseOption = ({ defaultChosen = 0 }) => {
  return (
    <HStack bg="gray.100" borderRadius={5} paddingX={2} m={1}>
      <Text
        fontWeight={defaultChosen === 5.5 && "bold"}
        bg={defaultChosen === 5.5 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        5.5
      </Text>
      <Text
        fontWeight={defaultChosen === 5 && "bold"}
        bg={defaultChosen === 5 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        5
      </Text>
      <Text
        fontWeight={defaultChosen === 4 && "bold"}
        bg={defaultChosen === 4 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        4
      </Text>
      <Text
        fontWeight={defaultChosen === 3 && "bold"}
        bg={defaultChosen === 3 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        3
      </Text>
      <Text
        fontWeight={defaultChosen === 2 && "bold"}
        bg={defaultChosen === 2 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        2
      </Text>
      <Text
        bg={defaultChosen === 0 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
        fontWeight={defaultChosen === 0 && "bold"}
      >
        0
      </Text>
    </HStack>
  );
};

const ProtocolDetails = () => {
  const { id } = useParams();
  const [protocol, setProtocol] = useState({});
  const [hospitation, setHospitation] = useState({});

  useEffect(() => {
    const fetchProtocol = async () => {
      const res = await fetch(
        `${BASE_URL}${PREFIX}/protocols/hospitation/${id}`
      );
      const data = await res.json();
      setProtocol(data);
    };
    const fetchHospitation = async () => {
      const res = await fetch(
        `${BASE_URL}${PREFIX}/hospitations?hasProtocol=true`
      );
      const data = await res.json();
      setHospitation(
        data.filter(({ hospitationId }) => hospitationId !== id)[0]
      );
    };
    fetchHospitation();
    fetchProtocol();
  }, [id]);

  console.log({ protocol, hospitation });

  const { classesForHospitation, hospitatedLecturer } = hospitation || {};
  const { degree, firstName, lastName } = hospitatedLecturer || {};
  const { building, course, room, startTime, dayOfTheWeek } =
    !!classesForHospitation?.length ? classesForHospitation[0] : {};
  const { grade, commentsAndRecommendations, gradeExplanation, questions } =
    protocol || {};
  const {
    classProperlyEquipped,
    commentsOnClass,
    contentInLineWithProgram,
    videoMessageVerification,
    wasDelayed,
    wasStudentsAttendanceChecked,
  } = questions || {};

  return (
    <Flex
      m="auto"
      justify="center"
      align="center"
      w="90%"
      bg="gray.100"
      p={10}
      marginTop="5vh"
      borderRadius={10}
      h="80vh"
    >
      <HStack w="100%">
        {/* first column */}
        <VStack w="50%" gap={6}>
          <Flex direction="column" w="100%">
            <Heading size="md">1. Informacje wstępne</Heading>
            <VStack p={2}>
              <Flex w="100%">
                <Text flexBasis="400px">Prowadzący zajęcia:</Text>
                <Text w="100%" fontWeight="semibold">
                  {mapDegree[degree]} {firstName} {lastName}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Nazwa kursu:</Text>
                <Text w="100%" fontWeight="semibold">
                  {course?.name}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Kod kursu:</Text>
                <Text w="100%" fontWeight="semibold">
                  {course?.code}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Sposób realizacji:</Text>
                <Text w="100%" fontWeight="semibold">
                  stacjonarny
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Stopień i forma studiów:</Text>
                <Text w="100%" fontWeight="semibold">
                  1 stopień, dzienne
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Semestr:</Text>
                <Text w="100%" fontWeight="semibold">
                  5
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Miejsce i termin zajęć:</Text>
                <Text w="100%" fontWeight="semibold">
                  {building} s. {room} {mapDayOfTheWeekShort[dayOfTheWeek]}
                  {". "}
                  {startTime}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Środowisko realizacji:</Text>
                <Text w="100%" fontWeight="semibold">
                  brak
                </Text>
              </Flex>
            </VStack>
          </Flex>
          <Flex direction="column" w="100%">
            <Heading size="md">2. Ocena formalna zajęć</Heading>
            <VStack p={2}>
              <Flex w="100%">
                <Text flexBasis="800px">
                  Czy zajęcia rozpoczęły się punktualnie?
                </Text>
                <Text w="100%" fontWeight="semibold">
                  {mapProtocolAnswears[!wasDelayed]}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="800px">
                  Czy sprawdzono obecność studentów?
                </Text>
                <Text w="100%" fontWeight="semibold">
                  {_.capitalize(wasStudentsAttendanceChecked)}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="800px">
                  Czy sala jest przystosowana do zajęć?
                </Text>
                <Text w="100%" fontWeight="semibold">
                  {mapProtocolAnswears[classProperlyEquipped]}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="800px">Czy zweryfikowano przekaz wideo?</Text>
                <Text w="100%" fontWeight="semibold">
                  {mapProtocolAnswears[videoMessageVerification]}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="800px">
                  Czy treść zgodna z programem kursu?
                </Text>
                <Text w="100%" fontWeight="semibold">
                  {mapProtocolAnswears[contentInLineWithProgram]}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="800px">Uwagi:</Text>
                <Text w="100%" fontWeight="semibold">
                  {commentsOnClass}
                </Text>
              </Flex>
            </VStack>
          </Flex>
        </VStack>
        {/* second column */}
        <VStack w="50%" gap={3}>
          <Flex direction="column" w="100%">
            <Heading size="md" w="100%">
              3. Ocena merytoryczna i metodyczna prowadzenia zajęć
            </Heading>
            <Flex
              bg="gray.300"
              w="100%"
              p={2}
              borderRadius={5}
              maxH="35vh"
              direction="column"
              overflowY="scroll"
            >
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>1. Przedstawił temat, cel i zakres zajęć</Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  2. Wyjaśniał w zrozumiały sposób omawiane zagadnienia
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={2} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>3. Realizował zajęcia z zaangażowaniem</Text>
                <Spacer />
                <ChooseOption defaultChosen={4} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  4. Inspirował studentów do samodzielnego myślenia (stawiania
                  pytań, dyskusji, samodzielnego rozwiązywania problemów/zadań
                  itp.)
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={4} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  5. Udzielał merytorycznie poprawnych odpowiedzi na pytania
                  studentów
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  6. Stosował środki dydaktyczne (np. prezentacje multimedialne,
                  materiały dydaktyczne, sprzęt laboratoryjny, pokazy)
                  adekwatnie do celów i treści zajęć
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={5.5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>7. Posługiwał się poprawnym językiem</Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>8. Panował nad dynamiką grupy</Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>9. Tworzył pozytywną atmosferę na zajęciach</Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  10. Sprawnie posługiwał się technicznymi środkami przekazu
                  wiedzy
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>11. Przekazywał aktualną wiedzę.</Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  12. Przedstawiał materiał, który był przygotowany i
                  uporządkowany
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={0} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  13. Wykazał się umiejętnościami w zakresie nauczania
                  (zwięzłość przekazu, jakość narracji, zdolność nawiązywania
                  kontaktu ze studentami, itp.)
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  14. Poprawnie dobierał przykłady – pod względem treści – do
                  omawianych problemów/zagadnień/zadań
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={2} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  15. Tempo prowadzonych zajęć dostosował do możliwości
                  percepcyjnych studentów i użytych form przekazu
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  16. Był przygotowany merytorycznie do danej formy zajęć
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>17. Jasno określił zadania dla studentów</Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>18. Odpowiednio rozplanował czas zajęć</Text>
                <Spacer />
                <ChooseOption defaultChosen={5.5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  19. Kontrolował umiejętności zdobywane w trakcie zajęć i/lub w
                  sposób merytorycznie poprawny komentował i korygował
                  wypowiedzi/działania studentów
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={4} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  20. Prowadził dokumentację zajęć (lista obecności, lista ocen,
                  sprawozdania, prace kontrolne itp.)
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
            </Flex>
          </Flex>
          <Spacer />
          <Flex w="100%" alignItems={"center"} gap={5}>
            <Heading size="md">4. Ocena końcowa</Heading>
            <Text
              paddingX={3}
              bg={"gray.300"}
              fontWeight={"semibold"}
              borderRadius={5}
            >
              {grade}
            </Text>
          </Flex>
          <Spacer />
          <Flex w="100%" direction="column">
            <Heading size="md">5. Uzasadnienie oceny końcowej</Heading>
            <Text>{gradeExplanation}</Text>
          </Flex>
          <Spacer />
          <Flex w="100%" direction="column">
            <Heading size="md">6. Wnioski i zalecenia</Heading>
            <Text>{commentsAndRecommendations}</Text>
          </Flex>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default ProtocolDetails;
