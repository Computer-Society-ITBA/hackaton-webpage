import React, { useState } from "react";
import {
  Heading,
  Flex,
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Button,
  Link,
  Grid,
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
import styled from "@emotion/styled";
import NextLink from "next/link";

const Subtitle = styled(Text)`
  font-size: 14px;
  text-transform: uppercase;
  color: #b1b7c2;
`;

const Separator = styled.span`
  border-left: 1px solid #b1b7c2;
  margin-left: 16px;
  margin-right: 16px;
`;

const PrimaryButton = styled(Button)`
  font-size: 14px;
  border-radius: 8px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  margin-top: 16px;
  height: 48px;
  padding: 16px 24px;

  svg path {
    fill: #1e212a;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #2fe0b5;
    border: 1px solid #2fe0b5;

    svg path {
      fill: #2fe0b5;
    }
  }
`;

const motionForce = (x, y) => {
  return forces.disturbance(x, y, 30);
};
const Home = () => {
  const { innerWidth } = useWindowSize();
  const cyberImage = "/images/cyber-security.svg";
  const cryptoImage = "/images/cryptocurrency.svg";
  const robotImage = "/images/robot.svg";

  return (
    <Flex direction="column">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="150px"
        mb="200px"
        height={400}
      >
        <Grid width="500px" gap="16px" zIndex={2}>
          <Subtitle m="5px 0 0 0">
            1, 2 y 3 de abril
            <Separator />
            Buenos Aires
            <Separator />
            36hs de hacking
          </Subtitle>
          <Heading
            as="h1"
            mt={[20, 20, 0, 0]}
            color="#FAFBFC"
            fontWeight={700}
            fontSize={[48, 48, 72]}
          >
            HackIT-BA!
          </Heading>
          <Heading
            isTruncated
            as="h1"
            size="md"
            color="#FAFBFC"
            fontWeight={"normal"}
          >
            por Computer Society
          </Heading>
          <NextLink href="https://bit.ly/hackit-ba" passHref>
            <a target="_blank" rel="noreferrer">
              <PrimaryButton colorScheme="brand">
                Inscribite
                <svg
                  style={{ marginLeft: 8 }}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.39205 11.2102L11.6932 5.90909L6.39205 0.607954L5.36932 1.625L8.92045 5.17045H0V6.64773H8.92045L5.36932 10.1989L6.39205 11.2102Z"
                    fill="#1E212A"
                  />
                </svg>
              </PrimaryButton>
            </a>
          </NextLink>
        </Grid>
        <Box position="absolute" mt="19" ml="370px">
          <NoSSR>
            <ParticleImage
              src={"/images/cs-logo.png"}
              scale={useBreakpointValue({
                base: 0.15,
                sm: 0.15,
                md: 0.35,
                lg: 0.35,
              })}
              entropy={40}
              maxParticles={4200}
              width={useBreakpointValue({
                base: 150,
                sm: 200,
                md: 800,
                lg: 800,
              })}
              height={useBreakpointValue({
                base: 150,
                sm: 150,
                md: 400,
                lg: 400,
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
        border="1px"
        borderColor="brand.600"
        mt={(0, 0, 0, 0)}
        px="60px"
        py="60px"
        rounded={32}
        heading="Qué es?"
        mb="60px"
      >
        <Paragraph fontSize="18" lineHeight="32px">
          <Text as="span" fontWeight="700" fontSize="18" color="brand.400">
            HackIT-BA
          </Text>{" "}
          es un evento anual que se realiza en el ITBA, en el que 15-25 equipos
          de 3 personas viven{" "}
          <Text as="span" fontWeight="700" fontSize="18" color="brand.400">
            36 horas
          </Text>{" "}
          de pura intensidad, programando un proyecto práctico que pueda mejorar
          la calidad de vida de sus pares en la Argentina y en el mundo, con
          ideas innovadoras y únicas. Aprender, crear y programar es uno de los
          mantras de la competencia.
        </Paragraph>
      </Section>
      <Section
        border="1px"
        borderColor="brand.600"
        mt={(0, 0, 0, 10)}
        px="60px"
        py="60px"
        rounded={32}
        heading="Cómo funciona?"
        mb="60px"
      >
        <Paragraph fontSize="18" lineHeight="32px">
          La competencia se va a desarrollar prescencialmente en el ITBA Sede
          Distrito Financiero y a través de Discord. Para aplicar simplemente
          tenés que entrar al link{" "}
          <Text as="span" fontWeight="700" fontSize="18" color="brand.400">
            <Link color="brand.200" href="https://bit.ly/hackit-ba">
              bit.ly/hackit-ba
            </Link>
          </Text>{" "}
          y luego de que cierren las inscripciones te vamos a confirmar tu
          prescencia. Cada equipo debe elegir 1 categoría para desarrollar un
          proyecto informático que solucione un problema en Inclusión
          Financiera, Ciberseguridad y Privacidad o Productividad y
          Automatización.
        </Paragraph>
      </Section>
      <Section
        heading={"Tracks"}
        mt={(0, 0, 0, 10)}
        marginTop="60px"
        px="60px"
        py="60px"
        pl="0"
        pr="0"
        headingOffset={-100}
        rounded={0}
        border="1px"
        borderColor="brand.600"
        borderLeft={0}
        borderRight={0}
        borderBottom={0}
        mb="60px"
      >
        <Flex
          alignItems="center"
          justifyContent={["center", "center", "space-evenly"]}
          flexWrap="wrap"
        >
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
        marginTop="60px"
        px="60px"
        py="60px"
        pl="0"
        pr="0"
        headingOffset={-100}
        rounded={0}
        border="1px"
        borderColor="brand.600"
        borderLeft={0}
        borderRight={0}
        borderBottom={0}
        mb="60px"
      >
        <Grid
          my={3}
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
          gap="47px"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {speakers.map((speaker, idx) => (
            <SpeakerProfile key={idx} speaker={speaker} />
          ))}
        </Grid>
      </Section>
      <Section
        heading={"Sponsors"}
        marginTop="60px"
        mt={(0, 0, 0, 10)}
        px="60px"
        py="60px"
        headingOffset={-100}
        rounded={0}
        border="1px"
        borderColor="brand.600"
        borderLeft={0}
        borderRight={0}
        borderBottom={0}
        mb="60px"
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
