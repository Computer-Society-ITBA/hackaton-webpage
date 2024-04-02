import { Text, VStack, HStack, Img } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const HackITBAImage = "/images/hackitba_negro.svg";
  const CSImage = "/images/IEEE_CS_footer.svg";
  return (
    <VStack mt="10" w="full">
      <Text fontSize={["xs", "sm", "md", "lg", "lg"]}>
        &copy; {currentYear} Computer Society ITBA. Todos los derechos
        reservados.
      </Text>
      <HStack w="full" backgroundColor="white" justify="end">
        <Img
          src={HackITBAImage}
          alt="HackITBA image"
          width={["25%", "22%", "18%", "16%", "16%"]}
        ></Img>
        <Img
          src={CSImage}
          alt="IEEE Computer Society image"
          width={["25%", "22%", "18%", "16%", "16%"]}
        ></Img>
      </HStack>
    </VStack>
  );
};

export default Footer;
