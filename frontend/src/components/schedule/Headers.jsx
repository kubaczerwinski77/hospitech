import { Flex, HStack, Text } from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import { ScheduleHeaders, SCHEDULE_COLUMN_SIZES } from "./interface";

const Headers = ({ onSortClick }) => (
  <HStack p={4} align={"center"} borderRadius={5}>
    {Object.entries(ScheduleHeaders).map(([_, value], i) => {
      return (
        <Flex align={"center"} gap={"8px"} w={SCHEDULE_COLUMN_SIZES[i]}>
          <Text align={"start"}>{value}</Text>
          <UpDownIcon onClick={onSortClick(value)} />
        </Flex>
      );
    })}
  </HStack>
);

export default Headers;
