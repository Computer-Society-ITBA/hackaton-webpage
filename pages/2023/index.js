import {
  Heading,
  Flex,
  Text,
  Grid,
  Img,
  VStack,
  HStack,
  GridItem,
  StackDivider,
  Box,
} from "@chakra-ui/react";
import SponsorLogo from "../../components/SponsorLogo";
import ParticlesLogo from "../../components/ParticlesLogo";
import CategoryLogo from "../../components/CategoryLogo";
import Jury from "../../components/Jury";
import AutomationLogo from "../../components/AutomationLogo";
import EconomyLogo from "../../components/EconomyLogo";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];

const Categories = ({ ...extendedProps }) => {
  const categories = [
    {
      name: "Economía y Descentralización",
      description:
        "Crear formas innovadoras para inclusión financiera, validación de identidad y nuevas herramientas de la Web 3.0.",
      scope: ["billetera Web 3.0", "Juegos en Web 3.0"],
      logo: EconomyLogo,
    },
    {
      name: "Automatización Inteligente",
      description:
        "Solucionar problemas de automatización creando herramientas para aumentar la productividad general.",
      scope: ["billetera Web 3.0", "Juegos en Web 3.0"],
      logo: AutomationLogo,
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
      name: "Gabriela Macagni",
      imgSrc: "/images/juries/GabrielaMacagni.jpg",
      details:
        "Co-fundadora Matterscale Ventures y ex directora ejecutiva de Endeavor Argentina",
    },
    {
      name: "Guillermo Rodriguez",
      imgSrc: "/images/juries/Guillermo-Rodriguez.jpg",
      details:
        "Director de Carrera Ingeniería Informática ITBA, Investigador adjunto del CONICET especializado en machine learning",
    },
    {
      name: "Gabriel Gruber",
      imgSrc: "/images/juries/GabrielGruber.png",
      details:
        "Co-Founder y CEO en Exactly Finance, previamente Co-founder y CEO de Properati",
    },
    {
      name: "Pablo Sabbatella",
      imgSrc: "/images/juries/PabloSabbatella.jpeg",
      details:
        "Founder y director de Defy Education, reconocido inversor e investigador en el ecosistema crypto",
    },
    {
      name: "Mariano Di Pietrantonio",
      imgSrc: "/images/juries/MarianoDiPietrantonio.jpeg",
      details:
        "Co-Founder y Head Of Strategy de Maker Growth, con más de 15 años como Product Manager en diversas empresas",
    },
    {
      name: "Manuel Beaudroit",
      imgSrc: "/images/juries/ManuelBeaudroit.jpg",
      details: "Co-Founder y CEO de Belo, también Co-Founder de Bitex",
    },
    {
      name: "Diego Fernandez",
      imgSrc: "/images/juries/DiegoFernandez.jpg",
      details:
        "Secretario de innovación y transformación digital del Gobierno de la Ciudad de Buenos Aires",
    },
    {
      name: "Matias Eisbruch",
      imgSrc: "/images/juries/MatiasEisbruch.jpeg",
      details:
        "Head of digital products en Accenture, previamente formó parte de Wolox. Además, es profesor de la Universidad de Buenos Aires.",
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
      name: "Tomas Giovanetti",
      imgSrc: "/images/mentors/TomasGiovanetti.jpeg",
      details: "Founder y CEO en TGA",
    },
    {
      name: "Nicolas D'Onofrio",
      imgSrc: "/images/mentors/NicolasDonofrio.jpeg",
      details: "Cofounder y CEO en TiendaCrypto",
    },
    {
      name: "Martin Furst",
      imgSrc: "/images/mentors/MartinFurst.jpg",
      details: "Cofounder y CEO en Fantastic",
    },
    {
      name: "Marisabel Rodriguez",
      imgSrc: "/images/mentors/MarisabelRodriguez.jpg",
      details: "Cloud Delivery Center Manager en Google",
    },
    {
      name: "Mariano Vazquez",
      imgSrc: "/images/mentors/MarianoVazquez.jpeg",
      details: "CTO en Modo, con mas de 15 años como desarrollador.",
    },
    {
      name: "Juan Catalano",
      imgSrc: "/images/mentors/JuanCatalano.jpeg",
      details: "Founder y CPO en Podcast App",
    },
    {
      name: "Gonzalo Otálora",
      imgSrc: "/images/mentors/GonzaloOtalora.jpg",
      details: "Founder y Director en Go!",
    },
    {
      name: "Juan Gallo",
      imgSrc: "/images/mentors/JuanGallo.jpeg",
      details: "Cofounder y CEO en Cafecito y CourseIt",
    },
    {
      name: "Federico Viarnés",
      imgSrc: "/images/mentors/FedericoViarnes.jpeg",
      details:
        "Ex VP de Producto en BuenBit, actualmente desarrollando proyectos en blockchain.",
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
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};

const SponsorsSection = ({ ...extendedProps }) => {
  const sponsors = [
    {
      name: "Platinum",
      items: [
        {
          name: "Nestle",
          logo: "/images/logos/Nestle.png",
          link: "https://www.nestle.com.ar",
        },
        {
          name: "Accenture",
          logo: "/images/logos/Accenture.png",
          link: "https://www.accenture.com/ar-es",
        },
      ],
      dimensions: ["83%", "83%", "73%", "68%", "63%"],
    },
    {
      name: "Black",
      items: [
        {
          name: "MetLife",
          logo: "/images/logos/MetLife.png",
          link: "https://www.metlife.com.ar",
        },
      ],
      dimensions: ["65%", "68", "63%", "60%", "55%"],
    },
    {
      name: "Standard",
      items: [
        {
          name: "Emilabs",
          logo: "/images/logos/Emi.png",
          link: "https://www.emilabs.ai",
        },
        {
          name: "BBVA",
          logo: "/images/logos/BBVA.png",
          link: "https://www.bbva.com.ar/",
        },
        {
          name: "MODO",
          logo: "/images/logos/modo.png",
          link: "https://www.modo.com.ar/",
        },
        {
          name: "PAE",
          logo: "/images/logos/PAE.png",
          link: "https://www.pan-energy.com",
        },
      ],
      dimensions: ["78%", "78%", "68%", "53%", "58%"],
    },
    {
      name: "Colaboradores",
      items: [
        {
          name: "Buenos Aires Ciudad",
          logo: "/images/logos/BuenosAiresCiudad.png",
          link: "https://buenosaires.gob.ar/inicio/",
        },
        {
          name: "Defy Education",
          logo: "/images/logos/Defy.png",
          link: "https://www.defyeducation.com",
        },
      ],
      dimensions: ["76%", "70%", "66%", "61%", "54%"],
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
          Sponsors 2023
        </Heading>
        <Text fontSize={TextSize}>Empresas que nos acompañan</Text>
      </VStack>
      <VStack
        px="8%"
        pt="2%"
        divider={<StackDivider variant="thick"></StackDivider>}
        w="full"
      >
        {sponsors.map((cateogry) => {
          return (
            <Box key={cateogry.name} align="center" pt="1%" width="100%">
              <Heading textAlign="center" size={TextSize}>
                {cateogry.name}
              </Heading>
              <Grid
                paddingX="6%"
                templateColumns={`repeat(${cateogry.items.length},1fr)`}
                w="full"
              >
                {cateogry.items.map((sponsor) => {
                  return (
                    <GridItem padding="1%" pt="2%" key={sponsor.name}>
                      <SponsorLogo
                        height={cateogry.dimensions}
                        width={cateogry.dimensions}
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
      <ParticlesLogo />
      <Categories pt="4%" zIndex={90} />
      <JurySection pt="4%" zIndex={90} />
      <MentorsSection pt="4%" zIndex={90} />
      <SponsorsSection zIndex={90} pt="4%" />
    </VStack>
  );
};

export default Home;
