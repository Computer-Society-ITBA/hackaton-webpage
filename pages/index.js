import React, { useState } from "react";
import {
  Heading,
  Flex,
  Text,
  Button,
  Grid,
  Img,
  VStack,
  Divider,
  Spacer,
  HStack,
  GridItem,
  Stack,
  Input,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import SponsorLogo from "../components/SponsorLogo";
import styled from "@emotion/styled";
import ParticlesLogo from "../components/ParticlesLogo"
import CategoryLogo from "../components/CategoryLogo";
import Jury from '../components/Jury';
import AutomationLogo from "../components/AutomationLogo";
import EconomyLogo from "../components/EconomyLogo";
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
  const categories = [
    {
        name:"Economía y Descentralización",
        description:'Crear formas innovadoras para inclusión financiera, validación de identidad y nuevas herramientas de la Web 3.0.',
        scope:['billetera Web 3.0','Juegos en Web 3.0'],
        logo: EconomyLogo
    },
    {
        name:"Automatización Inteligente",
        description:'Solucionar problemas de automatización creando herramientas para aumentar la productividad general.',
        scope:['billetera Web 3.0','Juegos en Web 3.0'],
        logo: AutomationLogo
    }
  ]
  return(
    <HStack paddingX='10%' w='full' justify='center' spacing='20%' {...extendedProps}>
      {/* Es feo pasar el array, pero es lo que se me ocurrio para que se muestre bien con distintas formas  */}
      {categories.map((category)=>{
        return (
          <CategoryLogo key={category.name} category={category}></CategoryLogo>
        )
      })}
    </HStack>
  )
}
const Inscribite = ({...extendedProps})=>{
  const imageWidth = ['35%','35%','30%','30%','30%']
  return(
      <Flex direction='row' width='100%' alignItems='center' height='20%' {...extendedProps}>
        <Img src="/images/Inscribite_1.svg" alt="Decoration" width={imageWidth} height='100%'></Img>
        <Spacer/>
        <VStack justify='center' spacing='5%'>
          <Heading size={['xs','sm','md','md','lg']} textAlign='center' >
            Inscripción por equipos
          </Heading>
          <PrimaryButton height='2%' backgroundColor="CSGreen" fontSize={['xs','sm','xl','2xl','3xl']} size={['xs','xs','lg','lg','lg']}>INSCRIBITE AQUI</PrimaryButton>
        </VStack>
        <Spacer/>
        <Img src="/images/Inscribite_2.svg" alt="Decoration" width={imageWidth} height='100%'></Img>
      </Flex>
  )
}
const JurySection = ({...extendedProps}) => {
  const juries = [
    {name: "Gabriela Macagni", imgSrc:"/images/juries/GabrielaMacagni.jpg",details:"Co-fundadora Matterscale Ventures y ex directora ejecutiva de Endeavor Argentina"},
    {name: "Guillermo Rodriguez", imgSrc:"/images/juries/Guillermo-Rodriguez.jpg",details:"Director de Carrera Ingenieria Informatica ITBA, Investigador adjunto del CONICET especializado en machine learning"},
    {name: "Gabriel Gruber", imgSrc:"/images/juries/GabrielGruber.png",details:"Co-Founder y CEO en Exactly Finance, previamente Co-founder y CEO de Properati"},
    {name: "Pablo Sabbatella", imgSrc:"/images/juries/PabloSabbatella.jpeg",details:"Founder y director de Defy Education, reconocido inversor e investigador en el ecosistema crypto"},
  ]
  return(
    <VStack width='full' {...extendedProps}>
      <Heading color="CSOrange" size={HeadingSize} textAlign='center' >Jurados</Heading>
      <Text fontSize={TextSize}>Conoce a nuestros jurados</Text>
      <Grid paddingX='4%' pt='4%' templateColumns={['repeat(2, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)','repeat(4, 1fr)']} justifyItems='center' width='full' spacing='3%'>
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
    {name:'Nestle',logo:'/images/logos/Nestle.svg',link:'https://www.nestle.com.ar'},
    {name:'Accenture',logo:'/images/logos/Accenture.png',link:'https://www.accenture.com/ar-es'},
    {name:'Defy Education',logo:'/images/logos/Defy.png',link:'https://www.defyeducation.com'},
  ]
  return(
    <VStack w='full' mt={0} {...extendedProps}>
        <Img src='/images/Sponsor_corner_1.svg' alt="decoration image" alignSelf='start' w={['20%','18%','15%','12%','10%']}></Img>
      <VStack top='-1'>
        <Heading color="CSOrange" size={HeadingSize} textAlign='center' >Sponsors 2023</Heading>
        <Text fontSize={TextSize}>Empresas que nos acompañan</Text>
      </VStack>
      <Grid paddingX='6%' templateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)']}>
        {sponsors.map((sponsor)=>{
          return(
            <GridItem padding='4%' key={sponsor.name}>
              <SponsorLogo height={['100%','80%','80%','70%','70%']} width={['100%','80%','80%','70%','70%']} link={sponsor.link} logo={sponsor.logo} name={sponsor.name}></SponsorLogo>
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
    <VStack w={['100%','100%','100%','50%','50%']} {...extendedProps}>
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
    <Stack spacing='4%' direction={['column','column','row','row','row']} width='full' justify='center' px='4%' {...extendedProps}>
      <VStack spacing="4%">
        <Heading size={['md','lg','xl','2xl','3xl']}>¿Tenes dudas?</Heading>
        <Heading size={['md','lg','xl','2xl','3xl']} color='CSOrange'>¡Contactanos!</Heading>
        <Img src={CS_img} alt='ITBA IEEE Computer Society image'></Img>
      </VStack>
      <Form/>
    </Stack>
  )
}
const Home = () => {
  return (
    <VStack>
      {/* Le paso a todos el padding y no lo pongo en gap porque entre workshops y sponsors no tiene que haber espacio */}
      <ParticlesLogo/>
      <GeneralInfo pt='4%' zIndex={90}/>
      <Categories pt='4%' zIndex={90}/>
      {/* Seccion inscribirse */}
      {/* <Inscribite pt='4%' zIndex={90}/> */}
      <JurySection pt='4%' zIndex={90}/>
      {/* <WorkshopsSection pt='4%' zIndex={90}/> */}
      {/* TODO: sacar pt='4%' cuando vuelvan los workshops */}
      <SponsorsSection zIndex={90} pt='4%'/>
      {/* <DoubtSection pt='4%' zIndex={90}/> */}
      {/* TODO: revisar por que con las particulas no funcionan las animaciones de los logos de sponsors */}
      {/* Lo solucione con zindex, si no creo que toma como que estan atras del canvas que tiene a las particulas */}
    </VStack>
    
  )
}


export default Home;
