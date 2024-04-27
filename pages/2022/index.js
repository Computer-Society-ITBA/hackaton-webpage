import {
  Heading,
  Flex,
  Text,
  Grid,
  Img,
  VStack,
  Stack,
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
    <Stack
      direction={["column", "row"]}
      paddingX="10%"
      paddingY="10%"
      w="full"
      justify="center"
      spacing="2rem"
      {...extendedProps}
    >
      {categories.map((category) => {
        return (
          <CategoryLogo key={category.name} category={category}></CategoryLogo>
        );
      })}
    </Stack>
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
      details: "Newtopia VC| Investor",
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

const SponsorsSection = ({ ...extendedProps }) => {
  const sponsors = [
    {
      name: "Platinum",
      items: [
        {
          name: "Auth0",
          logo: "/images/logos/auth0.png",
          link: "https://auth0.com/",
        },
        {
          name: "Extrimian",
          logo: "/images/logos/extrimian.png",
          link: "https://extrimian.io/es/",
        },
        {
          name: "2PI",
          logo: "/images/logos/2pi.png",
          link: "https://2pi.network/",
        },
      ],
      dimensions: ["83%", "83%", "73%", "68%", "63%"],
    },
    {
      name: "Black",
      items: [
        {
          name: "Ethereum Foundation",
          logo: "/images/logos/ethereum-foundation.png",
          link: "https://ethereum.foundation/",
        },
        {
          name: "POAP",
          logo: "/images/logos/POAP.png",
          link: "https://poap.xyz/",
        },
        {
          name: "Exactly",
          logo: "/images/logos/exactly.svg",
          link: "https://exact.ly/",
        },
        {
          name: "Flowics",
          logo: "/images/logos/flowics.svg",
          link: "https://www.flowics.com/",
        },
        {
          name: "OpenZeppelin",
          logo: "/images/logos/openzeppelin.png",
          link: "https://www.openzeppelin.com/",
        },
      ],
      dimensions: ["65%", "68", "63%", "60%", "55%"],
    },
    {
      name: "Standard",
      items: [
        {
          name: "Vercel",
          logo: "/images/logos/vercel.png",
          link: "https://vercel.com/",
        },
        {
          name: "Daffy",
          logo: "/images/logos/daffy.svg",
          link: "https://www.daffy.org/",
        },
      ],
      dimensions: ["78%", "78%", "68%", "53%", "58%"],
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
      <ParticlesLogo date="1, 2 y 3 de abril" />
      <Categories pt="4%" pb="4%" zIndex={90} />
      <JurySection pt="4%" zIndex={90} />
      <SponsorsSection zIndex={90} pt="4%" />
    </VStack>
  );
};

export default Home;
