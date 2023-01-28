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
    <>
      {steps[activeStep]}
      <Center paddingTop='10%'>
        <Button onClick={nextStep}> Confirmar </Button>
      </Center>
    </>
  );
};

export default Register