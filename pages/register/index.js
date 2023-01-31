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
  Center,

} from "@chakra-ui/react";

import FirstStep from './firstStep'
import SecondStep from './secondStep'
import ThirdStep from './thirdStep'
import FourthStep from './fourthStep';

const steps = [
   <FirstStep/> ,
   <SecondStep/> ,
   <ThirdStep/> ,
   <FourthStep/>
];

const Register = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <>
      {steps[activeStep]}
      <Center paddingTop='5%'>
        <Button onClick={nextStep}
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
      </Center>
    </>
  );
};

export default Register