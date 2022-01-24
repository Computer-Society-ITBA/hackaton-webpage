import { Flex, Text, Img, Heading } from "@chakra-ui/react";

const TrackUnit = ({ title, content, image }) => {
  return (
    <Flex direction="column" alignItems="center" my={2} maxW={200}>
      <Heading as="h4" fontSize="20" textAlign="center" height={10}>
        {title}
      </Heading>
      <Img
        src={image}
        width={32}
        height={32}
        mt={6}
        mb={3}
        alt={title}
        ml={(2, 0)}
        _hover={{
          transform: "scale(1.1)",
          transition: "ease-in-out 0.1s",
        }}
      />
      <Text fontSize="16" textAlign="center">
        {content}
      </Text>
    </Flex>
  );
};

export default TrackUnit;
