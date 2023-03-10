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
            <Heading size="md">1. Informacje wst??pne</Heading>
            <VStack p={2}>
              <Flex w="100%">
                <Text flexBasis="400px">Prowadz??cy zaj??cia:</Text>
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
                <Text flexBasis="400px">Spos??b realizacji:</Text>
                <Text w="100%" fontWeight="semibold">
                  stacjonarny
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Stopie?? i forma studi??w:</Text>
                <Text w="100%" fontWeight="semibold">
                  1 stopie??, dzienne
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Semestr:</Text>
                <Text w="100%" fontWeight="semibold">
                  5
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">Miejsce i termin zaj????:</Text>
                <Text w="100%" fontWeight="semibold">
                  {building} s. {room} {mapDayOfTheWeekShort[dayOfTheWeek]}
                  {". "}
                  {startTime}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="400px">??rodowisko realizacji:</Text>
                <Text w="100%" fontWeight="semibold">
                  brak
                </Text>
              </Flex>
            </VStack>
          </Flex>
          <Flex direction="column" w="100%">
            <Heading size="md">2. Ocena formalna zaj????</Heading>
            <VStack p={2}>
              <Flex w="100%">
                <Text flexBasis="800px">
                  Czy zaj??cia rozpocz????y si?? punktualnie?
                </Text>
                <Text w="100%" fontWeight="semibold">
                  {mapProtocolAnswears[!wasDelayed]}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="800px">
                  Czy sprawdzono obecno???? student??w?
                </Text>
                <Text w="100%" fontWeight="semibold">
                  {_.capitalize(wasStudentsAttendanceChecked)}
                </Text>
              </Flex>
              <Flex w="100%">
                <Text flexBasis="800px">
                  Czy sala jest przystosowana do zaj?????
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
                  Czy tre???? zgodna z programem kursu?
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
              3. Ocena merytoryczna i metodyczna prowadzenia zaj????
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
                <Text p={1}>1. Przedstawi?? temat, cel i zakres zaj????</Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  2. Wyja??nia?? w zrozumia??y spos??b omawiane zagadnienia
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={2} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>3. Realizowa?? zaj??cia z zaanga??owaniem</Text>
                <Spacer />
                <ChooseOption defaultChosen={4} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  4. Inspirowa?? student??w do samodzielnego my??lenia (stawiania
                  pyta??, dyskusji, samodzielnego rozwi??zywania problem??w/zada??
                  itp.)
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={4} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  5. Udziela?? merytorycznie poprawnych odpowiedzi na pytania
                  student??w
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  6. Stosowa?? ??rodki dydaktyczne (np. prezentacje multimedialne,
                  materia??y dydaktyczne, sprz??t laboratoryjny, pokazy)
                  adekwatnie do cel??w i tre??ci zaj????
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={5.5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>7. Pos??ugiwa?? si?? poprawnym j??zykiem</Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>8. Panowa?? nad dynamik?? grupy</Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>9. Tworzy?? pozytywn?? atmosfer?? na zaj??ciach</Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  10. Sprawnie pos??ugiwa?? si?? technicznymi ??rodkami przekazu
                  wiedzy
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>11. Przekazywa?? aktualn?? wiedz??.</Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  12. Przedstawia?? materia??, kt??ry by?? przygotowany i
                  uporz??dkowany
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={0} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  13. Wykaza?? si?? umiej??tno??ciami w zakresie nauczania
                  (zwi??z??o???? przekazu, jako???? narracji, zdolno???? nawi??zywania
                  kontaktu ze studentami, itp.)
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  14. Poprawnie dobiera?? przyk??ady ??? pod wzgl??dem tre??ci ??? do
                  omawianych problem??w/zagadnie??/zada??
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={2} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  15. Tempo prowadzonych zaj???? dostosowa?? do mo??liwo??ci
                  percepcyjnych student??w i u??ytych form przekazu
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  16. By?? przygotowany merytorycznie do danej formy zaj????
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>17. Jasno okre??li?? zadania dla student??w</Text>
                <Spacer />
                <ChooseOption defaultChosen={5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>18. Odpowiednio rozplanowa?? czas zaj????</Text>
                <Spacer />
                <ChooseOption defaultChosen={5.5} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  19. Kontrolowa?? umiej??tno??ci zdobywane w trakcie zaj???? i/lub w
                  spos??b merytorycznie poprawny komentowa?? i korygowa??
                  wypowiedzi/dzia??ania student??w
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={4} />
              </Flex>
              <Flex justify="center" align="flex-start" w="100%">
                <Text p={1}>
                  20. Prowadzi?? dokumentacj?? zaj???? (lista obecno??ci, lista ocen,
                  sprawozdania, prace kontrolne itp.)
                </Text>
                <Spacer />
                <ChooseOption defaultChosen={3} />
              </Flex>
            </Flex>
          </Flex>
          <Spacer />
          <Flex w="100%" alignItems={"center"} gap={5}>
            <Heading size="md">4. Ocena ko??cowa</Heading>
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
            <Heading size="md">5. Uzasadnienie oceny ko??cowej</Heading>
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
