import { Flex, Heading, Image, Link } from "@chakra-ui/react";

import styled from "@emotion/styled";

const Card = styled.div`
  background-color: rgba(58, 62, 68, 0.4);
  border-radius: 32px;
  width: 100%;
  max-width: 100%;
  height: 200px;
  display: grid;
  grid-template-columns: 157px auto;
`;

const SpeakerContent = styled.div`
  padding: 32px;
`;

const SpeakerProfile = ({ speaker }) => {
  return (
    <Card>
      <div>
        <Image
          borderLeftRadius={32}
          src={speaker.img}
          boxSize="100%"
          alt={speaker.name}
          fit="cover"
        />
      </div>
      <SpeakerContent>
        <Flex direction="column" justifyContent="space-between" height="100%">
          <div>
            <Heading as="h3" fontSize={24} fontWeight={"500"} color="#2FD5E0">
              {speaker.name}
            </Heading>
            <Heading
              mt="8px"
              as="h4"
              fontSize={14}
              color="#2FD5E0"
              letterSpacing={1}
              fontWeight={"500"}
            >
              <a href={speaker.link}>{speaker.brand}</a>
            </Heading>
          </div>

          <Flex alignItems="center">
            <Image
              src="images/twitter.svg"
              boxSize="20px"
              alt={speaker.twitter}
              fit="scale-down"
              mr="10px"
            />
            <Link
              fontWeight={300}
              color="#E9ECF3"
              href={`https://twitter.com/${speaker.twitter}`}
              target="_blank"
            >
              @{speaker.twitter}
            </Link>
          </Flex>
        </Flex>
      </SpeakerContent>
    </Card>
  );
};

export default SpeakerProfile;
