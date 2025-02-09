import React from "react";

import {
  Heading,
  Flex,
  Text,
  Grid,
  Img,
  VStack,
  Divider,
  HStack,
  GridItem,
  StackDivider,
  Box,
} from "@chakra-ui/react";
import SponsorLogo from "../../components/SponsorLogo";
import ParticlesLogo from "../../components/ParticlesLogo";
import CategoryLogo from "../../components/CategoryLogo";
import Jury from "../../components/Jury";

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
        color="CSOrange"
        textAlign={"center"}
        paddingY="6px"
      >
        ¿Qué es HackITBA?
      </Heading>
      <Divider variant="thick"></Divider>
      <Text textAlign="center" fontSize={TextSize}>
        <Text as="span" color="CSGreen">
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
      name: "Economía y Finanzas",
      description:
        "La categoría de Economía y Finanzas busca soluciones vanguardistas para impulsar el crecimiento económico y el manejo financiero en todas sus escalas. Abarca temas como: Finanzas personales, Inclusión financiera, Validación de identidad y avance de proyectos, Acceso a la información, y Supply chain",
      scope: ["billetera Web 3.0", "Juegos en Web 3.0"],
      logo: "/images/categories/econ.png",
      logoSvg: false,
    },
    {
      name: "Salud y bienestar",
      description:
        "La categoría de Salud y Bienestar busca soluciones innovadoras para mejorar la calidad de vida de las personas. Considera temas como: Prevención y diagnóstico de enfermedades, Nutrición, Acceso a atención e información, Seguimiento de comportamiento, y Salud Mental",
      scope: ["billetera Web 3.0", "Juegos en Web 3.0"],
      logo: "/images/categories/salud.png",
      logoSvg: false,
    },
  ];
  return (
    <HStack
      paddingX="10%"
      w="full"
      justify="center"
      spacing="20%"
      {...extendedProps}
    >
      {/* Es feo pasar el array, pero es lo que se me ocurrio para que se muestre bien con distintas formas  */}
      {categories.map((category) => {
        return (
          <CategoryLogo key={category.name} category={category}></CategoryLogo>
        );
      })}
    </HStack>
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
      <Heading color="CSOrange" size={HeadingSize} textAlign="center">
        Jurados
      </Heading>
      <Text fontSize={TextSize}>Conocé a nuestros jurados</Text>
      <Flex
        width="full"
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="start"
        verticalAlign="top"
      >
        {juries.map((jury, index) => {
          return <Jury key={index} jury={jury} my="2%" mx="4%"></Jury>;
        })}
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
      <Heading color="CSOrange" size={HeadingSize} textAlign="center">
        Mentores
      </Heading>
      <Text fontSize={TextSize}>Conocé a nuestros mentores</Text>
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
        {mentors.map((mentor, index) => {
          return (
            <GridItem key={index}>
              <Jury jury={mentor}></Jury>{" "}
              {/* Queda mal el keyword pero creo que el componente sería el mismo */}
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};

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
      <Img
        src="/images/Sponsor_corner_1.svg"
        alt="decoration image"
        alignSelf="start"
        w={["20%", "18%", "15%", "12%", "10%"]}
      ></Img>
      <VStack top="-1">
        <Heading color="CSOrange" size={HeadingSize} textAlign="center">
          Sponsors 2024
        </Heading>
        <Text fontSize={TextSize}>Empresas que nos acompañan</Text>
      </VStack>
      <VStack
        px="8%"
        pt="2%"
        divider={<StackDivider variant="thick"></StackDivider>}
        w="full"
      >
        {sponsors.map((category) => {
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
              {/* Lo dejamos como para que sea una fila por categoría */}
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
        })}
      </VStack>
      <Img
        src="/images/Sponsor_corner_2.svg"
        alt="decoration image"
        alignSelf="end"
        w={["20%", "18%", "15%", "12%", "10%"]}
      ></Img>
    </VStack>
  );
};

const Home = () => {
  return (
    <VStack>
      <ParticlesLogo date="5, 6 y 7 de abril" />
      <GeneralInfo pt="4%" zIndex={90} />
      <Categories pt="4%" zIndex={90} />
      <JurySection pt="4%" zIndex={90} />
      <MentorsSection pt="4%" zIndex={90} />
      <SponsorsSection zIndex={90} pt="4%" />
    </VStack>
  );
};

export default Home;
