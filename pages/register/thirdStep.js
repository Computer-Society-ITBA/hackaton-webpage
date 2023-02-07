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
                <Text fontSize={['xs', 'sm', '2xl']}>Inscripcion</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text  fontSize={['xs', 'sm', '2xl']}>Datos equipo</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text color={"#03caa1"} fontSize={['xs', 'sm', '2xl']}>Mail y contraseña</Text>
            </BreadcrumbItem>
       </Breadcrumb>
        <b><Text paddingTop={"50%"} color="#03caa1" fontSize={['2xl', '3xl', '4xl']}> EMAIL </Text></b>
        <Input borderColor={"gray"} focusBorderColor='white' w={['300px', '400px', '500px']} />
        <b><Text paddingTop={"30%"} color="#03caa1" fontSize={['2xl', '3xl', '4xl']}> CONTRASEÑA </Text> </b>
        <Input borderColor={"gray"} focusBorderColor='white' w={['300px', '400px', '500px']} type={"password"}/>
        <Text fontSize={['sm', 'lg', 'xl']} paddingTop={"1%"}>Recorda que estos datos son para  <Text as="span" color="#03caa1"> iniciar sesion</Text></Text>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default ThirdStep