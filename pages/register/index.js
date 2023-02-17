import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useState } from 'react';
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
import FifthStep from './fifthStep';
import { setOriginalNode } from 'typescript';

const doSmth = () => console.log("hey");

const Register = () => {

  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [participant1, setParticipant1] = useState();
  const [participant2, setParticipant2] = useState();
  const [participant3, setParticipant3] = useState();
  const [participant4, setParticipant4] = useState();
  const [desc1, setDesc1] = useState();
  const [desc2, setDesc2] = useState();

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const steps = [
    <FirstStep setName={setName} nextStep={nextStep}/> ,
    <SecondStep setImage={setImage} nextStep={nextStep}/> ,
    <ThirdStep setEmail={setEmail} setPassword={setPassword} nextStep={nextStep}/> ,
    <FourthStep setParticipant1={setParticipant1} setParticipant2={setParticipant2} setParticipant3={setParticipant3} setParticipant4={setParticipant4} nextStep={nextStep}/>,
    <FifthStep setDesc1={setDesc1} setDesc2={setDesc2} nextStep={nextStep}/>
 ];
 

  return (
   
    <>
      {console.log(name)}
      {steps[activeStep]}
    </>
  );
};

export default Register