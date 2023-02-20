import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useEffect } from 'react';
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

const SecondStep = ({nextStep,prevStep}) => {

  const divStyle = {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "100%",
    alignItems: "center",
    display: "flex",
    "justify-content": "center",
    padding:"2.5%"
  }

  const moveForward = () => {
    //Asign image with setter
    nextStep()
  }

  return (
    <VStack>
        <Breadcrumb separator={">"} w='full' padding={'2%'} fontSize = "3xl">
            <BreadcrumbItem>
                <Text fontSize={['xl', '2xl', '3xl']}>Inscripcion</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text color={"orange"} fontSize={['xl', '2xl', '3xl']}>Datos equipo</Text>
            </BreadcrumbItem>
       </Breadcrumb>
       <Text paddingTop={'1%'} paddingBottom={'5%'} fontSize={['xl', '2xl', '3xl']}> Subi aca el <Text as="span" color="orange"> logo de tu equipo</Text> </Text>
       <div style={divStyle}>
        <Image src={"/images/backup.svg"} borderRadius={"full"} boxSize={["150px", "250px"]}>

        </Image>
       </div>
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
export default SecondStep