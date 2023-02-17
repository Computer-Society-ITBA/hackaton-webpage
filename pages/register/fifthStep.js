import { Step, Steps, useSteps } from 'chakra-ui-steps';
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
  Textarea
} from "@chakra-ui/react";

const FifthStep = () => {
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
          <Textarea align={"center"}  textColor={"black"} bg="white" focusBorderColor='white' h={["130px", "140px", "150px" ]} w={["350px", "500px", "800px"]}></Textarea>

          <Text align={"center"}  paddingTop={"3%"} fontSize={["sm", "lg", "xl"]}>¿Por qué les interesa participar en HackITBA?</Text>
          <Textarea align={"center"}  textColor={"black"} bg="white" focusBorderColor='white' h={["130px", "140px", "150px" ]} w={["350px", "500px", "800px"]}></Textarea>

          <Text paddingTop={"3%"} align={"center"} fontSize={["sm", "md", "lg"]}><Text as="span" color="Red"> DISCLAIMER: </Text>Al completar la inscripción, todos los miembros del equipi aceptan que su imagen pertenece a IEEE Computer Society ITBA durante el evento</Text>
        </VStack>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default FifthStep