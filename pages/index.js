import React, { useEffect, useState } from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Grid,
  Img,
  VStack,
  Divider,
  Spacer,
  HStack,
  GridItem,
  Stack,
  Input,
  Textarea,
  StackDivider,
  useToast,
  Box,
  CircularProgress,
} from "@chakra-ui/react";
import SponsorLogo from "../components/SponsorLogo";
import styled from "@emotion/styled";
import NewLogo from "../components/NewLogo";
import NewCategoryLogo from "../components/NewCategoryLogo";
import Jury from "../components/Jury";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import joi from "joi";
import useStore from "../config/storeConfig";

// const Subtitle = styled(Text)`
//   font-size: 14px;
//   text-transform: uppercase;
//   color: #b1b7c2;
// `;

// const Separator = styled.span`
//   border-left: 1px solid #b1b7c2;
//   margin-left: 16px;
//   margin-right: 16px;
// `;

// const Badge = styled.span`
//   color: #2f323a;
//   background-color: #bdc4cf;
//   text-transform: uppercase;
//   border-radius: 4px;
//   padding: 5px 6px;
//   font-size: 13px;
//   font-weight: 500;
//   margin-right: 8px;
// `;

const PrimaryButton = styled(Button)`
  border-radius: 4px;
  font-weight: 500;
  border-width: 1px;
  transition: all 0.3s ease;
  padding: 4% 8%;

  svg path {
    fill: #AFEFF3;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: transparent;
    color: #AFEFF3;
    border: 1px solid #AFEFF3;

    svg path {
      fill: #AFEFF3;
    }
  }
`;

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];
//Dejamos algunos subcomponentes aca, no los hago como componentes porque no se reutilizan
const GeneralInfo = ({ ...extendedProps }) => {
  return (
    <VStack spacing={4} paddingX="5%" w="full" {...extendedProps}>
      <Heading
        as="h1"
        display="inline"
        size={HeadingSize}
        color="CSLightOrange"
        textAlign={"center"}
        paddingY="6px"
      >
        ¿Qué es HackITBA?
      </Heading>
      <Divider variant="thick"></Divider>
      <Text textAlign="center" fontSize={TextSize}>
        <Text as="span" color="CSLightBlue">
          HackITBA
        </Text>{" "}
        es una hackathon organizada por y para estudiantes, donde, en grupos de
        4 personas, deben generar un MVP en 36 horas de competencia intensiva.
      </Text>
      <Text textAlign="center" fontSize={TextSize}>
        La competencia tiene como meta promover soluciones creativas a problemas
        actuales en un ambiente desafiante y cooperativo.
      </Text>
      <Divider variant="thick"></Divider>
    </VStack>
  );
};
const Categories = ({ ...extendedProps }) => {
  const categories = [
    {
      name: "Salud",
      description:`La categoría de **Salud y Bienestar** busca soluciones innovadoras para mejorar la calidad de vida y el acceso a servicios de salud. Considera temas como:
-   **Acceso a información y servicios de salud.**
-   **Apoyo en rehabilitación y movilidad.**
-   **Innovación en comercio de salud.**
\nLos proyectos pueden enfocarse en promover la salud en cualquier área, facilitando el bienestar físico y mental en diversos entornos.`,
      scope: [],
      logo: "/images/categories/new-salud.png",
      logoSvg: false,
      logoSmall: "/images/categories/codySaludSmall.png",
      color: "CSRed",
    },
    {
      name: "Sustentabilidad",
      description:`La categoría de **Sustentabilidad** busca soluciones creativas y aplicables para promover un equilibrio entre el desarrollo económico, social y ambiental. Considera temas como:

-   **Reducción de la huella ecológica.**
-   **Optimización del uso de recursos naturales.**
-   **Economía circular y reciclaje.**
-   **Energías renovables y eficiencia energética.**
-   **Gestión y mitigación de residuos.**
-   **Conservación de biodiversidad y ecosistemas.**

\nLos proyectos pueden enfocarse en mejorar la sostenibilidad en cualquier área, desde la vida cotidiana hasta las operaciones industriales y comerciales.`,
      scope: [],
      logo: "/images/categories/new-sustentabilidad.png",
      logoSmall: "/images/categories/codySustentableSmall.png",
      logoSvg: false,
      color: "CSGreen",
    },
    {
      name: "Educación",
      description:`La categoría de **Educación** busca soluciones prácticas e innovadoras que mejoren el aprendizaje y preparen a las personas con habilidades clave para enfrentar los desafíos actuales, desde la educación financiera hasta el acceso digital y el desarrollo profesional.
      
-   **Educación financiera práctica**: Proyectos que enseñen el manejo del dinero desde conceptos básicos hasta inversiones, ahorro, presupuesto personal y planificación financiera.
-   **Acceso universal a la educación digital**.
-   **Apoyo a docentes y facilitadores**.
-   **Inclusión y equidad educativa**.`,
      scope: [],
      logo: "/images/categories/new-edu.png",
      logoSmall: "/images/categories/codyEducativoSmall.png",
      logoSvg: false,
      color: "CSBlue",
    },
  ];
  return (
    <VStack spacing={4} paddingX="5%" paddingY="5%">
      <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
        Categorías
      </Heading>
      <HStack
        paddingX="10%"
        h="100%"
        justify="center"
        spacing="15%"
        {...extendedProps}
      >
        {/* Es feo pasar el array, pero es lo que se me ocurrio para que se muestre bien con distintas formas  */}
        {categories.map((category) => {
          return (
            <NewCategoryLogo key={category.name} category={category}></NewCategoryLogo>
          );
        })}
      </HStack>
    </VStack>
  );
};
const InscriptionSection = ({ ...extendedProps }) => {
  const imageWidth = ["25%", "28%", "25%", "28%"];
  const vstackWidth = ["40%", "100%", "50%", "21%", "25%", "22%"];
  const pbFontSize = ["2xs", "xs", "sm", "lg", "xl", "3xl"];
  const pbSize = ["2xs", "xs", "sm", "md", "2xl", "xl"];
  const pbMT = [3, 5, 5, 7, 9, 20];
  return (
    <Flex
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      height="20%"
      {...extendedProps}
    >
      <Img
        src="/images/chars-left.png"
        alt="Decoration"
        width={imageWidth}
      ></Img>
      <VStack justify="center" width={vstackWidth}>
        <Heading size={["xs", "sm", "md", "md", "xl", "xl"]} textAlign="center">
          Inscripción por equipos
        </Heading>
        <PrimaryButton
          mt={pbMT}
          height="2%"
          backgroundColor="CSLightBlue"
          color="CSDarkBlue"
          fontSize={pbFontSize}
          size={pbSize}
          onClick={() => {
            location.href = "/register";
          }}
        >
          INSCRIBITE ACÁ
        </PrimaryButton>
      </VStack>
      {/* TODO: Turn on for next event? */}
      {/* <Spacer />
      <VStack justify="center" width={vstackWidth}>
        <Heading size={["xs", "sm", "md", "md", "xl", "xl"]} textAlign="center">
          Convertite en Sponsor/Jurado
        </Heading>
        <PrimaryButton
          mt={pbMT}
          height="2%"
          backgroundColor="CSGreen"
          fontSize={pbFontSize}
          size={pbSize}
          onClick={() => {
            location.href = "/SMJ";
          }}
        >
          CONTACTANOS AQUI
        </PrimaryButton>
      </VStack> */}
      <Img
        src="/images/chars-right.png"
        alt="Decoration"
        width={imageWidth}
      ></Img>
    </Flex>
  );
};
const JurySection = ({ ...extendedProps }) => {
  const juries = [
    {
      name: "Paul Detry",
      imgSrc: "/images/juries/PaulDetry.jpeg",
      details: "CTO en Balanz",
      revealed: true,
    },
    {
      name: "Mariano Daniel Vazquez",
      imgSrc: "/images/juries/MarianoDanielVazquez.jpeg",
      details: "Co Founder y CTO de Bondly, previamente CTO en MODO",
      revealed: true,
    },
    {
      name: "Martin Sciarrillo",
      imgSrc: "/images/juries/MartinSciarrillo.jpeg",
      details:
        "Director Data & AI for Hispanic South America en Microsoft, previamente CTO en Microsoft Argentina",
      revealed: true,
    },
    {
      name: "Paula Bonomini",
      imgSrc: "/images/juries/PaulaBonomini.jpeg",
      details:
        "Directora de la carrera de Bioingeniería en ITBA, investigadora adjunta de CONICET",
      revealed: true,
    },
    {
      name: "Alejandra Weill",
      imgSrc: "/images/juries/AlejandraWeill.jpeg",
      details:
        "Orchestration and developer services Sr. Product Manager en ExxonMobil",
      revealed: true,
    },
  ];
  return (
    <VStack width="full" {...extendedProps}>
      <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
        Jurados
      </Heading>
      {/*<Text fontSize={TextSize}>Conocé a nuestros jurados</Text>*/}
      <Flex
        width="full"
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="start"
        verticalAlign="top"
      >
        <Text fontSize={TextSize}>Próximamente...</Text>
        {/* TODO - Cuando estén todos los jurados renovar
          juries.map((jury, index) => {
          return <Jury key={index} jury={jury} my="2%" mx="4%"></Jury>;
        })*/}
      </Flex>
    </VStack>
  );
};

const MentorsSection = ({ ...extendedProps }) => {
  const mentors = [
    {
      name: "José Abuchaem",
      imgSrc: "/images/mentors/JoséAbuchaem.jpeg",
      details:
        "Software Engineer en Podcast App, Mentor en OZOM Builders, Advisor en SimpleState, Co-founder y previamente CFO y CMO en Tienda Nube",
      revealed: true,
    },
    {
      name: "Juan Catalano",
      imgSrc: "/images/mentors/JuanCatalano2.jpeg",
      details: "Founder y CPO en Podcast App",
      revealed: true,
    },
    {
      name: "Marisabel Rodriguez",
      imgSrc: "/images/mentors/MarisabelRodriguez.jpeg",
      details: "Cloud Delivery Center Manager en Google",
      revealed: true,
    },
    {
      name: "Luqui Diaz",
      imgSrc: "/images/mentors/LucasDiaz.jpeg",
      details: "Co-founder y COO en Mudafy",
      revealed: true,
    },
    {
      name: "Federico Viarnés",
      imgSrc: "/images/mentors/FedericoViarnes2.jpeg",
      details:
        "Ex VP de Producto en BuenBit, actualmente desarrollando proyectos en blockchain.",
      revealed: true,
    },
    {
      name: "Matías Podrojsky",
      imgSrc: "/images/mentors/MatiasPodrojsky.jpeg",
      details: "Co-founder y CHRO en Wirsolut",
      revealed: true,
    },
    {
      name: "Javier Roberts",
      imgSrc: "/images/mentors/JavierRoberts.jpeg",
      details: "CTO en Wúru",
      revealed: true,
    },
    {
      name: "Nicolas D'Onofrio",
      imgSrc: "/images/mentors/NicolasDonofrio.jpeg",
      details:
        "Co-founder en Manteca, Co-founder en TiendaCrypto, Co-founder en Tienda Dolar",
      revealed: true,
    },
    {
      name: "Juan Manuel Amorós",
      imgSrc: "/images/mentors/JuanAmoros.png",
      details: "Founder & CEO en Emprelatam",
      revealed: true,
    },
    {
      name: "Marcelo Turrin",
      imgSrc: "/images/mentors/MarceloTurrin.jpeg",
      details: "Software Engineer en Blue Alba, Profesor en ITBA",
      revealed: true,
    },
  ];
  return (
    <VStack width="full" {...extendedProps}>
      <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
        Mentores
      </Heading>
      {/*<Text fontSize={TextSize}>Conocé a nuestros mentores</Text>*/}
      <Text fontSize={TextSize}>Próximamente...</Text>
      {/* TODO - Descomentar cuando se tengan todos los mentors disponibles
      <Grid
        paddingX="4%"
        paddingY="4%"
        pt="4%"
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)",
        ]}
        justifyItems="center"
        width="full"
        gap={1}
        rowGap={6}
      >
        mentors.map((mentor, index) => {
          return (
            <GridItem key={index}>
              <Jury jury={mentor}></Jury>{" "}
              {/* Queda mal el keyword pero creo que el componente sería el mismo * /}
            </GridItem>
          );
        })
      </Grid>*/}
    </VStack>
  );
};

// const WorkshopsSection = ({ ...extendedProps }) => {
//   const workshopsPhotos = [
//     "/images/course_example.jpg",
//     "/images/course_example.jpg",
//     "/images/course_example.jpg",
//     "/images/course_example.jpg",
//     "/images/course_example.jpg",
//   ];
//   return (
//     <Stack
//       direction={["column", "column", "row", "row", "row"]}
//       backgroundColor="#24335d"
//       width="full"
//       paddingY="8%"
//       {...extendedProps}
//     >
//       <VStack
//         alignItems="start"
//         width={["100%", "100%", "40%", "40%", "40%"]}
//         pl="6%"
//         spacing="4%"
//       >
//         <Heading color="CSGreen" size={HeadingSize}>
//           Workshops
//         </Heading>
//         <Text fontSize={TextSize} width="80%">
//           Workshops en vivo con .... Lorem ipsum dolor sit amet, consectetur
//           adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
//           magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
//           ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
//         </Text>
//       </VStack>
//       <Grid
//         p="2%"
//         templateColumns={[
//           "repeat(2, 1fr)",
//           "repeat(2, 1fr)",
//           "repeat(2, 1fr)",
//           "repeat(3, 1fr)",
//           "repeat(3, 1fr)",
//         ]}
//         gap="4%"
//       >
//         {workshopsPhotos.map((photo, index) => {
//           return (
//             <GridItem key={index}>
//               <Img src={photo} alt="course image"></Img>
//             </GridItem>
//           );
//         })}
//       </Grid>
//     </Stack>
//   );
// };

const SponsorsSection = ({ ...extendedProps }) => {
  const sponsors = [
    // {
    //   name: "Platinum",
    //   items: [],
    //   dimensions: ["83%", "83%", "73%", "68%", "63%"],
    // },
    {
      name: "Black",
      items: [
        {
          name: "Chevron",
          logo: "/images/logos/chevron.png",
          link: "https://www.chevron.com/",
        },
        {
          name: "Le Wagon",
          logo: "/images/logos/lewagon.png",
          link: "https://www.lewagon.com/es",
        },
        {
          name: "BBVA",
          logo: "/images/logos/BBVA.png",
          link: "https://www.bbva.com.ar/",
        },
        {
          name: "IADT",
          logo: "/images/logos/iadt.png",
          link: "https://www.iadt.com/",
        },
        {
          name: "TangoID",
          logo: "/images/logos/tangoid.png",
          link: "https://www.tangoid.com.ar/",
        },
      ],
      dimensions: ["83%", "83%", "73%", "68%", "63%"],
      // NOTE: Original
      // dimensions: ["65%", "68", "63%", "60%", "55%"],
    },
    {
      name: "Standard",
      items: [
        {
          name: "Emilabs",
          logo: "/images/logos/Emi.png",
          link: "https://www.emilabs.ai/es",
        },
        {
          name: "Wúru",
          logo: "/images/logos/wuru.png",
          link: "https://wuru.ai/",
        },

        {
          name: "Extrimian",
          logo: "/images/logos/extrimian.png",
          link: "https://extrimian.io/academy/",
        },
        {
          name: "Proios S.A.",
          logo: "/images/logos/proios.png",
          link: "https://www.proios.com/",
        },
        {
          name: "Emprelatam",
          logo: "/images/logos/emprelatam.png",
          link: "https://emprelatam.com/",
        },
        {
          name: "Zennon",
          logo: "/images/logos/zennon.png",
          link: "https://zennonbi.com/",
        },
        {
          name: "Buenos Aires Ciudad",
          logo: "/images/logos/BuenosAiresCiudad2.png",
          link: "https://buenosaires.gob.ar/inicio/",
        },
      ],
      dimensions: ["65%", "68", "63%", "60%", "55%"],
      // NOTE: Original
      // dimensions: ["78%", "78%", "68%", "53%", "58%"],
    },
  ];
  return (
    <VStack w="full" mt={0} {...extendedProps}>
      {/*<Img
        src="/images/Sponsor_corner_1.svg"
        alt="decoration image"
        alignSelf="start"
        w={["20%", "18%", "15%", "12%", "10%"]}
      ></Img>*/}
      <VStack top="-1">
        <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
          Sponsors 2025
        </Heading>
        {/*<Text fontSize={TextSize}>Empresas que nos acompañan</Text>*/}
        <Text fontSize={TextSize}>Próximamente...</Text>
      </VStack>
      <VStack
        px="8%"
        pt="2%"
        divider={<StackDivider variant="thick"></StackDivider>}
        w="full"
      >
        {/* TODO - Descomentar esto cuando estén todos los sponsors
        sponsors.map((category) => {
          let columns;
          switch (category.name) {
            case "Standard":
              columns = "repeat(4, 1fr)";
              break;
            case "Black":
              columns = "repeat(3, 1fr)";
              break;
            default:
              columns = `repeat(${category.items.length},1fr)`;
          }

          return (
            <Box key={category.name} align="center" pt="1%" width="100%">
              <Heading textAlign="center" size={TextSize}>
                {category.name}
              </Heading>
              {/* Lo dejamos como para que sea una fila por categoría *\/}
              <Grid paddingX="6%" templateColumns={columns} w="full">
                {category.items.map((sponsor) => {
                  return (
                    <GridItem padding="1%" pt="2%" key={sponsor.name}>
                      <SponsorLogo
                        height={category.dimensions}
                        width={category.dimensions}
                        link={sponsor.link}
                        logo={sponsor.logo}
                        name={sponsor.name}
                      ></SponsorLogo>
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>
          );
        })*/}
      </VStack>
      {/*<Img
        src="/images/Sponsor_corner_2.svg"
        alt="decoration image"
        alignSelf="end"
        w={["20%", "18%", "15%", "12%", "10%"]}
      ></Img>*/}
    </VStack>
  );
};

//Tiene que estar definido aca, si no pierde focus cada vez que se agrega una tecla
//https://github.com/final-form/react-final-form/issues/730
const LocalInput = ({ ...extendedProps }) => (
  <Input
    borderWidth="1.5px"
    errorBorderColor="red.500"
    focusBorderColor="white"
    borderRadius="4px"
    backgroundColor="CSAltField"
    color="white"
    _placeholder={{ color: "white" }}
    {...extendedProps}
  ></Input>
);
const Form = ({ ...extendedProps }) => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emailError, setEmailError] = useState(false);
  //Estos errores estan para que de entrada no este como error, pero que si cuando empiece a completar y deje ese
  const [subjectError, setSubjectError] = useState(false);
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
      subject: subject,
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
        title: "¡La inscripción fue registrada!",
        status: "success",
        isClosable: true,
        duration: 5000,
        render: () => {
          return (
            <Box backgroundColor="green" borderRadius="4px" p="4%" w="full">
              <VStack>
                <HStack w="full">
                  <CheckCircleIcon />
                  <Heading fontSize={HeadingSize}>¡Consulta enviada!</Heading>
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
      setSubject("");
      setBody("");
      setEmailError(false);
      setSubjectError(false);
      setBodyError(false);
    } catch (err) {
      toastIdRef.current = toast({
        title: "¡La inscripción fue registrada!",
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
    <VStack w={["100%", "100%", "100%", "50%", "40%"]} {...extendedProps}>
      <LocalInput
        onClick={() => setEmailError(!validateEmail(email))}
        onChange={(event) => {
          setEmail(event.target.value);
          setEmailError(!validateEmail(event.target.value));
        }}
        placeholder="Email"
        value={email}
        isInvalid={emailError}
      ></LocalInput>
      <LocalInput
        onClick={() => setSubjectError(subject.length === 0)}
        onChange={(event) => {
          setSubject(event.target.value);
          setSubjectError(event.target.value === "");
        }}
        placeholder="Asunto"
        value={subject}
        isInvalid={subjectError}
      ></LocalInput>
      <Textarea
        onClick={() => setBodyError(body.length === 0)}
        isInvalid={bodyError}
        value={body}
        onChange={(event) => {
          setBody(event.target.value);
          setBodyError(event.target.value === "");
        }}
        height={["4em", "6em", "8em", "10em", "10em"]}
        focusBorderColor="white"
        borderRadius="4px"
        backgroundColor="CSAltField"
        borderWidth="1.5px"
        errorBorderColor="red.500"
        color="white"
        _placeholder={{ color: "white" }}
        placeholder="Mensaje"
      ></Textarea>
      <PrimaryButton
        mt={10}
        width="full"
        _disabled={{
          borderRadius: "4px",
          opacity: 0.4,
          fontWeight: 500,
          borderWidth: "1px",
          transition: "all 0.3s ease",
          padding: "4% 8%",
          "&:hover": {
            backgroundColor: "black",
            color: "#FFFFFF",
            borderRadius: "4px",
            borderWidth: "1px",
            borderColor: "var(--chakra-colors-chakra-border-color)",
            "svg path": {},
          },
        }}
        isDisabled={
          emailError ||
          subjectError ||
          bodyError ||
          email === "" ||
          subject === "" ||
          body === ""
        }
        isLoading={isLoading}
        onClick={sendEmail}
      >
        Enviar
      </PrimaryButton>
    </VStack>
  );
};
const DoubtSection = ({ ...extendedProps }) => {
  const CSImg = "/images/IEEE_CS.png";
  return (
    <Stack
      spacing="4%"
      direction={["column", "column", "row", "row", "row"]}
      width="full"
      justify="center"
      px="4%"
      {...extendedProps}
    >
      <VStack spacing="4%">
        <Heading size={["md", "lg", "xl", "2xl", "3xl"]}>¿Tenés dudas?</Heading>
        <Heading size={["md", "lg", "xl", "2xl", "3xl"]} color="CSOrange">
          ¡Contáctanos!
        </Heading>
        <Img
          paddingY="2%"
          src={CSImg}
          alt="ITBA IEEE Computer Society image"
          width={["200px", "250px", "300px", "450px", "500px"]} // Adjust sizes as needed
        />
      </VStack>
      <Form />
    </Stack>
  );
};

const Editions = () => {
  return (
    <VStack width="full">
      <Heading color="CSLightOrange" size={HeadingSize} textAlign="center">
        Ediciones Anteriores
      </Heading>
      <HStack justify="center" spacing="5%">
        <PrimaryButton
          height="2%"
          backgroundColor="CSLightBlue"
          color="#14192D"
          fontSize={["xs", "sm", "xl", "2xl", "3xl"]}
          size={["xs", "xs", "lg", "lg", "lg"]}
          onClick={() => {
            location.href = "/2024";
          }}
        >
          2024
        </PrimaryButton>
        <PrimaryButton
          height="2%"
          backgroundColor="CSLightBlue"
          color="#14192D"
          fontSize={["xs", "sm", "xl", "2xl", "3xl"]}
          size={["xs", "xs", "lg", "lg", "lg"]}
          onClick={() => {
            location.href = "/2023";
          }}
        >
          2023
        </PrimaryButton>
        <PrimaryButton
          height="2%"
          backgroundColor="CSLightBlue"
          color="#14192D"
          fontSize={["xs", "sm", "xl", "2xl", "3xl"]}
          size={["xs", "xs", "lg", "lg", "lg"]}
          onClick={() => {
            location.href = "/2022";
          }}
        >
          2022
        </PrimaryButton>
        <Spacer />
      </HStack>
    </VStack>
  );
};

const ThankYouMessage = () => {
  return (
    <Flex
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      height="20%"
      pt="4%"
      zIndex={90}
    >
      <Img
        src="/images/chars-left.png"
        alt="Decoration"
        width="20%"
      ></Img>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        flexDirection="column"
      >
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} color="#ffffff">
          Muchas gracias por participar
        </Text>
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} color="#ffffff">
          ¡Nos vemos el año que viene!
        </Text>
      </Box>
      <Img
        src="/images/chars-right.png"
        alt="Decoration"
        width="20%"
      ></Img>
    </Flex>
  );
};

const RegisteredSection = () => {
  return (
    <Flex
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      pt="8%"
      zIndex={90}
    >
      <Img
        src="/images/chars-left.png"
        alt="Decoration"
        width={["12%"]}
      ></Img>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        flexDirection="column"
      >
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} textAlign="center" color="#ffffff">
          ¡Muchas gracias por inscribirte!
        </Text>
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} textAlign="center" color="#ffffff">
          Nos estaremos comunicando con vos una vez que cierren las inscripciones.
        </Text>
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} textAlign="center" color="#ffffff">
          ¡No te olvides de revisar tu mail!
        </Text>
      </Box>
      <Img
        src="/images/chars-right.png"
        alt="Decoration"
        width={["12%"]}
      ></Img>
    </Flex>
  );
};

const Home = () => {
  const inscriptionsEnabled = useStore((state) => state.inscriptionsEnabled);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const submissions = useStore((state) => state.submissions);
  const [inscriptionsSection, setInscriptionsSection] = useState(<></>);

  useEffect(() => {
    if (inscriptionsEnabled) {
      if(isLoggedIn) {
        setInscriptionsSection(<RegisteredSection />);
        return;
      }
      setInscriptionsSection(<InscriptionSection pt="4%" zIndex={90} />);
      return;
    }

    const now = new Date();
    const submissionsEnd = new Date(submissions?.end);

    if (submissionsEnd < now) {
      setInscriptionsSection(<ThankYouMessage />);
    }
  }, [inscriptionsEnabled, submissions, isLoggedIn]);

  return (
    <VStack>
      {/* Le paso a todos el padding y no lo pongo en gap porque entre workshops y sponsors no tiene que haber espacio */}
      <NewLogo date="28, 29 y 30 de marzo" />
      <GeneralInfo pt="4%" zIndex={90} />
      <Categories pt="4%" zIndex={90} />
      {/* Seccion inscribirse */}
      { inscriptionsSection }
      <JurySection pt="4%" zIndex={90} />
      <MentorsSection pt="4%" zIndex={90} />
      {/* <WorkshopsSection pt='4%' zIndex={90}/> */}
      {/* TODO: sacar pt='4%' cuando vuelvan los workshops */}
      <SponsorsSection zIndex={90} pt="4%" />
      <Editions />
      <DoubtSection pt="4%" zIndex={90} />
      {/* TODO: revisar por que con las particulas no funcionan las animaciones de los logos de sponsors */}
      {/* Lo solucione con zindex, si no creo que toma como que estan atras del canvas que tiene a las particulas */}
    </VStack>
  );
};

export default Home;
