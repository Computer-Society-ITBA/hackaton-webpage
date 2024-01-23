import {
  Text,
  Flex,
  Image,
  useColorModeValue,
  VStack,
  HStack,
  Img,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

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
const OldFooter = () => {
  const chickenImage = `/images/chicken${useColorModeValue("", "-dark")}.png`;
  const currentYear = new Date().getFullYear();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      opacity={0.6}
      fontSize="sm"
      mt="10"
      flexDirection={["column", "column", "row"]}
    >
      <Text>
        &copy; {currentYear} Computer Society ITBA. Todos los derechos
        reservados.
      </Text>
      <a
        href="https://juanoriana-eta.vercel.app"
        rel="noreferrer"
        target="_blank"
      >
        <Image
          src={chickenImage}
          width={5}
          height={5}
          alt="Juan Oriana"
          ml={(2, 0)}
          _hover={{ transform: "rotate(20deg)" }}
        />
      </a>
    </Flex>
  );
};

export default Footer;
