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
    <VStack>
      <Breadcrumb w={"full"}>
        <BreadcrumbItem>
          <Text>Hola</Text>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text>Hola</Text>
        </BreadcrumbItem>
      </Breadcrumb>
        <VStack w={"full"} align={"left"}>
          <Text>Texto 1</Text>
          <Input w={["350px", "500px", "800px"]}></Input>

          <Text>Texto 2</Text>
          <Input w={["350px", "500px", "800px"]}></Input>

          <Text>Texto 3</Text>
          <Input w={["350px", "500px", "800px"]}></Input>

          <Text>Texto 3</Text>

        </VStack>
    </VStack>
  );
};
//size={['sm','md','lg','xl','2xl']
export default FourthStep