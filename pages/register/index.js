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
  VStack,
  Progress,

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
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [participants, setParticipants] = useState([])
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const registerUser = async () => {
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        "email": email,
	      "password": password,
        "name": name 
      }),
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then((response) => {response.json})
    .then((data) => console.log(data))
    .catch((e) => console.log(e.message))
  }
  const steps = [
    <FirstStep name ={name} setName={setName} nextStep={nextStep}/> ,
    <ThirdStep email={email} setEmail={setEmail} password={password} setPassword={setPassword} nextStep={nextStep} prevStep={prevStep}/> ,
    <FourthStep participants={participants} setParticipants={setParticipants} nextStep={nextStep} prevStep={prevStep}/>,
    <FifthStep setDesc1={setDesc1} setDesc2={setDesc2} nextStep={nextStep} prevStep={prevStep}/>
 ];
 
 
  return (
    <>
    {/* progress bar (lo hice a mano para que quede animado) */}
    <Box>
      <Box borderRadius='2px' mt='2%' mx='10%' height='6px' backgroundColor='gray'>
        <Box borderRadius='2px' backgroundColor='CSBlue'  height='6px' width={`${(activeStep+1)*100.0/steps.length}%`} transition='1s ease' transitionDelay='0.1s'></Box>
      </Box>
      {steps[activeStep]}
    </Box>
        
    </>
  );
};

export default Register