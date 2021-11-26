import React from "react";
import {
  Heading,
  Flex,
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import Section from "../components/Section";
import Paragraph from "../components/Paragraph";
import NoSSR from "../components/NoSSR";
import useWindowSize from "@rooks/use-window-size";
import ParticleImage, { forces } from "react-particle-image";
import CustomParticleOptions from "../components/CustomParticleOptions.ts";

const motionForce = (x, y) => {
  return forces.disturbance(x, y, 30);
};
const Home = () => {
  const { innerWidth, innerHeight } = useWindowSize();
  return (
    <Flex direction="column">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
      >
        <Flex direction="column" zIndex={2}>
          <Heading
            isTruncated
            as="h1"
            size="4xl"
            mt={[20, 20, 0, 0]}
            color={useColorModeValue("#f0e7db", "#101012")}
            textShadow="-1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff"
          >
            HackIT-BA!
          </Heading>
          <Heading
            isTruncated
            as="h1"
            size="xl"
            color={useColorModeValue("white")}
          >
            por Computer Society
          </Heading>
          {/* <Text m="5px 0 0 20px">Este texto no significa nada!</Text> */}
        </Flex>
        <Box ml={[0, 0, "-20%", "-20%"]} mt={[0, "-20%", 0, 0]}>
          <NoSSR>
            <ParticleImage
              src={"/images/cs-logo.png"}
              scale={useBreakpointValue({
                base: 0.3,
                sm: 0.4,
                md: 0.5,
                lg: 0.5,
              })}
              entropy={40}
              maxParticles={4200}
              width={useBreakpointValue({
                base: 500,
                sm: 600,
                md: 1000,
                lg: 1000,
              })}
              height={useBreakpointValue({
                base: 300,
                sm: 400,
                md: 600,
                lg: 600,
              })}
              mouseMoveForce={motionForce}
              mouseTouchForce={motionForce}
              particleOptions={CustomParticleOptions}
              backgroundColor={"none"}
            />
          </NoSSR>
        </Box>
      </Flex>
      <Section
        border="2px"
        borderColor="brand.600"
        px={20}
        py={10}
        rounded={30}
        headingOffset={-16}
        heading="Que es?"
      >
        <Paragraph fontSize="18">
          <Text as="span" fontWeight="700" fontSize="20" color="brand.200">
            HackIT-BA
          </Text>{" "}
          es un evento anual que se realiza en el ITBA, en el que 15-25 equipos
          de 3 personas viven{" "}
          <Text as="span" fontWeight="700" fontSize="20" color="brand.200">
            36 horas
          </Text>{" "}
          de pura intensidad, programando un proyecto práctico que pueda mejorar
          la calidad de vida de sus pares en la Argentina y en el mundo, con
          ideas innovadoras y únicas. Aprender, crear y programar es uno de los
          mantras de la competencia.
        </Paragraph>
      </Section>
    </Flex>
  );
};

export default Home;
