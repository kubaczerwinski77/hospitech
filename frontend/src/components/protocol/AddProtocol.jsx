import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Select,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, PREFIX } from "../../config";
import { Formik, Form, Field } from "formik";

const ChooseOption = ({ defaultChosen = 0 }) => {
  const [chosen, setChosen] = useState(defaultChosen);

  return (
    <HStack bg="gray.100" borderRadius={5} paddingX={2} m={1}>
      <Text
        fontWeight={chosen === 5.5 && "bold"}
        onClick={() => setChosen(5.5)}
        cursor="pointer"
        bg={chosen === 5.5 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        5.5
      </Text>
      <Text
        fontWeight={chosen === 5 && "bold"}
        onClick={() => setChosen(5)}
        cursor="pointer"
        bg={chosen === 5 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        5
      </Text>
      <Text
        fontWeight={chosen === 4 && "bold"}
        onClick={() => setChosen(4)}
        cursor="pointer"
        bg={chosen === 4 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        4
      </Text>
      <Text
        fontWeight={chosen === 3 && "bold"}
        onClick={() => setChosen(3)}
        cursor="pointer"
        bg={chosen === 3 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        3
      </Text>
      <Text
        fontWeight={chosen === 2 && "bold"}
        onClick={() => setChosen(2)}
        cursor="pointer"
        bg={chosen === 2 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
      >
        2
      </Text>
      <Text
        bg={chosen === 0 ? "green.400" : "gray.100"}
        borderRadius={5}
        paddingX={1}
        fontWeight={chosen === 0 && "bold"}
        onClick={() => setChosen(0)}
        cursor="pointer"
      >
        0
      </Text>
    </HStack>
  );
};

const AddProtocol = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (values) => {
    try {
      await fetch(`${BASE_URL}${PREFIX}/hospitations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      setTimeout(() => {
        toast({
          title: "Dodawanie powiod??o si??",
          description: "Pomy??lnie dodano protok????",
          position: "bottom-left",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        navigate("/protocols/browse");
      }, 2200);
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (value) => {
    let error;
    if (!value) {
      error = "Pole jest wymagane!";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        lecturer: "",
        courseName: "",
        courseCode: "",
        realizationType: "",
        studiesForm: "",
        semester: "",
        dateAndTime: "",
        environment: "",
        isPunctual: "",
        isAttendenceChecked: "",
        isClassAdjusted: "",
        isVideoVerified: "",
        isContentValid: "",
        commentsOnClass: "",
        grade: "",
        gradeExplanation: "",
        commentsAndRecommendations: "",
      }}
      onSubmit={(values, actions) => {
        setLoading(true);
        handleSubmitForm(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
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
          position="relative"
        >
          <Form>
            <HStack w="100%">
              {/* first column */}
              <VStack w="50%" gap={6}>
                <Flex direction="column" w="100%">
                  <Heading size="md">1. Informacje wst??pne</Heading>
                  <VStack p={2}>
                    <Flex w="100%">
                      <Text flexBasis="400px">Prowadz??cy zaj??cia:</Text>
                      <Field name="lecturer" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.lecturer && form.touched.lecturer
                            }
                            isRequired
                          >
                            <Input
                              {...field}
                              focusBorderColor="green.400"
                              w="60%"
                              size="xs"
                              variant="flushed"
                              placeholder="Imi?? i nazwisko prowadz??cego"
                            />
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.lecturer}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="400px">Nazwa kursu:</Text>
                      <Field name="courseName" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.courseName && form.touched.courseName
                            }
                            isRequired
                          >
                            <Input
                              {...field}
                              w="60%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Nazwa kursu"
                            />
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.courseName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="400px">Kod kursu:</Text>
                      <Field name="courseCode" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.courseCode && form.touched.courseCode
                            }
                            isRequired
                          >
                            <Input
                              {...field}
                              w="60%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Kod kursu"
                            />
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.courseCode}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="400px">Spos??b realizacji:</Text>
                      <Field name="realizationType" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.realizationType &&
                              form.touched.realizationType
                            }
                            isRequired
                          >
                            <Input
                              {...field}
                              w="60%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Tryb realizacji"
                            />
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.realizationType}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="400px">Stopie?? i forma studi??w:</Text>
                      <Field name="studiesForm" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.studiesForm &&
                              form.touched.studiesForm
                            }
                            isRequired
                          >
                            <Input
                              {...field}
                              w="60%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Forma studi??w"
                            />
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.studiesForm}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="400px">Semestr:</Text>
                      <Field name="semester" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.semester && form.touched.semester
                            }
                            isRequired
                          >
                            <Select
                              {...field}
                              w="20%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Wybierz"
                              color="gray.500"
                            >
                              {[1, 2, 3, 4, 5, 6, 7].map((semester) => (
                                <option key={semester} value={semester}>
                                  {semester}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.semester}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="400px">Miejsce i termin zaj????:</Text>
                      <Field name="dateAndTime" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.dateAndTime &&
                              form.touched.dateAndTime
                            }
                            isRequired
                          >
                            <Input
                              {...field}
                              w="60%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Termin i miejsce"
                            />
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.dateAndTime}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="400px">??rodowisko realizacji:</Text>
                      <Field name="environment" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.environment &&
                              form.touched.environment
                            }
                            isRequired
                          >
                            <Input
                              {...field}
                              w="60%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="??rodowisko realizacji"
                            />
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.environment}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
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
                      <Field name="isPunctual" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.isPunctual && form.touched.isPunctual
                            }
                            isRequired
                          >
                            <Select
                              {...field}
                              w="30%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Wybierz"
                              color="gray.500"
                            >
                              {["Tak", "Nie"].map((answear) => (
                                <option key={answear} value={answear}>
                                  {answear}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.isPunctual}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="800px">
                        Czy sprawdzono obecno???? student??w?
                      </Text>
                      <Field name="isAttendenceChecked" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.isAttendenceChecked &&
                              form.touched.isAttendenceChecked
                            }
                            isRequired
                          >
                            <Select
                              {...field}
                              w="30%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Wybierz"
                              color="gray.500"
                            >
                              {["Tak", "Nie"].map((answear) => (
                                <option key={answear} value={answear}>
                                  {answear}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.isAttendenceChecked}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="800px">
                        Czy sala jest przystosowana do zaj?????
                      </Text>
                      <Field name="isClassAdjusted" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.isClassAdjusted &&
                              form.touched.isClassAdjusted
                            }
                            isRequired
                          >
                            <Select
                              {...field}
                              w="30%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Wybierz"
                              color="gray.500"
                            >
                              {["Tak", "Nie"].map((answear) => (
                                <option key={answear} value={answear}>
                                  {answear}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.isClassAdjusted}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="800px">
                        Czy zweryfikowano przekaz wideo?
                      </Text>
                      <Field name="isVideoVerified" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.isVideoVerified &&
                              form.touched.isVideoVerified
                            }
                            isRequired
                          >
                            <Select
                              {...field}
                              w="30%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Wybierz"
                              color="gray.500"
                            >
                              {["Tak", "Nie"].map((answear) => (
                                <option key={answear} value={answear}>
                                  {answear}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.isVideoVerified}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="800px">
                        Czy tre???? zgodna z programem kursu?
                      </Text>
                      <Field name="isContentValid" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.isContentValid &&
                              form.touched.isContentValid
                            }
                            isRequired
                          >
                            <Select
                              {...field}
                              w="30%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Wybierz"
                              color="gray.500"
                            >
                              {["Tak", "Nie"].map((answear) => (
                                <option key={answear} value={answear}>
                                  {answear}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.isContentValid}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex w="100%">
                      <Text flexBasis="100px">Uwagi:</Text>
                      <Field name="commentsOnClass" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.commentsOnClass &&
                              form.touched.commentsOnClass
                            }
                            isRequired
                          >
                            <Input
                              {...field}
                              w="80%"
                              size="xs"
                              variant="flushed"
                              focusBorderColor="green.400"
                              placeholder="Tutaj umie???? uwagi"
                            />
                            <FormErrorMessage fontSize={"12px"}>
                              {form.errors.commentsOnClass}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
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
                      <Text p={1}>
                        1. Przedstawi?? temat, cel i zakres zaj????
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        2. Wyja??nia?? w zrozumia??y spos??b omawiane zagadnienia
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>3. Realizowa?? zaj??cia z zaanga??owaniem</Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        4. Inspirowa?? student??w do samodzielnego my??lenia
                        (stawiania pyta??, dyskusji, samodzielnego rozwi??zywania
                        problem??w/zada?? itp.)
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        5. Udziela?? merytorycznie poprawnych odpowiedzi na
                        pytania student??w
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        6. Stosowa?? ??rodki dydaktyczne (np. prezentacje
                        multimedialne, materia??y dydaktyczne, sprz??t
                        laboratoryjny, pokazy) adekwatnie do cel??w i tre??ci
                        zaj????
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>7. Pos??ugiwa?? si?? poprawnym j??zykiem</Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>8. Panowa?? nad dynamik?? grupy</Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        9. Tworzy?? pozytywn?? atmosfer?? na zaj??ciach
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        10. Sprawnie pos??ugiwa?? si?? technicznymi ??rodkami
                        przekazu wiedzy
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>11. Przekazywa?? aktualn?? wiedz??.</Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        12. Przedstawia?? materia??, kt??ry by?? przygotowany i
                        uporz??dkowany
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        13. Wykaza?? si?? umiej??tno??ciami w zakresie nauczania
                        (zwi??z??o???? przekazu, jako???? narracji, zdolno????
                        nawi??zywania kontaktu ze studentami, itp.)
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        14. Poprawnie dobiera?? przyk??ady ??? pod wzgl??dem tre??ci ???
                        do omawianych problem??w/zagadnie??/zada??
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        15. Tempo prowadzonych zaj???? dostosowa?? do mo??liwo??ci
                        percepcyjnych student??w i u??ytych form przekazu
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        16. By?? przygotowany merytorycznie do danej formy zaj????
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        17. Jasno okre??li?? zadania dla student??w
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>18. Odpowiednio rozplanowa?? czas zaj????</Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        19. Kontrolowa?? umiej??tno??ci zdobywane w trakcie zaj????
                        i/lub w spos??b merytorycznie poprawny komentowa?? i
                        korygowa?? wypowiedzi/dzia??ania student??w
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                    <Flex justify="center" align="flex-start" w="100%">
                      <Text p={1}>
                        20. Prowadzi?? dokumentacj?? zaj???? (lista obecno??ci, lista
                        ocen, sprawozdania, prace kontrolne itp.)
                      </Text>
                      <Spacer />
                      <ChooseOption />
                    </Flex>
                  </Flex>
                </Flex>
                <Spacer />
                <Flex w="100%" alignItems={"center"} gap={5}>
                  <Heading size="md" flexBasis="400px">
                    4. Ocena ko??cowa
                  </Heading>
                  <Field name="grade" validate={validate}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.grade && form.touched.grade}
                        isRequired
                      >
                        <Select
                          {...field}
                          w="20%"
                          size="xs"
                          variant="flushed"
                          focusBorderColor="green.400"
                          placeholder="Wybierz"
                          color="gray.500"
                        >
                          {[5.5, 5, 4, 3, 2, 0].map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage fontSize={"12px"}>
                          {form.errors.grade}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
                <Spacer />
                <Flex w="100%" direction="column">
                  <Heading size="md">5. Uzasadnienie oceny ko??cowej</Heading>
                  <Field name="gradeExplanation" validate={validate}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.gradeExplanation &&
                          form.touched.gradeExplanation
                        }
                        isRequired
                      >
                        <Input
                          {...field}
                          w="80%"
                          size="xs"
                          variant="flushed"
                          focusBorderColor="green.400"
                          placeholder="Tutaj umie???? uzasadnienie oceny ko??cowej"
                        />
                        <FormErrorMessage fontSize={"12px"}>
                          {form.errors.gradeExplanation}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
                <Spacer />
                <Flex w="100%" direction="column">
                  <Heading size="md">6. Wnioski i zalecenia</Heading>
                  <Field name="commentsAndRecommandations" validate={validate}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.commentsAndRecommandations &&
                          form.touched.commentsAndRecommandations
                        }
                        isRequired
                      >
                        <Input
                          {...field}
                          w="80%"
                          size="xs"
                          variant="flushed"
                          focusBorderColor="green.400"
                          placeholder="Tutaj umie???? wnisoki i zalecenia"
                        />
                        <FormErrorMessage fontSize={"12px"}>
                          {form.errors.commentsAndRecommandations}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>
              </VStack>
            </HStack>
            <Button
              position="absolute"
              bottom="20px"
              right="30px"
              size="sm"
              isLoading={loading}
              colorScheme="green"
              type="submit"
            >
              Stw??rz
            </Button>
          </Form>
        </Flex>
      )}
    </Formik>
  );
};

export default AddProtocol;
