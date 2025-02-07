import { Text, VStack, HStack, Img, Spacer } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const HackITBAImage = "/images/hackitba-new-logo.png";
  const CSImage = "/images/IEEE_CS.png";
  return (
    <VStack mt="10" w="full">
      <Text
        align="center"
        fontSize={["xs", "sm", "md", "lg", "lg"]}
      >
        &copy; {currentYear} Computer Society ITBA Student Branch. Todos los derechos
        reservados.
      </Text>
      <HStack w="full" justify="end">
        <Img
          src={HackITBAImage}
          alt="HackITBA image"
          width={["25%", "22%", "18%", "16%", "16%"]}
        ></Img>
        <Img
          paddingRight="1%"
          paddingBottom="1%"
          src={CSImage}
          alt="IEEE Computer Society image"
          width={["25%", "22%", "18%", "16%", "16%"]}
        ></Img>
      </HStack>
    </VStack>
  );
};

export default Footer;
