import { Step, Steps, useSteps } from 'chakra-ui-steps';
import React, { useState } from 'react';
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
  useToast,
  HStack,
  Icon,
  Spacer,
  CircularProgress,

} from "@chakra-ui/react";

import FirstStep from './firstStep'
import SecondStep from './secondStep'
import ThirdStep from './thirdStep'
import FourthStep from './fourthStep';
import FifthStep from './fifthStep';
import { setOriginalNode } from 'typescript';
import Head from 'next/head';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';


const HeadingSize = ['sm','sm','md','lg','xl']
const doSmth = () => console.log("hey");

const Register = () => {

  const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [participants, setParticipants] = useState([])
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const toast = useToast()
  const toastIdRef = React.useRef()
  const router = useRouter()
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
  const finishInscription = async () => {
    const data = {
      name: name,
      email: email, 
      password: password,
      participants: participants,
      teamDescription:"hello!", 
      motivation:"world!"
    }
    try{
      await fetch("/api/users/team",{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    }catch(err){
      toastIdRef.current =  toast({
        title:"¡La inscripción fue registrada!",
        status:'success',
        isClosable:true,
        duration:5000,
        render: ()=>{
          return(
            <Box backgroundColor='red.500' borderRadius='4px' p='4%' w='full'>
              <VStack>
                <HStack w='full'>
                  <CloseIcon/>
                  <Heading fontSize={HeadingSize}>¡Ocurrió un error!</Heading>
                  <Spacer/>
                  <Button onClick={()=>toast.close(toastIdRef.current)}>Volver</Button>
                </HStack>
                <HStack>
                  <Text>Por favor, intenta nuevamente en un momento</Text>
                  <CircularProgress isIndeterminate  color='grey' value={20}></CircularProgress>
                </HStack>
              </VStack>
            </Box>
          )
        },
        onCloseComplete:()=>{
          router.push('/') //No se si usar replace para que no vuelva
        }
      })
      console.log(err)
      return
    }
    toastIdRef.current =  toast({
      title:"¡La inscripción fue registrada!",
      status:'success',
      isClosable:true,
      duration:5000,
      render: ()=>{
        return(
          <Box backgroundColor='green' borderRadius='4px' p='4%' w='full'>
            <VStack>
              <HStack w='full'>
                <CheckCircleIcon/>
                <Heading fontSize={HeadingSize}>¡Inscripción exitosa!</Heading>
                <Spacer/>
                <Button onClick={()=>toast.close(toastIdRef.current)}>Volver</Button>
              </HStack>
              <HStack>
                <Text>En unos momentos te redigirimos a la pantalla de inicio</Text>
                <CircularProgress isIndeterminate  color='grey' value={20}></CircularProgress>
              </HStack>
            </VStack>
          </Box>
        )
      },
      onCloseComplete:()=>{
        router.push('/') //No se si usar replace para que no vuelva
      }
    })
  }
  const steps = [
    <FirstStep name ={name} setName={setName} nextStep={nextStep}/> ,
    <ThirdStep email={email} setEmail={setEmail} password={password} setPassword={setPassword} nextStep={nextStep} prevStep={prevStep}/> ,
    <FourthStep participants={participants} setParticipants={setParticipants} nextStep={nextStep} prevStep={prevStep}/>,
    <FifthStep desc1={desc1} setDesc1={setDesc1} desc2={desc2} setDesc2={setDesc2} nextStep={finishInscription} prevStep={prevStep}/>
 ];
 
 
  return (
    <>
    {/* progress bar (lo hice a mano para que quede animado) */}
    <Box>
      <Box borderRadius='2px' mt='2%' mx='10%' height='6px' backgroundColor='gray'>
        <Box borderRadius='2px' backgroundColor='CSBlue'  height='6px' width={`${(activeStep+1)*100.0/steps.length}%`} transition='1s ease' transitionDelay='0.1s'></Box>
      </Box>
      <Button onClick={()=>toast.close(toastIdRef.current)}> </Button>
      {steps[activeStep]}
    </Box>
        
    </>
  );
};

export default Register