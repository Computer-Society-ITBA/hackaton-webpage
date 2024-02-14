import Link from "next/link";
import { useState } from "react";
import {
  EmailIcon,
  LockIcon,
  UnlockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { setRevalidateHeaders } from "next/dist/server/send-payload";

import auth from "../../config/firebaseConfig";
import { updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];

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
    color: #ffa300;
    border: 1px solid #ffa300;

    svg path {
      fill: #2fe0b5;
    }
  }
`;


function Home() {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showRepeatePassword, setShowRepeatePassword] = useState(false);
  // const [password, setPassword] = useState("");
  // const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErorrMessage] = useState("");
  const [correctMessage, setCorrectMessage] = useState("");

  const [correctEmail, setCorrectEmail] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value.trim());

  const handleSendResetEmail = (email) => {
    // sendPasswordResetEmail(email).then(() => {
      sendPasswordResetEmail(auth, email).then(() => {
      // console.log("Email sent!");
      setCorrectEmail(true);
      setCorrectMessage(`Correo enviado correctamente a ${email}.`);
    }).catch((error) => {
      // console.log(`Error ${error}`);
      setErorrMessage("Ocurrio un error, revisa el que el email sea correcto.");
    })

  };

  return (
    <VStack width="full" direction="column" justifyContent="space-between">
      <Img
        src="/images/Sponsor_corner_1.svg"
        alt="decoration image"
        alignSelf="start"
        w={["18%", "15%", "12%", "10%", "8%"]}
      ></Img>
      <Flex
        gap="2em"
        align="center"
        direction="column"
        width={["85%", "65%", "50%", "40%", "30%"]}
      >
        <Heading size={HeadingSize}>Reiniciar contraseña</Heading>

        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <EmailIcon />
          </InputLeftElement>
          <Input
            value={email}
            onChange={handleEmailChange}
            minH="3.5em"
            placeholder="Ingresá tu email"
            borderWidth="1.5px"
            focusBorderColor="CSOrange"
            errorBorderColor="red.500"
            borderRadius="4px"
            backgroundColor="white"
            color="black"
            _placeholder={{ color: "gray" }}
          ></Input>
        </InputGroup>
        <Text fontSize={TextSize}>
          Se enviara un correo a esa direccion para restablecer la contraseña.
        </Text>

        <InscribirseButton
          isLoading={isLoading}
          onClick={() => handleSendResetEmail(email)}
          backgroundColor="CSOrange"
          width="full"
        >
          Enviar
        </InscribirseButton>

        {/* <Text fontSize={TextSize} color="red.500"> */}
        <Text fontSize={TextSize} color={correctEmail ? "CSGreen": "red.500"}>
          {correctEmail ? correctMessage: errorMessage}
        </Text>


      </Flex>
    </VStack>
  );
}

export default Home;
