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
} from "@chakra-ui/react";

import FirstStep from './firstStep'

const steps = [
   <FirstStep/> ,
   <h1> Step 1 </h1> ,
   <h1> Step 2 </h1> ,
];

const Register = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Flex flexDir="column" width="100%">
      {steps[activeStep]}
      <button onClick={nextStep}> Hola </button>
    </Flex>
  );
};

export default Register