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

const ThirdStep = () => {
  return (
    <VStack>
        <Breadcrumb separator={">"} w='full' padding={'2%'} fontSize = "3xl">
            <BreadcrumbItem>
                <Text fontSize={['sm', 'lg', '3xl']}>Inscripcion</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text  fontSize={['sm', 'lg', '3xl']}>Datos equipo</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text color={"#03caa1"} fontSize={['sm', '2xl', '3xl']}>Mail y contraseña</Text>
            </BreadcrumbItem>
       </Breadcrumb>
        <Text paddingTop={"5%"} color="#03caa1" fontSize={['2xl', '3xl', '4xl']}> EMAIL </Text>
        <Input w={['300px', '400px', '500px']} bg="white"/>
        <Text paddingTop={"5%"} color="#03caa1" fontSize={['2xl', '3xl', '4xl']}> CONTRASEÑA </Text>
        <Input w={['300px', '400px', '500px']} bg="white"/>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default ThirdStep