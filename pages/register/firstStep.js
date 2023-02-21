import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { extendTheme } from "@chakra-ui/react"
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
  Center,
} from "@chakra-ui/react";
import { useState } from 'react';

const theme = extendTheme({ 
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
 })

const FirstStep = ({setName, name, nextStep}) => {

  const [value, setValue] = useState(name);
  const [invalidValue, setInvalidValue] = useState(false)
  const handleChange = (event) => {
    setValue(event.target.value)
    setInvalidValue(event.target.value==='')
  }

  const moveForward = () =>{
    setName(value)
    nextStep()
  }

  return (
    <VStack>
       <Breadcrumb separator={">"} w='full' padding={"2%"} fontSize = "3xl">
            <BreadcrumbItem>
                <Text fontSize={['xl', '2xl', '3xl']}>Inscripcion</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text color={"orange"} fontSize={['xl', '2xl', '3xl']}>Datos equipo</Text>
            </BreadcrumbItem>
       </Breadcrumb>
        <VStack paddingTop='5%'>
            <Text fontSize={['xl', '2xl', '3xl']} paddingBottom='5%'>Ingresa aca el <Text as="span" color="orange"> nombre de tu equipo:</Text></Text>
            <Input isInvalid={invalidValue} borderWidth='1.5px'  errorBorderColor="red.500" value={value} onChange={handleChange} textColor={"black"} bg="white" focusBorderColor='white' />
            <Text fontSize={['2xs', 'lg', 'xl']} color='red.500'>{invalidValue? "El nombre no puede estar vacio" : ""}</Text>
            <Text fontSize={['xs', 'xl', '2xl']}><Text as="span" color="orange"> Recorda</Text>: el nombre debe ser apropiado para la competencia</Text>
        </VStack>

        <Center paddingTop='2%'>
          <Button onClick={moveForward}
            colorScheme="orange"
            size={["sm", "lg"]}
            height="48px"
            width="200px"
            border="5px"
            color="black"
            variant="solid"
            bgColor="orange"
            isDisabled={invalidValue||value===""}
            > 
            Siguiente 
          </Button>
        </Center>
       
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default FirstStep