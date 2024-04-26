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
import CyberSecurityLogo from "../../components/CyberSecurityLogo";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];

const Categories = ({ ...extendedProps }) => {
  const categories = [
    {
      name: "Ciberseguridad y privacidad",
      description:
        "Crear formas innovadoras para evitar hackeos, ataques de phishing, suplantación de identidad y más problemáticas del ciberespacio",
      scope: ["billetera Web 3.0", "Juegos en Web 3.0"],
      logo: CyberSecurityLogo,
      logoSvg: true,
    },
    {
      name: "Inclusión Financiera",
      description:
        "Aplicar nuevas tecnologías a actividades financieras o bursátiles y poder ofrecerle los servicios financieros a la mayor cantidad de personas",
      scope: ["billetera Web 3.0", "Juegos en Web 3.0"],
      logo: EconomyLogo,
      logoSvg: true,
    },
    {
      name: "Productividad y automatización",
      description:
        "Solucionar problemas de automatización creando herramientas para aumentar la productividad general.",
      scope: ["billetera Web 3.0", "Juegos en Web 3.0"],
      logo: AutomationLogo,
      logoSvg: true,
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
      name: "Matías Woloski",
      imgSrc: "/images/juries/MatiasWoloski.png",
      details: "Auth0 | Co-founder & CTO",
    },
    {
      name: "Santiago Siri",
      imgSrc: "/images/juries/SantiagoSiri.jpeg",
      details: "Proof of Humanity & UBI | Founder",
    },
    {
      name: "Esteban Ordano",
      imgSrc: "/images/juries/EstebanOrdano.jpeg",
      details: "Decentraland | Founder & Advisor",
    },
    {
      name: "Mariano Mayer",
      imgSrc: "/images/juries/MarianoMayer.jpeg",
      details: "Newtopia VC| Investor"
    },
    {
      name: "Lucas Lain",
      imgSrc: "/images/juries/LucasLain.jpeg",
      details: "Exactly Finance | Co-founder & CTO",
    },
    {
      name: "Agustina Fainguersch",
      imgSrc: "/images/juries/AgusFainguersch.jpeg",
      details: "Meta | Directora Regional",
    },
    {
      name: "Santiago Valles",
      imgSrc: "/images/juries/SantiagoValles.jpeg",
      details: "ITBA | Director ",
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
          name: "Auth0",
          logo: "/images/logos/Nestle.png",
          link: "https://www.nestle.com.ar",
        },
        {
          name: "Extrimian",
          logo: "/images/logos/Accenture.png",
          link: "https://www.accenture.com/ar-es",
        },
        {
          name: "2PI",
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
          name: "Ethereum Foundation",
          logo: "/images/logos/MetLife.png",
          link: "https://www.metlife.com.ar",
        },
        {
          name: "POAP",
          logo: "/images/logos/MetLife.png",
          link: "https://www.metlife.com.ar",
        },
        {
          name: "Exactly",
          logo: "/images/logos/MetLife.png",
          link: "https://www.metlife.com.ar",
        },
        {
          name: "Flowics",
          logo: "/images/logos/MetLife.png",
          link: "https://www.metlife.com.ar",
        },
        {
          name: "OpenZeppelin",
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
          name: "Vercel",
          logo: "/images/logos/Emi.png",
          link: "https://www.emilabs.ai",
        },
        {
          name: "Daffy",
          logo: "/images/logos/BBVA.png",
          link: "https://www.bbva.com.ar/",
        }
      ],
      dimensions: ["78%", "78%", "68%", "53%", "58%"],
    }
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
      <ParticlesLogo date="31 de marzo, 1 y 2 de abril" />
      <Categories pt="4%" zIndex={90} />
      <JurySection pt="4%" zIndex={90} />
      <SponsorsSection zIndex={90} pt="4%" />
    </VStack>
  );
};

export default Home;
