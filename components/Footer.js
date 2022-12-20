import { Text, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

const Footer = () => {
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
        &copy; {currentYear} Computer Society ITBA. Todos los
        derechos reservados.
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
