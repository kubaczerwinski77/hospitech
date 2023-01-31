import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddWzhz = () => {
  const navigate = useNavigate();

  return (
    <Flex
      w="70%"
      m="auto"
      h="50vh"
      justify="center"
      align="center"
      direction="column"
    >
      <ArrowBackIcon
        alignSelf={"flex-start"}
        justifySelf={"flex-start"}
        boxSize={8}
        flex={1}
        _hover={{ cursor: "pointer" }}
        onClick={() => navigate("/wzhz/browse")}
      />
      <SkeletonCircle size="100" alignSelf="flex-start" marginLeft="10%" />
      <Box borderRadius={5} width="80%">
        <SkeletonText mt="4" noOfLines={5} spacing="4" skeletonHeight="2" />
      </Box>
    </Flex>
  );
};

export default AddWzhz;
