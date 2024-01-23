import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { EmailIcon, CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  Stack,
  VStack,
  HStack,
  Heading,
  Flex,
  Img,
  InputGroup,
  Input,
  InputLeftElement,
  Radio,
  RadioGroup,
  Text,
  Box,
  CircularProgress,
  Textarea,
  Button,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import joi from "joi";

const EnviarButton = styled(Button)`
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
const HeadingSize = ["sm", "md", "lg", "xl", "xl"];

const Forms = ({ ...extendedProps }) => {
  const router = useRouter();
  const toast = useToast();
  const toastIdRef = useRef();
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [body, setBody] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [rolError, setRolError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validateEmail = (email) => {
    return (
      joi
        .string()
        .email({ tlds: { allow: false } })
        .validate(email).error === undefined
    );
  };
  const sendEmail = async () => {
    const msg = {
      email: email,
      subject: "Solicitud de " + rol,
      body: body,
    };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_WEBPAGE_TOKEN ,
      },
      body: JSON.stringify(msg),
    };
    setIsLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/mail/send`,
        fetchOptions
      );
      toastIdRef.current = toast({
        title: "¡Solicitud enviada!",
        status: "success",
        isClosable: true,
        duration: 5000,
        render: () => {
          return (
            <Box backgroundColor="green" borderRadius="4px" p="4%" w="full">
              <VStack>
                <HStack w="full">
                  <CheckCircleIcon />
                  <Heading fontSize={HeadingSize}>¡Solicitud enviada!</Heading>
                  <Spacer />
                  <Button onClick={() => toast.close(toastIdRef.current)}>
                    Cerrar
                  </Button>
                </HStack>
                <HStack>
                  <Text>Nos comunicaremos por email brevemente</Text>
                  <CircularProgress
                    isIndeterminate
                    color="grey"
                    value={20}
                  ></CircularProgress>
                </HStack>
              </VStack>
            </Box>
          );
        },
      });
      setEmail("");
      setRol("");
      setBody("");
      setEmailError(false);
      setRolError(false);
      setBodyError(false);
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.log(err);
      toastIdRef.current = toast({
        title: "¡Solicitud enviada!",
        status: "success",
        isClosable: true,
        duration: 5000,
        render: () => {
          return (
            <Box backgroundColor="red.500" borderRadius="4px" p="4%" w="full">
              <VStack>
                <HStack w="full">
                  <CloseIcon />
                  <Heading fontSize={HeadingSize}>¡Ocurrió un error!</Heading>
                  <Spacer />
                  <Button onClick={() => toast.close(toastIdRef.current)}>
                    Cerrar
                  </Button>
                </HStack>
                <HStack>
                  <Text>Por favor, intenta nuevamente en un momento</Text>
                  <CircularProgress
                    isIndeterminate
                    color="grey"
                    value={20}
                  ></CircularProgress>
                </HStack>
              </VStack>
            </Box>
          );
        },
      });
    }
    setIsLoading(false);
  };
  return (
    <VStack
      width="full"
      direction="column"
      justifyContent="space-between"
      {...extendedProps}
    >
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
        width={["85%", "65%", "50%", "50%", "50%"]}
      >
        {" "}
        <Heading size={HeadingSize} textAlign="center">
          ¿Querés ser Sponsor, Juez o Mentor?
        </Heading>
        <Heading>Mandanos tu solicitud</Heading>
        <InputGroup>
          <InputLeftElement minH="3.5em" color="grey">
            <EmailIcon />
          </InputLeftElement>
          <Input
            placeholder="Ingresá tu email"
            value={email}
            isInvalid={emailError}
            minH="3.5em"
            borderWidth="1.5px"
            errorBorderColor="red.500"
            focusBorderColor="CSOrange"
            borderRadius="4px"
            backgroundColor="white"
            color="black"
            _placeholder={{ color: "gray" }}
            {...extendedProps}
            onClick={() => setEmailError(!validateEmail(email))}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(!validateEmail(event.target.value));
            }}
          ></Input>
        </InputGroup>
        <RadioGroup onChange={setRol} value={rol}>
          <Stack direction="row" spacing={5}>
            <Radio
              value="SPONSOR"
              isInvalid={rolError}
              colorScheme="green"
              size="lg"
            >
              Sponsor
            </Radio>
            <Radio
              value="MENTOR"
              isInvalid={rolError}
              colorScheme="green"
              size="lg"
            >
              Mentor
            </Radio>
            <Radio
              value="JURADO"
              isInvalid={rolError}
              colorScheme="green"
              size="lg"
            >
              Jurado
            </Radio>
          </Stack>
        </RadioGroup>
        <Textarea
          onClick={() => setBodyError(body.length === 0)}
          isInvalid={bodyError}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            setBodyError(event.target.value === "");
          }}
          height={["4em", "6em", "8em", "10em", "12em"]}
          focusBorderColor="CSOrange"
          borderRadius="4px"
          backgroundColor="white"
          borderWidth="1.5px"
          errorBorderColor="red.500"
          color="black"
          _placeholder={{ color: "gray" }}
          placeholder="Mensaje"
        ></Textarea>
        <EnviarButton
          width="full"
          backgroundColor="CSGreen"
          _disabled={{
            borderRadius: "4px",
            opacity: 0.4,
            fontWeight: 500,
            borderWidth: "1px",
            transition: "all 0.3s ease",
            padding: "4% 8%",
            "&:hover": {
              backgroundColor: "#FFFFFF",
              color: "#FFFFFF",
              borderRadius: "4px",
              borderWidth: "1px",
              borderColor: "var(--chakra-colors-chakra-border-color)",
              "svg path": {},
            },
          }}
          isDisabled={
            emailError ||
            rolError ||
            bodyError ||
            email === "" ||
            rol === "" ||
            body === ""
          }
          isLoading={isLoading}
          onClick={sendEmail}
        >
          Enviar
        </EnviarButton>
      </Flex>
    </VStack>
  );
};
export default Forms;
