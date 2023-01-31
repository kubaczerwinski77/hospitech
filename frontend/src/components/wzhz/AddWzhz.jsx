import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

const AddWzhz = () => {
  return (
    <Flex
      w="70%"
      m="auto"
      h="80vh"
      justify="center"
      align="center"
      direction="column"
    >
      <SkeletonCircle size="100" alignSelf="flex-start" marginLeft="10%" />
      <Box borderRadius={5} width="80%">
        <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="2" />
      </Box>
    </Flex>
  );
};

export default AddWzhz;
