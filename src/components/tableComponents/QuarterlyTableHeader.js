import { Text, Flex, Container } from "@chakra-ui/react";

const QuarterlyTableHeader = ({ monthNames }) => {
  return (
    <Container
      pt={2}
      pb={2}
      bg="gray.100"
      color="gray.500"
      fontSize="16px"
      fontWeight="medium"
      textTransform="uppercase"
      letterSpacing="wider"
      textAlign="center"
      borderWidth="1px"
      borderColor="gray.200"
      width="100%"
      maxW={{ base: "container.sm", md: "container.md", lg: "container.lg", xl: "container.xl" }}
    >
      <Flex
        width="100%"
        textAlign="center"
        justifyContent="space-around"
      >
        {monthNames.map((month, index) => (
          <Text
            key={index}
            width="100%"
            textAlign="center"
          >{month}</Text>
        ))}
      </Flex>
    </Container>
  );
};

export default QuarterlyTableHeader;