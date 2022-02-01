import { Flex, Text, Heading, Image, Link } from "@chakra-ui/react";
const SpeakerProfile = ({ speaker }) => {
  return (
    <>
      <Flex
        alignItems="center"
        flexDirection="column"
        border="2px"
        borderColor="#555"
        borderRadius="20px"
        pb="40px"
        px="12px"
        textAlign="center"
        width="250px"
        minHeight="300px"
        mt="75px"
        mx="4px"
      >
        <Image
          src={speaker.img}
          boxSize={100}
          alt={speaker.name}
          borderRadius="full"
          fit="cover"
          mt="-50px"
          mb="10px"
        />
        <Heading as="h3" fontSize={23} mt={3} mb={4}>
          {speaker.name}
        </Heading>
        <Heading
          as="h4"
          fontSize={20}
          color="brand.200"
          mb={4}
          letterSpacing={1}
          fontWeight={500}
        >
          {speaker.brand}
        </Heading>
        <Text wordBreak="break-word" fontSize={16}>
          {speaker.title}
        </Text>
        <Flex mt={10} alignItems="center">
          <Image
            src="images/twitter.png"
            boxSize={30}
            alt={speaker.twitter}
            borderRadius="full"
            fit="cover"
          />
          <Link
            fontWeight={100}
            color="#55ADED"
            href={`https://twitter.com/${speaker.twitter}`}
            target="_blank"
          >
            @{speaker.twitter}
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default SpeakerProfile;
