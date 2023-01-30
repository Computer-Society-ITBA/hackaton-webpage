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

const SecondStep = () => {
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
       <Text paddingTop={'5%'} paddingBottom={'5%'} fontSize={['xl', '2xl', '3xl']}> Subi aca el logo de tu equipo </Text>
       <Image src={"/images/backup.svg"} bg="lightGray" borderRadius={"full"} boxSize={["200px", "300px"]}>

       </Image>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default SecondStep