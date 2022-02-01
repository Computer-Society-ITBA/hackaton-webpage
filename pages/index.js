import React, { useState } from "react";
import {
  Heading,
  Flex,
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Img,
  Link,
} from "@chakra-ui/react";
import Section from "../components/Section";
import Paragraph from "../components/Paragraph";
import NoSSR from "../components/NoSSR";
import useWindowSize from "@rooks/use-window-size";
import ParticleImage, { forces } from "react-particle-image";
import CustomParticleOptions from "../components/CustomParticleOptions.ts";
import TrackUnit from "../components/TrackUnit";
import SponsorLogo from "../components/SponsorLogo";
import { speakers } from "../common/data/speakers";
import SpeakerProfile from "../components/SpeakerProfile";

const motionForce = (x, y) => {
  return forces.disturbance(x, y, 30);
};
const Home = () => {
  const { innerWidth } = useWindowSize();
  const cyberImage = "/images/cyber-security.png";
  const cryptoImage = "/images/cryptocurrency.png";
  const robotImage = "/images/robot.png";

  return (
    <Flex direction="column">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        mb={20}
        mt={10}
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
          { <Text m="5px 0 0 0">36hs de hacking | 1, 2 y 3 de abril | Buenos Aires</Text> }
        </Flex>
        <Box ml={[0, 0, "-20%", "-20%"]} mt={[0, "-20%", 0, 0]}>
          <NoSSR>
            <ParticleImage
              src={"/images/cs-logo.png"}
              scale={useBreakpointValue({
                base: 0.3,
                sm: 0.3,
                md: 0.5,
                lg: 0.5,
              })}
              entropy={40}
              maxParticles={4200}
              width={useBreakpointValue({
                base: 350,
                sm: 400,
                md: 1000,
                lg: 1000,
              })}
              height={useBreakpointValue({
                base: 350,
                sm: 350,
                md: 600,
                lg: 600,
              })}
              mouseMoveForce={motionForce}
              mouseTouchForce={motionForce}
              particleOptions={CustomParticleOptions}
              backgroundColor={"none"}
              style={{ pointerEvents: innerWidth < 800 ? "none" : "auto" }}
            />
          </NoSSR>
        </Box>
      </Flex>
      <Section
        border="2px"
        borderColor="brand.600"
        mt={(0, 0, 0, 0)}
        px={(20, 10)}
        py={10}
        rounded={30}
        heading="Que es?"
      >
        <Paragraph fontSize="24">
          <Text as="span" fontWeight="700" fontSize="28" color="brand.200">
            HackIT-BA
          </Text>{" "}
          es un evento anual que se realiza en el ITBA, en el que 15-25 equipos
          de 3 personas viven{" "}
          <Text as="span" fontWeight="700" fontSize="28" color="brand.200">
            36 horas
          </Text>{" "}
          de pura intensidad, programando un proyecto práctico que pueda mejorar
          la calidad de vida de sus pares en la Argentina y en el mundo, con
          ideas innovadoras y únicas. Aprender, crear y programar es uno de los
          mantras de la competencia.
        </Paragraph>
      </Section>
      <Section
          border="2px"
          borderColor="brand.600"
          mt={(0, 0, 0, 10)}
          px={(20, 10)}
          py={10}
          rounded={30}
          heading="Cómo funciona?"
      >
        <Paragraph fontSize="24">
          La competencia se va a desarrollar prescencialmente en el ITBA Sede Distrito Financiero y a través de Discord.
          Para aplicar simplemente tenés que entrar al link
          {" "}<Text as="span" fontWeight="700" fontSize="28" color="brand.200">
          <Link href="https://bit.ly/hackit-ba">bit.ly/hackit-ba</Link>
        </Text> {" "} y luego de que cierren las inscripciones te vamos a confirmar tu prescencia.
          Cada equipo debe elegir 1 categoría para desarrollar un proyecto informático que solucione un problema en Inclusión Financiera, Ciberseguridad y Privacidad  o Productividad y Automatización.
        </Paragraph>
      </Section>
      <Section
        heading={"Tracks"}
        mt={(0, 0, 0, 10)}
        px={(20, 10)}
        py={10}
        rounded={30}
        headingOffset={-16}
        border="2px"
        borderColor="brand.600"
      >
        <Flex alignItems="center" justifyContent="space-evenly" flexWrap="wrap">
          <TrackUnit
            title="Inclusión Financiera"
            image={cryptoImage}
            content="Aplicar nuevas tecnologías a actividades financieras o bursátiles
          y poder ofrecerle los servicios financieros a la mayor cantidad de
          personas"
          />
          <TrackUnit
            title="Ciberseguridad y Privacidad"
            image={cyberImage}
            content="Crear formas innovadoras para evitar hackeos, ataques de phishing, suplantación de identidad y más problemáticas del ciberespacio"
          />
          <TrackUnit
            title="Productividad y Automatización"
            image={robotImage}
            content="Solución a un problema de automatización, construcción de herramientas para aumentar la productividad personal, etc"
          />
        </Flex>
      </Section>
      <Section
        heading={"Jurado"}
        mt={(0, 0, 0, 10)}
        px={(20, 10)}
        py={10}
        rounded={30}
        headingOffset={-16}
        border="2px"
        borderColor="brand.600"
      >
        <Flex my={3} flexWrap="wrap" justifyContent="space-evenly">
          {speakers.map((speaker, idx) => (
            <SpeakerProfile key={idx} speaker={speaker} />
          ))}
        </Flex>
      </Section>
      <Section
        heading={"Sponsors"}
        mt={(0, 0, 0, 10)}
        px={(20, 10)}
        py={10}
        rounded={30}
        headingOffset={-16}
        border="2px"
        borderColor="brand.600"
      >
        <Flex
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
          pt={8}
        >
          <SponsorLogo
            link="https://auth0.com/"
            logo="/images/logos/auth0.png"
            name="auth0"
            height="auto"
            width={350}
          />
          <SponsorLogo
            link="https://2pi.network/"
            logo="/images/logos/2pi.png"
            name="2pi"
            width={[120, 150]}
            height="auto"
            style={{ my: [5, 0] }}
          />
          <SponsorLogo
            link="https://openzeppelin.com/"
            logo="/images/logos/openzeppelin.png"
            name="OpenZeppelin"
            height="auto"
            width={["auto", 250]}
            style={{ my: [5, 0] }}
          />
          <SponsorLogo
            link="https://poap.xyz/"
            logo="https://poap.gallery/icons/poap_dark.png"
            name="POAP"
            height={130}
            style={{ my: [5, 0] }}
          />
          <SponsorLogo
            link="https://exactly.finance/"
            logo="/images/logos/exactly.svg"
            name="Exactly Finance"
            width={250}
          />
          <SponsorLogo
              link="https://www.flowics.com/"
              logo="/images/logos/flowics.svg"
              name="Flowics"
              width={200}
          />
          <SponsorLogo
            link="https://vercel.com/"
            logo="/images/logos/vercel.png"
            name="Vercel"
            height="auto"
            width={100}
          />
          <SponsorLogo
            link="https://www.extrimian.com/"
            logo="/images/logos/extrimian.svg"
            name="Extrimian"
            width={120}
          />
          <SponsorLogo
            link="https://daffy.org/"
            logo="/images/logos/daffy.svg"
            name="Daffy"
            width={100}
            height="auto"
          />
        </Flex>
      </Section>
    </Flex>
  );
};

export default Home;
