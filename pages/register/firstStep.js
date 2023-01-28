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
  BreadcrumbItem
} from "@chakra-ui/react";

const FirstStep = () => {
  return (
    <VStack>
       <Breadcrumb separator={">"} w='full' padding={"2%"} fontSize = "3xl">
            <BreadcrumbItem>
                <Text fontSize={'3xl'}>Inscripcion</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Text color={"orange"} fontSize={"3xl"}>Datos equipo</Text>
            </BreadcrumbItem>
       </Breadcrumb>
        <VStack paddingTop='10%'>
            <Text fontSize={['3xl', '2xl', 'xl']} paddingBottom='5%'>Ingresa aca el nombre de tu equipo:</Text>
            <Input/>
            <Text fontSize={['sm', 'xl']}>Recorda que el nombre debe ser apropiado para la competencia</Text>
        </VStack>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default FirstStep