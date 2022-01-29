import { Flex, Text, Heading, Image } from "@chakra-ui/react";
const SpeakerProfile = ({ speaker }) => {
  return (
    <>
      <Flex alignItems="center" mb={4}>
        <Image
          src={speaker.img}
          boxSize={100}
          alt={speaker.name}
          ml={(2, 0)}
          border="2px"
          borderColor="brand.300"
          borderRadius="full"
          fit="cover"
        />
        <Flex flexDirection="column" color="brand.300" ml={5}>
          <Heading as="h3">{speaker.name}</Heading>
          <Heading as="h4" fontSize={22} color="brand.200">
            {speaker.title}
          </Heading>
        </Flex>
      </Flex>
      <Text wordBreak="break-word" w={["100%", "100%", "80%"]}>
        {speaker.description}
      </Text>
    </>
  );
};

export default SpeakerProfile;
