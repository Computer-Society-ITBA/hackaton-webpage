import { Heading, Flex, Box, Img, VStack } from "@chakra-ui/react";
// eslint-disable-next-line import/no-named-as-default
import Particles, { initParticlesEngine } from "@tsparticles/react";
import particlesConfig from "../config/configNewParticles";
import { loadFull } from "tsparticles";
import { useCallback, useState, useEffect } from "react";

const NewLogo = ({ date }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(() => {}, []);

  const csImage = `/images/hackitba-new-imagotype.png`;
  return (
    <Flex>
      <Box position="absolute" left={0} right={0} top={0} bottom={0} pt={16}>
        {init && (
          <Particles
            id="tsparticles"
            loaded={particlesLoaded}
            options={particlesConfig}
          />
        )}
      </Box>
      {/* No poner 99 porque si no pasa al Navbar */}
      <VStack
        height="80vh"
        width="100vw"
        direction="column"
        zIndex={90}
        spacing="1%"
        justify={"center"}
      >
        <Box height="70%">
          <Img
            src={csImage}
            m="auto"
            objectFit="contain"
            height="100%"
            alt="logo"
            paddingTop="3%" />
        </Box>
        <Box alignSelf="end" pr="10%">
          <Heading
            display="inline"
            size={["sm", "md", "lg", "xl", "2xl"]}
            color="white"
          >
            by{" "}
          </Heading>
          <Heading
            display="inline"
            size={["sm", "md", "lg", "xl", "2xl"]}
            color="CSOrange"
          >
           IEEE Computer Society
          </Heading>
        </Box>
        <Box alignSelf="end" pr="8%">
          <Heading
            display="inline"
            size={["sm", "md", "lg", "xl", "2xl"]}
            color="CSOrange"
          >
          ITBA Student Chapter
          </Heading>
        </Box>
        <Box alignSelf="end" pr="7%">
          <Heading
            display="inline"
            size={["xs", "sm", "md", "lg", "xl"]}
            color="white"
          >
            {date + " "}
          </Heading>
        </Box>
      </VStack>
    </Flex>
  );
};
export default NewLogo;
