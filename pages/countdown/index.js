import { Box, Text } from "@chakra-ui/react";
// eslint-disable-next-line import/no-named-as-default
import Particles, { initParticlesEngine } from "@tsparticles/react";
import particlesConfig from "../../config/configParticles";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { loadFull } from "tsparticles";
import useStore from "../../config/storeConfig";

const Page = () => {
  const [init, setInit] = useState(false);
  const [title, setTitle] = useState();
  const submissions = useStore((state) => state.submissions);

  const handleStart = () => {
    setTitle(
      <>
        <Text fontSize="7xl" color="#55faa2">
          ¡Hora de programar!
        </Text>
        <Text fontSize="6xl" color="#55faa2">
          Tiempo para el fin de la competencia:
        </Text>
      </>
    );
  };

  const handleEnd = () => {
    setTitle(
      <Text fontSize="8xl" color="#55faa2">
        La competencia ha finalizado
      </Text>
    );
  };

  useEffect(() => {
    const now = Date.now();

    if (now < submissions?.start) {
      setTitle(
        <Text fontSize="8xl" color="#55faa2">
          La competencia comienza en:
        </Text>
      );
    } else if (now < submissions?.end) {
      handleStart();
    } else {
      handleEnd();
    }
  }, [submissions]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <Box
      w="100vw"
      h="75vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      flexDirection="column"
    >
      {title}
      {submissions && (
        <Text style={{ whiteSpace: "pre-wrap" }} fontSize="9xl" color="white">
          <Countdown
            date={submissions.start}
            daysInHours={true}
            onComplete={handleStart}
          >
            <Countdown
              date={submissions.end}
              daysInHours={true}
              onComplete={handleEnd}
            />
          </Countdown>
        </Text>
      )}
      {init && (
        <Box
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          pt={16}
          zIndex={-1}
        >
          <Particles id="tsparticles" options={particlesConfig} />
        </Box>
      )}
    </Box>
  );
};

export default Page;
