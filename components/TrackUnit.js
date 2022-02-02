import { Flex, Text, Img, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Card = styled.div`
  background-color: rgba(58, 62, 68, 0.4);
  border-radius: 32px;
  padding: 40px 32px;
  width: 300px;
  max-width: 300px;
  height: 300px;
`;

const TrackUnit = ({ title, content, image }) => {
  return (
    <Flex direction="column" alignItems="center" mt={"30px"} mx={2}>
      <Img position="absolute" mt="-42px" src={image} width={93} height={93} />
      <Card>
        <Heading
          mt="40px"
          as="h4"
          fontSize="20"
          textAlign="center"
          fontWeight={500}
          color="#2FD5E0"
          textTransform={"uppercase"}
          mb="15px"
        >
          {title}
        </Heading>
        <Text
          color="#FAFBFC"
          fontSize={"14px"}
          lineHeight={"24px"}
          textAlign={"center"}
        >
          {content}
        </Text>
      </Card>
    </Flex>
  );
};

export default TrackUnit;
