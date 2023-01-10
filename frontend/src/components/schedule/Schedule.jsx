import { SmallAddIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
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
  const [data, setData] = useState(dummyData);
  const [sortBy, setSortBy] = useState(null);

  const handleSortClick = (sortBy) => {};

  return (
    <Flex direction={"column"} paddingX={10} marginTop={1}>
      <Headers onSortClick={(value) => console.log(value)} />
      {dummyData.map((item, i) => (
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
        <Box as="button" marginLeft={"auto"} bg={"teal.500"} borderRadius={5}>
          <SmallAddIcon boxSize={10} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Schedule;
