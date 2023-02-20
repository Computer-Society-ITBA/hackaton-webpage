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
  Center
} from "@chakra-ui/react";

const FourthStep = ({setParticipant1, setParticipant2, setParticipant3, setParticipant4, nextStep, prevStep}) => {

  const [p1, setP1 ] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [p4, setP4] = useState("");

  const handleP1 = (event) => {
    setP1(event.target.value);
  }
  const handleP2 = (event) => {
    setP2(event.target.value);
  }
  const handleP3 = (event) => {
    setP3(event.target.value);
  }
  const handleP4 = (event) => {
    setP4(event.target.value);
  }

  const moveForward = () => {
    if (p1 !== "" && p2!= "" && p3 != "" && p4 != ""){
      setParticipant1(p1)
      setParticipant2(p2)
      setParticipant3(p3)
      setParticipant4(p4)
      nextStep()
    } else {return}
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
          <Text fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 1</Text></Text>
          <Input value={p1} onChange={handleP1} textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"}   fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 2</Text> </Text> 
          <Input value={p2} onChange={handleP2} textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"}  fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 3</Text></Text>
          <Input value={p3} onChange={handleP3} textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"} fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 4</Text></Text>
          <Input value={p4} onChange={handleP4} textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>
          <Text fontSize={["sm", "md", "lg"]}>{p1==="" || p2==="" || p3 === "" || p4 === "" ? "Debes completar todos los participantes":""}</Text>
          <Text paddingTop="2%" align={"center"} fontSize={["sm", "md", "lg"]}>Recordá que todas las identidades serán corroboradas con foto del DNI</Text>
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
              Volver 
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
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default FourthStep