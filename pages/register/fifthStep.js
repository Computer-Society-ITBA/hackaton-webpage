import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useState } from 'react';
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
  GridItem,
  Spacer,
  VStack,
  Divider,
  Input,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  Image,
  Textarea,
  Center
} from "@chakra-ui/react";

const FifthStep = ({setDesc1, setDesc2, nextStep,prevStep}) => {

  const [d1, setD1] = useState()
  const [d2, setD2] = useState()

  const handleD1 = (e) => {
    setD1(e.target.value)
  }

  const handleD2 = (e) => {
    setD2(e.target.value)
  }

  const moveForward = () => {
    if (d1 == "" || d2 == ""){
      return
    }

    setDesc1(d1)
    setDesc2(d2)
    // callApi()
    
  }

  return (
    <VStack  w="full">
      <Breadcrumb separator={">"} w='full' padding={'2%'} fontSize = "3xl">
            <BreadcrumbItem>
                <Text fontSize={['3xs', 'xs', 'lg', '2xl']}>Inscripcion</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text  fontSize={['3xs', 'xs', 'lg', '2xl']}>Datos equipo</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text fontSize={['3xs', 'xs', 'lg', '2xl']}>Mail y Contraseña</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text color={"#386af6"} fontSize={['3xs', 'xs', 'lg', '2xl']}>Datos del Equipo</Text>
            </BreadcrumbItem>
       </Breadcrumb>
        <VStack w={"full"} align={"center"} >
          <Text align={"center"}  fontSize={["sm", "lg", "xl"]}>Describe al equipo: intereses, estudios, mentalidad.</Text>
          <Textarea value={d1} onChange={handleD1} align={"center"}  textColor={"black"} bg="white" focusBorderColor='white' h={["130px", "140px", "150px" ]} w={["350px", "500px", "800px"]}></Textarea>

          <Text align={"center"}  paddingTop={"3%"} fontSize={["sm", "lg", "xl"]}>¿Por qué les interesa participar en HackITBA?</Text>
          <Textarea value={d2} onChange={handleD2} align={"center"}  textColor={"black"} bg="white" focusBorderColor='white' h={["130px", "140px", "150px" ]} w={["350px", "500px", "800px"]}></Textarea>

          <Text paddingTop={"3%"} align={"center"} fontSize={["sm", "md", "lg"]}><Text as="span" color="Red"> DISCLAIMER: </Text>Al completar la inscripción, todos los miembros del equipi aceptan que su imagen pertenece a IEEE Computer Society ITBA durante el evento</Text>
        </VStack>
        <Center paddingTop='2%'>
            <HStack>
            <Button onClick={prevStep}
              colorScheme="orange"
              size={["sm", "lg"]}
              height="48px"
              width="200px"
              border="5px"
              color="black"
              variant="solid"
              bgColor="orange"
              > 
              Confirmar 
            </Button>
            <Button onClick={moveForward}
              colorScheme="orange"
              size={["sm", "lg"]}
              height="48px"
              width="200px"
              border="5px"
              color="black"
              variant="solid"
              bgColor="orange"
              > 
              Confirmar 
            </Button>
            </HStack>
        </Center>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default FifthStep