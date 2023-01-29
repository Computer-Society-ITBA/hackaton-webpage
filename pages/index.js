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
  Container,
  Img,
  VStack,
  Divider,
  StackDivider,
  Spacer,
  HStack,
  Wrap,
  WrapItem,
  Center,
  GridItem,
  Stack,
  AspectRatio,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Section from "../components/Section";
import Paragraph from "../components/Paragraph";
import NoSSR from "../components/NoSSR";
import {useWindowSize} from "rooks";
import ParticleImage, { forces } from "react-particle-image";
import CustomParticleOptions from "../components/CustomParticleOptions.ts";
import TrackUnit from "../components/TrackUnit";
import SponsorLogo from "../components/SponsorLogo";
import { speakers } from "../common/data/speakers";
import SpeakerProfile from "../components/SpeakerProfile";
import styled from "@emotion/styled";
import NextLink from "next/link";
import ParticlesLogo from "../components/ParticlesLogo"
import CategoryLogo from "../components/CategoryLogo";
import Jury from '../components/Jury';
import Head from "next/head";
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

const Badge = styled.span`
  color: #2F323A;
  background-color: #BDC4CF;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 5px 6px;
  font-size: 13px;
  font-weight: 500;
  margin-right: 8px;
`;

const PrimaryButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  margin-top: 40px;
  padding: 4% 8%;

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
const HeadingSize = ['sm','md','lg','xl','2xl']
const TextSize = ['xs','sm','md','lg','xl']
//Dejamos algunos subcomponentes aca, no los hago como componentes porque no se reutilizan
const GeneralInfo = ({...extendedProps}) => {
  return (
    <VStack spacing={4} paddingX='5%' w='full' {...extendedProps}>
        <Heading as='h1' display='inline' size={HeadingSize} color='CSOrange' textAlign={'center'} paddingY='6px'>¿Qué es HackITBA?</Heading>
        <Divider variant="thick"></Divider>
        <Text textAlign='center' fontSize={TextSize}>
        <Text as="span" color="CSGreen">HackITBA</Text> es una hackathon organizada por y para estudiantes, donde, en grupos de 4 personas, deben generar un MVP en 36 horas de competencia intensiva.
        </Text>
        <Text textAlign='center' fontSize={TextSize}>
        La competencia tiene como meta promover soluciones creativas a problemas actuales en un ambiente desafiante y cooperativo.
        </Text>
        <Divider variant="thick"></Divider>
      </VStack>
  )
}
const Categories = ({...extendedProps})=>{
  return(
    <HStack paddingX='10%' w='full' justify='center' spacing='20%' {...extendedProps}>
      {/* Es feo pasar el array, pero es lo que se me ocurrio para que se muestre bien con distintas formas  */}
      <CategoryLogo names={["Economía y", "Descentralización"]} imgSrc='/images/economia.svg'/>
      <CategoryLogo names={["Automatización","Inteligente"]} imgSrc='/images/automatizacion.svg'/>
    </HStack>
  )
}
const Inscribite = ({...extendedProps})=>{
  return(
      <Flex direction='row' width='100%' alignItems='center' height='20%' {...extendedProps}>
        <Img src="/images/Inscribite_1.svg" alt="Decoration" width='25%' height='100%'></Img>
        <Spacer/>
        <VStack justify='center' spacing='5%'>
          <Heading size={['xs','sm','md','md','lg']} textAlign='center' >
            Inscripción por equipos
          </Heading>
          <PrimaryButton height='2%' backgroundColor="CSGreen" fontSize={['xs','sm','xl','2xl','3xl']} size={['xs','xs','lg','lg','lg']}>INSCRIBITE AQUI</PrimaryButton>
        </VStack>
        <Spacer/>
        <Img src="/images/Inscribite_2.svg" alt="Decoration" width='25%' height='100%'></Img>
      </Flex>
  )
}
const JurySection = ({...extendedProps}) => {
  const juries = [
    {name: "Jose", imgSrc:"/images/jack_black.jpg"},
    {name: "Tatu", imgSrc:"/images/jack_black.jpg"},
    {name: "Mateo", imgSrc:"/images/jack_black.jpg"},
    {name: "Naso", imgSrc:"/images/jack_black.jpg"},
    {name: "Luciano", imgSrc:"/images/jack_black.jpg"}
  ]
  return(
    <VStack width='full' {...extendedProps}>
      <Heading color="CSOrange" size={HeadingSize} textAlign='center' >Jurados</Heading>
      <Text fontSize={TextSize}>Conoce a nuestros jurados</Text>
      <Grid paddingX='4%' pt='4%' templateColumns={['repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)','repeat(4, 1fr)','repeat(5, 1fr)']} justifyItems='center' width='full' spacing='3%'>
        {juries.map((jury,index)=>{
          return(
          <GridItem key={index}>
            <Jury jury={jury}></Jury>
          </GridItem>
          )
        })}
      </Grid>
    </VStack>
  )
}
const WorkshopsSection = ({...extendedProps}) =>{
  const workshopsPhotos = ['/images/course_example.jpg','/images/course_example.jpg','/images/course_example.jpg','/images/course_example.jpg','/images/course_example.jpg']
  return(
      <Stack direction={['column','column','row','row','row']} backgroundColor='#24335d' width='full' paddingY='8%' {...extendedProps}>
        <VStack alignItems='start' width={['100%','100%','40%','40%','40%']} pl='6%' spacing='4%'>
          <Heading color='CSGreen' size={HeadingSize}>Workshops</Heading>
          <Text fontSize={TextSize} width='80%'>Workshops en vivo con ....
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
        </VStack>
        <Grid p='2%' templateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)']} gap='4%'>
          {workshopsPhotos.map((photo,index)=>{
            return(
            <GridItem key={index}>
              <Img src={photo} alt="course image"></Img>
            </GridItem>
            )
          })}
        </Grid>
      </Stack>
  )
}

const SponsorsSection = ({...extendedProps}) =>{
  const sponsors = [
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'},
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'},
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'},
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'},
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'},
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'},
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'},
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'},
    {name:'Auth0',logo:'/images/logos/auth0.png',link:'https://auth0.com'}
  ]
  return(
    <VStack w='full' mt={0} {...extendedProps}>
        <Img src='/images/Sponsor_corner_1.svg' alt="decoration image" alignSelf='start' w={['20%','18%','15%','12%','10%']}></Img>
      <VStack top='-1'>
        <Heading color="CSOrange" size={HeadingSize} textAlign='center' >Sponsors 2023</Heading>
        <Text fontSize={TextSize}>Empresas que nos acompañan</Text>
      </VStack>
      <Grid paddingX='6%' templateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']}>
        {sponsors.map((sponsor)=>{
          return(
            <GridItem padding='4%' key={sponsor.name}>
              <SponsorLogo link={sponsor.link} logo={sponsor.logo} name={sponsor.name}></SponsorLogo>
            </GridItem>
          )
        })}
      </Grid>
      <Img src='/images/Sponsor_corner_2.svg' alt="decoration image" alignSelf='end' w={['20%','18%','15%','12%','10%']}></Img>
    </VStack>
  )
}

const Form = ({...extendedProps}) => {
  const LocalInput = ({...extendedProps}) => <Input focusBorderColor='white' borderRadius='4px' backgroundColor='CSOrange' color='white' _placeholder={{color:'white'}} {...extendedProps}></Input>
  
  return(
    <VStack w='50%' {...extendedProps}>
      <LocalInput placeholder="email" ></LocalInput>
      <LocalInput placeholder="asunto"></LocalInput>
      <Textarea height={['4em','6em','8em','10em','12em']} focusBorderColor='white' borderRadius='4px' backgroundColor='CSOrange' color='white' _placeholder={{color:'white'}} {...extendedProps} placeholder='Mensjae'></Textarea>
      <PrimaryButton width='full'>Enviar</PrimaryButton>
    </VStack>
  )
}
const DoubtSection = ({...extendedProps}) =>{
  const CS_img = '/images/IEEE_CS.svg'
  return(
    <HStack width='full' justify='center' {...extendedProps}>
      <VStack spacing="4%">
        <Heading size={['md','lg','xl','2xl','3xl']}>¿Tenes dudas?</Heading>
        <Heading size={['md','lg','xl','2xl','3xl']} color='CSOrange'>¡Contactanos!</Heading>
        <Img src={CS_img} alt='ITBA IEEE Computer Society image'></Img>
      </VStack>
      <Form/>
    </HStack>
  )
}
const Home = () => {
  return (
    <VStack>
      {/* Le paso a todos el padding y no lo pongo en gap porque entre workshops y sponsors no tiene que haber espacio */}
      <ParticlesLogo/>
      <GeneralInfo pt='4%' zIndex={90}/>
      <Categories pt='4%' zIndex={90}/>
      <Inscribite pt='4%' zIndex={90}/>
      <JurySection pt='4%' zIndex={90}/>
      <WorkshopsSection pt='4%' zIndex={90}/>
      <SponsorsSection zIndex={90}/>
      <DoubtSection zIndex={90}/>
      {/* TODO: revisar por que con las particulas no funcionan las animaciones de los logos de sponsors */}
      {/* Lo solucione con zindex, si no creo que toma como que estan atras del canvas que tiene a las particulas */}
    </VStack>
    
  )
}
const HomeOld = () => {
  
  const { innerWidth } = useWindowSize();
  const cyberImage = "/images/cyber-security.svg";
  const cryptoImage = "/images/cryptocurrency.svg";
  const robotImage = "/images/robot.svg";

  const particlesInit = useCallback(async engine => {
      console.log(engine);
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);
  return (
    <Flex direction="column">
        <Particles id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded} options={particlesConfig} />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="150px"
        mb="200px"
        height={400}
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
      >
        <Flex zIndex={2} direction="column">
          <Subtitle m="5px 0 6px 0" style={{ color: "#2FE0B5", display: "flex", alignItems: "center", fontSize: "16px" }}>
            <svg style={{ marginRight: 12}} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 6.5C3 5.39543 3.89543 4.5 5 4.5H19C20.1046 4.5 21 5.39543 21 6.5V20.5C21 21.6046 20.1046 22.5 19 22.5H5C3.89543 22.5 3 21.6046 3 20.5V6.5Z" stroke="#2FE0B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2.5V6.5" stroke="#2FE0B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2.5V6.5" stroke="#2FE0B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10.5H21" stroke="#2FE0B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> 31 de Marzo, 1 y 2 de Abril
            <Separator style={{ height: 26 }} />
            <svg style={{ marginRight: 12}} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.5 8.83337C17.5 14.6667 10 19.6667 10 19.6667C10 19.6667 2.5 14.6667 2.5 8.83337C2.5 4.69124 5.85786 1.33337 10 1.33337C14.1421 1.33337 17.5 4.69124 17.5 8.83337V8.83337Z" stroke="#2FE0B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M10 11.3334C11.3807 11.3334 12.5 10.2141 12.5 8.83337C12.5 7.45266 11.3807 6.33337 10 6.33337C8.61929 6.33337 7.5 7.45266 7.5 8.83337C7.5 10.2141 8.61929 11.3334 10 11.3334Z" stroke="#2FE0B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>BA ONSITE
          </Subtitle>
          <Heading
            as="h1"
            color="#FAFBFC"
            fontWeight={700}
            fontSize={[48, 48, 84]}
            my={["10px", "10px", 0]}
          >
            HackIT-BA!
          </Heading>
          <Heading as="h1" size="md" color="#BDC4CF" fontWeight={"normal"}>
            <Badge>48hs de hacking</Badge> por Computer Society
          </Heading>
          {/* <NextLink href="https://bit.ly/hackit-ba" passHref>
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
          </NextLink> */}
        </Flex>
        <Box>
          <NoSSR>
            <ParticleImage
              src={"/images/cs-logo.png"}
              scale={useBreakpointValue({
                base: 0.2,
                sm: 0.25,
                md: 0.4,
                lg: 0.4,
              }, {ssr: false, fallback: 'base'})}
              entropy={innerWidth < 800 ? 20 : 40}
              maxParticles={innerWidth < 800 ? 2000 : 4200}
              width={useBreakpointValue({
                base: 300,
                sm: 300,
                md: 500,
                lg: 500,
              }, {ssr: false, fallback: 'base'})}
              height={useBreakpointValue({
                base: 300,
                sm: 300,
                md: 500,
                lg: 500,
              }, {ssr: false, fallback: 'base'})}
              mouseMoveForce={motionForce}
              touchMoveForce={motionForce}
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
        mt={[-10, -10, 0]}
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
          es una hackathon anual que se realiza en el ITBA, en el que 25 equipos
          de 4 personas viven{" "}
          <Text as="span" fontWeight="700" fontSize="18" color="brand.400">
            48 horas
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
          Rectorado. En ella, cada equipo debera elegir una de las 2 categorías a confirmar para 
          desarrollar durante el evento. 
          {/* Para aplicar simplemente
          tenés que entrar al link{" "}
          <Text as="span" fontWeight="700" fontSize="18" color="brand.400">
            <Link color="brand.200" href="https://bit.ly/hackit-ba">
              bit.ly/hackit-ba
            </Link>
          </Text>{" "}
          y luego de que cierren las inscripciones te vamos a confirmar tu
          presencia. Cada equipo debe elegir 1 categoría para desarrollar un
          proyecto informático que solucione un problema en Inclusión
          Financiera, Ciberseguridad y Privacidad o Productividad y
          Automatización. */}
        </Paragraph>
      </Section>
      <Section
          border="1px"
          borderColor="brand.600"
          mt={(0, 0, 0, 10)}
          px="60px"
          py="60px"
          rounded={32}
          heading="Que es Computer Society ITBA?"
          mb="60px"
      >
        <Paragraph fontSize="18" lineHeight="32px">
          Somos una sociedad técnica formada
          por alumnos y exalumnos del ITBA, dedicada a inspirar
          y educar en diversas áreas de tecnología mayormente relacionadas con la informática.
          Formamos una sub-rama académica de IEEE Computer Society, una de las redes más grandes que conectan profesionales en todo el mundo.
          Podés visitar nuestra página <Text as="span" fontWeight="700" fontSize="18" color="brand.400">
            <Link color="brand.200" href="https://csitba.web.app">
              csitba.web.app
            </Link> y seguirnos en
            <Link   color="brand.200" href="https://twitter.com/ieeecsitba">
              {" "} twitter
            </Link> e
            <Link  color="brand.200" href="https://instagram.com/computer.society.itba/">
              {" "} instagram.
            </Link>
          </Text>
        </Paragraph>
      </Section>
      {/* 
      <Section
        heading={"Tracks"}
        mt={(0, 0, 0, 10)}
        marginTop="80px"
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
        mt={(0, 0, 0, 20)}
        marginTop="30px"
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
        heading={"Gracias a Nuestros Sponsors!"}
        textTransform={"normal"}
        marginTop="60px"
        mt={(0, 0, 0, 20)}
        px="0px"
        py="0px"
        headingOffset={-100}
        rounded={0}
        borderLeft={0}
        borderRight={0}
        borderBottom={0}
        mb="60px"
        fontSize={"32px"}
      >
        <Section
          heading={"Platinum"}
          marginTop="60px"
          mt={(0, 0, 0, 10)}
          px="60px"
          py="60px"
          headingOffset={-100}
          rounded={0}
          border="1px"
          borderColor="#E9ECF3"
          borderLeft={0}
          borderRight={0}
          borderBottom={0}
          mb="60px"
          isSubtitle={true}
        >
          <Flex
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap"
            pt={0}
          >
            <SponsorLogo
              link="https://auth0.com/"
              logo="/images/logos/auth0.png"
              name="auth0"
              height="auto"
              width={217}
            />
            <SponsorLogo
                link="https://www.extrimian.com/"
                logo="/images/logos/extrimian.svg"
                name="Extrimian"
                height="auto"
                width={200}
            />
            <SponsorLogo
              link="https://2pi.network/"
              logo="/images/logos/2pi.png"
              name="2pi"
              width={115}
              height="auto"
              style={{ my: [5, 0] }}
            />
          </Flex>
        </Section>

        <Section
          heading={"Black"}
          marginTop="60px"
          mt={(0, 0, 0, 10)}
          px="60px"
          py="60px"
          headingOffset={-100}
          rounded={0}
          border="1px"
          borderColor="#E9ECF3"
          borderLeft={0}
          borderRight={0}
          borderBottom={0}
          mb="60px"
          isSubtitle={true}
        >
          <Flex
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap"
            pt={0}
          >
            <SponsorLogo
                link="https://ethereum.org"
                logo="/images/logos/ethereum-foundation.png"
                name="ethereum"
                height="auto"
                width={217}
            />
            <SponsorLogo
              link="https://openzeppelin.com/"
              logo="/images/logos/openzeppelin.png"
              name="OpenZeppelin"
              height="auto"
              width={["auto", 180]}
              style={{ my: [5, 0] }}
            />
            <SponsorLogo
              link="https://poap.xyz/"
              logo="https://poap.gallery/icons/poap_dark.png"
              name="POAP"
              height={100}
              style={{ my: [5, 0] }}
            />
            <SponsorLogo
              link="https://exactly.finance/"
              logo="/images/logos/exactly.svg"
              name="Exactly Finance"
              width={160}
            />
            <SponsorLogo
                link="https://www.flowics.com/"
                logo="/images/logos/flowics.svg"
                name="Flowics"
                height="auto"
                width={150}
            />
          </Flex>
        </Section>

        <Section
          heading={"standard"}
          marginTop="60px"
          mt={(0, 0, 0, 10)}
          px="60px"
          py="60px"
          headingOffset={-100}
          rounded={0}
          border="1px"
          borderColor="#E9ECF3"
          borderLeft={0}
          borderRight={0}
          borderBottom={0}
          mb="60px"
          isSubtitle={true}
        >
          <Flex
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap"
            pt={0}
          >

            <SponsorLogo
              link="https://vercel.com/"
              logo="/images/logos/vercel.png"
              name="Vercel"
              height="auto"
              width={150}
            />
            <SponsorLogo
              link="https://daffy.org/"
              logo="/images/logos/daffy.svg"
              name="Daffy"
              width={130}
              height="auto"
            />
          </Flex>
        </Section>
      </Section>
  */}
    </Flex>
  );
};

export default Home;
