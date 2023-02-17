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
  Image
} from "@chakra-ui/react";

const FourthStep = () => {
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
          <Input textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"}   fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 2</Text> </Text> 
          <Input textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"}  fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 3</Text></Text>
          <Input textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop={"2%"} fontSize={["md", "lg", "xl"]}>Ingresa nombre y apellido del <Text as="span" color="#386af6"> participante 4</Text></Text>
          <Input textColor={"black"} bg="white" focusBorderColor='white' h={["30px", "40px", "50px" ]} w={["350px", "500px", "800px"]}></Input>

          <Text paddingTop="2%" align={"center"} fontSize={["sm", "md", "lg"]} paddingTop={"2%"}>Recordá que todas las identidades serán corroboradas con foto del DNI</Text>

        </VStack>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default FourthStep