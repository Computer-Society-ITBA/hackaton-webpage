import { EmailIcon, LockIcon, UnlockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, Img, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';

const HeadingSize = ['sm','md','lg','xl','2xl']
const TextSize = ['xs','sm','md','lg','xl']
const IngresarButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;

  svg path {
    fill: #1e212a;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #2fe0b5;
    border: 1px solid #2fe0b5;

    svg path {
      fill: #2fe0b5;
    }
  }
`;
const InscribirseButton = styled(Button)`
border-radius: 4px;
font-weight: 500;
border-width: 1px;
transition: all 0.3s ease;
padding: 4% 8%;

svg path {
  fill: #1e212a;
  transition: all 0.3s ease;
}

&:hover {
  background-color: transparent;
  color:#FFA300;
  border: 1px solid #FFA300;

  svg path {
    fill: #2fe0b5;
  }
}
`;
const Home = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <VStack width='full' direction='column' justifyContent='space-between'>
            <Img src='/images/Sponsor_corner_1.svg' alt="decoration image" alignSelf='start' w={['18%','15%','12%','10%','8%']}></Img>
            <Flex gap='2em' align='center' direction='column' width={['85%','65%','50%','40%','30%']}>
                <Heading size={HeadingSize}>Iniciar sesión</Heading>
                <InputGroup>
                    <InputLeftElement minH='3.5em'  children={<EmailIcon/>} color='grey'></InputLeftElement>
                    <Input minH='3.5em' placeholder="Ingresá tu email" borderWidth='1.5px'  focusBorderColor='CSOrange'  errorBorderColor="red.500" borderRadius='4px' backgroundColor='white' color='black' _placeholder={{color:'gray'}}></Input>
                </InputGroup>
                <InputGroup>
                    <InputLeftElement minH='3.5em'  children={<LockIcon/>} color='grey'></InputLeftElement>
                    <Input type={showPassword?'text':'password'} minH='3.5em' placeholder="Ingresá tu contraseña" borderWidth='1.5px'  focusBorderColor='CSOrange'  errorBorderColor="red.500" borderRadius='4px' backgroundColor='white' color='black' _placeholder={{color:'gray'}}></Input>
                    <InputRightElement minH='3.5em'>
                        <IconButton color='black' icon={showPassword?<ViewIcon/>:<ViewOffIcon/>} onClick={()=>setShowPassword(!showPassword)}></IconButton>
                    </InputRightElement>
                </InputGroup>
                <Link href='/forgot-password' ><Text fontSize={TextSize} cursor='pointer' _hover={{"color":"CSGreen"}} >¿Olvidaste tu contraseña?</Text></Link>
                <IngresarButton backgroundColor='CSGreen' width='full'>Ingresar</IngresarButton>
                <Text mt='4%' fontSize={TextSize}>¿No estás inscripto?</Text>
                <InscribirseButton backgroundColor='CSOrange' width='full'>Registrarse</InscribirseButton>
            </Flex>
        </VStack>
    )
}
  
  
  export default Home;