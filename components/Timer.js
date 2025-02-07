import useStore from "../config/storeConfig";
import React, { useEffect, useState } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

function Timer () {
  const inscriptionsEnabled = useStore((state) => state.inscriptionsEnabled);
  const inscriptions = useStore((state) => state.inscriptions);

  const calculateTimeLeft = () => {
    if(!inscriptionsEnabled) return null;

    let difference = new Date(inscriptions?.end) - new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    else {
      timeLeft = null;
    }
    return timeLeft;
  }

  const [ timeLeft, setTimeLeft ] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <Box
      display="inline-block"
      paddingX="5%"
      paddingY="8%"
      borderRadius="md"
    >
      <VStack alignContent="center">
        <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} textAlign="center" color="#ffffff">
          { timeLeft ? "Las inscripciones finalizan en:" : "Las inscripciones terminaron. ¡Nos vemos el año que viene!"}
        </Text>
        { timeLeft && (
          <HStack alignContent="center">
            {[
              { label: timeLeft && timeLeft.days === 1 ? "Día" : "Días", value: timeLeft?.days},
              { label: timeLeft && timeLeft.hours === 1 ? "Hora" : "Horas", value: timeLeft?.hours },
              { label: timeLeft && timeLeft.minutes === 1 ? "Minuto" : "Minutos", value: timeLeft?.minutes },
              { label: timeLeft && timeLeft.seconds === 1 ? "Segundo" : "Segundos", value: timeLeft?.seconds },
            ].map(({ label, value }) => (
              <Box key={label} px="4">
                <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} textAlign="center" color="CSLightOrange">
                  {value}
                </Text>
                <Text fontSize={["md", "lg", "xl", "2xl", "3xl"]} textAlign="center" color="CSLightBlue">
                  {label}
                </Text>
              </Box>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
}

export default Timer;