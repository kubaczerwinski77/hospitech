import { SearchIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Headers from "./Headers";

const dummyData = [
  {
    code: "INEU00405P",
    name: "Zaawansowane metody programowania",
    place: "111 C-3",
    date: "Czwartek TP+1/2 09:15-11:00",
    teacher: "Dr. inż. Jacek Cichosz",
    inspectors: [
      "prof. dr hab. inż. Krzysztof Walkowiak",
      "dr hab. inż. Mariusz Uchroński (WZHZ)",
    ],
  },
  {
    code: "INEU00405A",
    name: "Zaawansowane metody programowania",
    place: "111 C-3",
    date: "Czwartek TP+1/2 09:15-11:00",
    teacher: "Dr. inż. Jacek Cichosz",
    inspectors: [
      "prof. dr hab. inż. Krzysztof Walkowiak",
      "dr hab. inż. Mariusz Uchroński (WZHZ)",
    ],
  },
  {
    code: "INEU00405B",
    name: "Aaawansowane metody programowania",
    place: "111 C-3",
    date: "Czwartek TP+1/2 09:15-11:00",
    teacher: "Dr. inż. Jacek Cichosz",
    inspectors: [
      "prof. dr hab. inż. Krzysztof Walkowiak",
      "dr hab. inż. Mariusz Uchroński (WZHZ)",
    ],
  },
];

const dummySelect = [
  "Arkadiusz Glapiński",
  "Marek Tańcula",
  "James Bond",
  "Franek Kimono",
];

const ScheduleItem = ({ code, name, place, date, teacher, inspectors }) => (
  <HStack
    bg={"gray.200"}
    spacing={2}
    margin={1}
    p={3}
    align={"center"}
    borderRadius={5}
  >
    <Flex w={"200px"}>{code}</Flex>
    <Flex w={"300px"}>{name}</Flex>
    <Flex w={"200px"}>{place}</Flex>
    <Flex w={"200px"}>{date}</Flex>
    <Flex w={"250px"}>{teacher}</Flex>
    <Flex w={"350px"} direction="column">
      <Text>{inspectors[0]}</Text>
      <Text>{inspectors[1]}</Text>
    </Flex>
  </HStack>
);

const Schedule = () => {
  const toast = useToast();
  const [data] = useState(dummyData);
  const [form, setForm] = useState({
    teacher: { value: null, err: false },
    inspector1: { value: null, err: false },
    inspector2: { value: null, err: false },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFormSubmit = () => {
    if (!form.teacher.value) {
      setForm({ ...form, teacher: { ...form.teacher, err: true } });
      return;
    }
    if (!form.inspector1.value) {
      setForm({ ...form, inspector1: { ...form.inspector1, err: true } });
      return;
    }
    if (!form.inspector2.value) {
      setForm({ ...form, inspector2: { ...form.inspector2, err: true } });
      return;
    }

    onClose();
    toast({
      title: "Operacja powiodła się",
      description: "Pomyślnie utworzono hospitację",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  return (
    <>
      {!!data.length ? (
        <Flex direction={"column"} paddingX={10} marginTop={1}>
          <Headers />
          {data.map((item, i) => (
            <ScheduleItem
              key={i}
              code={item.code}
              name={item.name}
              place={item.place}
              date={item.date}
              teacher={item.teacher}
              inspectors={item.inspectors}
            />
          ))}
          <Flex justifyContent={"flex-end"} marginTop={1} marginRight={1}>
            <Box
              as="button"
              marginLeft={"auto"}
              bg={"teal.500"}
              borderRadius={5}
            >
              <SmallAddIcon boxSize={10} onClick={onOpen} color={"white"} />
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Flex
          direction={"column"}
          align={"center"}
          justifyContent={"center"}
          height={"300px"}
          margin={"50px"}
          gap={"20px"}
        >
          <SearchIcon boxSize={100} opacity={0.2} />
          <Flex justify={"center"} align={"center"} maxW={"400px"}>
            <Text fontSize={"2xl"} align={"center"}>
              W harmonogramie nie ma żadnych hospitacji
            </Text>
          </Flex>
          <Button
            colorScheme={"teal"}
            leftIcon={<SmallAddIcon boxSize={6} />}
            onClick={onOpen}
          >
            Dodaj hospitację
          </Button>
        </Flex>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nowa hospitacja</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <FormControl
                isRequired
                isInvalid={form.teacher.err}
                onChange={(e) =>
                  setForm({
                    ...form,
                    teacher: { value: e.target.value, err: !e },
                  })
                }
              >
                <FormLabel>Hospitowany</FormLabel>
                <Select placeholder="Wybierz osobę">
                  <option value={dummySelect[0]}>{dummySelect[0]}</option>
                  <option value={dummySelect[1]}>{dummySelect[1]}</option>
                  <option value={dummySelect[2]}>{dummySelect[2]}</option>
                  <option value={dummySelect[3]}>{dummySelect[3]}</option>
                </Select>
                <FormErrorMessage>
                  Wybór hospitowanego jest wymagany
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={form.inspector1.err}
                onChange={(e) =>
                  setForm({
                    ...form,
                    inspector1: { value: e.target.value, err: !e },
                  })
                }
              >
                <FormLabel>Hospitujący 1 (WZHZ)</FormLabel>
                <Select placeholder="Wybierz osobę">
                  <option value={dummySelect[0]}>{dummySelect[0]}</option>
                  <option value={dummySelect[1]}>{dummySelect[1]}</option>
                  <option value={dummySelect[2]}>{dummySelect[2]}</option>
                  <option value={dummySelect[3]}>{dummySelect[3]}</option>
                </Select>
                <FormErrorMessage>
                  Wybór hospitującego jest wymagany
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={form.inspector2.err}
                onChange={(e) =>
                  setForm({
                    ...form,
                    inspector2: { value: e.target.value, err: !e },
                  })
                }
              >
                <FormLabel>Hospitujący 2</FormLabel>
                <Select placeholder="Wybierz osobę">
                  <option value={dummySelect[0]}>{dummySelect[0]}</option>
                  <option value={dummySelect[1]}>{dummySelect[1]}</option>
                  <option value={dummySelect[2]}>{dummySelect[2]}</option>
                  <option value={dummySelect[3]}>{dummySelect[3]}</option>
                </Select>
                <FormErrorMessage>
                  Wybór hospitującego jest wymagany
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="teal" mr={3} onClick={handleFormSubmit}>
              Dodaj hospitację
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Schedule;
