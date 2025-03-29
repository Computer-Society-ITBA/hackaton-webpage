import { AddIcon, MinusIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Text,
  Flex,
  Spacer,
  IconButton,
  useDisclosure,
  Collapse,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Center,
  CircularProgress,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  OrderedList,
  ListItem,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosApiInstance } from "../../config/axiosConfig";
import ReactStars from "react-rating-stars-component";
import { SocialIcon } from "react-social-icons";
import useStore from "../../config/storeConfig";

const HeadingSize = ["sm", "md", "lg", "xl", "2xl"];
const TextSize = ["xs", "sm", "md", "lg", "xl"];
const ModalSize = ["sm", "md", "lg", "xl", "2xl"];

const RateCategoryCard = ({ name, count, onCategoryRatingChanged }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Text fontSize={TextSize}>{name}</Text>
          <Spacer></Spacer>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <VStack align="start" width="full">
          <ReactStars
            count={count}
            onChange={onCategoryRatingChanged}
            size={24}
            activeColor="#ffd700"
          />
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

const PROBLEMATICA = 0;
const RELACION = 1;
const INNOVACION = 2;
const IMPACTO = 3;
const FACILIDAD = 4;
const INTERFAZ = 5;
const MVP = 6;
const VIDEO = 7;

const criteria = [
  { name: "Problemática", count: 5 },
  { name: "Relación con la Temática", count: 3 },
  { name: "Innovación y oportunidad", count: 5 },
  { name: "Impacto y Alcance", count: 5 },
  { name: "Facilidad de Ejecución", count: 3 },
  { name: "Interfaz de usuario", count: 8 },
  { name: "Calidad del MVP", count: 10 },
  { name: "Presentación (video)", count: 3 },
];

const RateTeamCard = ({ team, ...extendedProps }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [errorrMessage, setErrorMessage] = useState("");

  const [feedback, setFeedback] = useState("");
  const [ratings, setRatings] = useState([]);
  const toast = useToast();

  const userInfo = useStore((state) => state.userInfo);

  const [voted, setVoted] = useState(false);

  //Check if already voted to disable the card.
  useEffect(() => {
    const getVote = async () => {
      if(userInfo !== undefined){
        const votings = await axiosApiInstance.get(
          `/votes?mentor=${userInfo.uid}&submission=${team.submission}`
        );
        if (votings.data.length > 0) {
          setVoted(true);
        }
      }
    };

    getVote();
  }, [team.submission, userInfo]);

  const handleRatingChange = (index, newRating) => {
    setRatings((prevRatings) => {
      const newRatings = [...prevRatings];
      newRatings[index] = newRating;
      return newRatings;
    });
  };

  const handleSubmit = () => {
    axiosApiInstance
      .post(`/mentors/${userInfo.uid}/votes`, {
        submissionId: team.submission,
        problematica: ratings[PROBLEMATICA],
        relacion: ratings[RELACION],
        innovacion: ratings[INNOVACION],
        impacto: ratings[IMPACTO],
        facilidad: ratings[FACILIDAD],
        interfaz: ratings[INTERFAZ],
        mvp: ratings[MVP],
        video: ratings[VIDEO],
        descripcion: feedback,
      })
      .then(() => {
        setVoted(true);
        setErrorMessage("");
        toast({
          title: "Voto guardado correctemente",
          status: "success",
          duration: 3000,
        });
      })
      .catch((_) => {
        toast({
          title: "Error. Recuerda que solo podes votar una vez al equipo",
          status: "error",
          duration: 3000,
        });
        setFeedback("");
        setErrorMessage("Por favor complete todos los criterios");
      });
  };

  return (
    <VStack
      p="2%"
      align="center"
      borderRadius="8px"
      borderWidth="2px 2px 6px 2px"
      borderColor="CSBlue"
      {...extendedProps}
    >
      <Flex
        onClick={onToggle}
        direction="row"
        verticalAlign="middle"
        width="full"
      >
        <Heading
          fontSize={HeadingSize}
        >{`Equipo ${team.number}: ${team.name}`}</Heading>
        <Spacer></Spacer>
        <HStack>
          <IconButton
            _hover={{ backgroundColor: "grey" }}
            mx="4%"
            onClick={onToggle}
            backgroundColor="transparent"
            icon={isOpen ? <MinusIcon /> : <AddIcon />}
          ></IconButton>
        </HStack>
      </Flex>
      <Box as={Collapse} in={isOpen} animateOpacity w="100%">
        <VStack width="full" align="start">
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Email del equipo:
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.email}
          </Text>
          <Text fontSize={TextSize} textAlign="start" color="CSOrange">
            Descripción:
          </Text>
          <Text size={TextSize} textAlign="start">
            {team.teamDescription}
          </Text>
          <Spacer></Spacer>
          <HStack width="full" justify="space-around">
            <a
              rel={"external"}
              href={
                team.githubLink
                  ? team.githubLink.includes("//")
                    ? team.githubLink
                    : `//${team.githubLink}`
                  : ""
              }
              target={"_blank"}
            >
              <SocialIcon network="github" as="div" />
            </a>
            <a
              rel={"external"}
              href={
                team.youtubeLink
                  ? team.youtubeLink.includes("//")
                    ? team.youtubeLink
                    : `//${team.youtubeLink}`
                  : ""
              }
              target={"_blank"}
            >
              <SocialIcon network="youtube" as="div" />
            </a>
          </HStack>
          <Spacer></Spacer>
        </VStack>
        <Center>
          <Text fontSize={TextSize} color="red.500">
            {errorrMessage}
          </Text>
        </Center>

        {!voted ? (
          <>
            <Text fontSize={TextSize} textAlign="start" color="CSOrange">
              Calificar equipo:
            </Text>
            <Accordion width="full" defaultIndex={[]} allowMultiple>
              {criteria.map((category, index) => (
                <RateCategoryCard
                  key={index}
                  name={category.name}
                  count={category.count}
                  onCategoryRatingChanged={(newRating) =>
                    handleRatingChange(index, newRating)
                  }
                />
              ))}
            </Accordion>
            <VStack width="full" align="end">
              <Spacer></Spacer>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Feedback"
              ></Textarea>
              <Button onClick={handleSubmit} mt={2}>
                Enviar
              </Button>
            </VStack>
          </>
        ) : (
          <></>
        )}
      </Box>
    </VStack>
  );
};

const TeamRating = () => {
  const userInfo = useStore((state) => state.userInfo);
  const [teams, setTeams] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const getTeams = async () => {
      setIsLoading(true);

      try {
        const response = await axiosApiInstance.get(
          `/mentors/${userInfo.uid}/submissions`
        );
        const submissions = response.data.submissions;
        const updatedTeams = [];

        for (const sub of submissions) {
          const submissionReq = await axiosApiInstance.get(
            `/submissions/${sub}`
          );
          const submissionObj = submissionReq.data;

          const team = await axiosApiInstance.get(
            `/users/${submissionObj.userId}`
          );
          const teamData = team.data;
          const teamObj = {
            name: teamData.name,
            email: teamData.email,
            teamDescription: submissionObj.description,
            githubLink: submissionObj.repo,
            youtubeLink: submissionObj.video,
            submission: sub,
          };

          updatedTeams.push(teamObj);
        }

        setTeams(() => [...updatedTeams]);
      } catch (e) {
        //
      } finally {
        setIsLoading(false);
      }
    };

    getTeams();
  }, [userInfo]);

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <Center width="full">
        <CircularProgress
          isIndeterminate
          color="CSOrange"
          size="40%"
        ></CircularProgress>
      </Center>
    );
  }

  return (
    <>
      {!teams || teams.length === 0 ? (
        <VStack p="4%">
          <Heading
            size={HeadingSize}
            py="2%"
            textAlign="center"
            color="CSGreen"
          >
            ¡Nos estamos preparando!
          </Heading>
          <Text size={TextSize} textAlign="center">
            Aún no están disponibles los proyectos para corregir
          </Text>
        </VStack>
      ) : (
        <VStack align="start" width="full">
          <Flex
            width="full"
            direction="row"
            flexWrap="wrap"
            justifyContent="start"
            alignItems="start"
            verticalAlign="top"
          >
            {teams &&
              teams.map((team, index) => {
                return (
                  <RateTeamCard
                    key={index}
                    mx="2%"
                    my="1%"
                    width={["100%", "80%", "45%", "40%", "25%"]}
                    team={{ number: index + 1, ...team }}
                  ></RateTeamCard>
                );
              })}
          </Flex>
        </VStack>
      )}

      <Button
        onClick={onOpen}
        mt={2}
        style={{ position: "absolute", top: "50px", right: "50px" }}
      >
        Información de los criterios
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size={ModalSize}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor="#1C1C1C"
          borderWidth="2px"
          borderColor="CSGreen"
        >
          <ModalHeader>
            <HStack>
              <Heading fontSize={HeadingSize}>Criterios de puntuación</Heading>
              <Spacer></Spacer>
              <IconButton onClick={onClose} icon={<CloseIcon />}></IconButton>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack align="start" width="full">
              <Text fontSize={TextSize} textAlign="start">
                A continuación se detalla qué significa cada puntuación para
                cada categoría
              </Text>
              <Accordion width="full" defaultIndex={[]} allowMultiple>
                <AccordionItem>
                <h1>
                  <AccordionPanel>
                    <Text fontSize={TextSize}>Idea</Text>
                    <Spacer></Spacer>
                    <AccordionIcon />
                  </AccordionPanel>
                </h1>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Problemática</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        El problema no está definido o es irrelevante.
                      </ListItem>
                      <ListItem>
                        El problema es vago o poco relevante.
                      </ListItem>
                      <ListItem>
                        El problema es relevante, pero no está bien argumentado.
                      </ListItem>
                      <ListItem>
                        El problema es relevante y tiene cierto respaldo.
                      </ListItem>
                      <ListItem>
                        El problema es relevante, bien argumentado y respaldado con evidencia.{" "}
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Relación con la Temática</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        El proyecto no se relaciona con la temática.
                      </ListItem>
                      <ListItem>
                        El proyecto se relaciona con la temática pero con un enfoque rebuscado.
                      </ListItem>
                      <ListItem>
                        El proyecto se relaciona con la temática de manera clara.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Innovación y Oportunidad</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        La idea no es innovadora ni presenta diferencias significativas con soluciones existentes. Parece una copia directa de algo ya disponible sin mejoras sustanciales.
                      </ListItem>
                      <ListItem>
                        Tiene un pequeño grado de innovación, pero no aporta mejoras claras o diferenciadoras respecto a soluciones existentes.
                      </ListItem>
                      <ListItem>
                        La idea es creativa y muestra una diferencia clara respecto a lo que ya existe, aportando un valor añadido relevante.
                      </ListItem>
                      <ListItem>
                        La idea es original, aporta valor significativo y mejora lo existente. Tiene potencial para generar un impacto positivo, pero no cambia radicalmente el enfoque del problema.
                      </ListItem>
                      <ListItem>
                        Es altamente innovadora, con un enfoque único y una ventaja competitiva clara. La solución podría cambiar significativamente la forma en que se resuelve el problema.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Impacto y Alcance</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        El impacto es mínimo o inexistente. La idea resuelve un problema irrelevante o de nicho con poco valor para la sociedad o el mercado.
                      </ListItem>
                      <ListItem>
                        Tiene un impacto bajo o solo beneficia a un grupo reducido de personas sin posibilidades claras de crecimiento o expansión.
                      </ListItem>
                      <ListItem>
                        La idea tiene impacto en un sector específico, pero su alcance está limitado por barreras de mercado, tecnología o adopción.
                      </ListItem>
                      <ListItem>
                        La solución puede generar un impacto significativo en una comunidad, industria o segmento de mercado, con potencial para expandirse.
                      </ListItem>
                      <ListItem>
                        La idea tiene un impacto claro y transformador a gran escala, con posibilidad de crecimiento local, nacional o global.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                <h1>
                  <AccordionPanel>
                    <Text fontSize={TextSize}>MVP</Text>
                    <Spacer></Spacer>
                    <AccordionIcon />
                  </AccordionPanel>
                </h1>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Facilidad de Ejecución</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        El proyecto no incluye instrucciones de ejecución, o incluye instrucciones poco claras.
                      </ListItem>
                      <ListItem>
                        El proyecto incluye instrucciones concretas, exhaustivas y con versiones, pero el evaluador necesita ejecutar distintos servicios de manera independiente.
                      </ListItem>
                      <ListItem>
                        El proyecto está bien deployado, o puede ejecutarse utilizando un único script o mediante un contenedor.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Interfaz de Usuario</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        La interfaz es poco intuitiva, confusa o inexistente. No hay consistencia en los elementos visuales y la experiencia del usuario es deficiente.
                      </ListItem>
                      <ListItem>
                        La interfaz tiene una estructura básica, pero el diseño es desordenado o poco atractivo. Falta coherencia en los elementos visuales.
                      </ListItem>
                      <ListItem>
                        La interfaz es funcional y medianamente atractiva. Se entiende la navegación, pero hay margen de mejora en diseño y experiencia de usuario.
                      </ListItem>
                      <ListItem>
                        La interfaz está bien diseñada, con una experiencia de usuario clara y agradable. La navegación es fluida.
                      </ListItem>
                      <ListItem>
                        La interfaz es intuitiva y bien estructurada, con una experiencia de usuario cómoda y eficiente.
                      </ListItem>
                      <ListItem>
                        El diseño es atractivo y profesional, con atención a la tipografía, colores y usabilidad.
                      </ListItem>
                      <ListItem>
                        La interfaz está refinada y bien ejecutada, con una experiencia de usuario fluida y detallada.
                      </ListItem>
                      <ListItem>
                        Diseño excelente, intuitivo y con altos estándares de usabilidad y estética.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Calidad del MVP</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        El MVP no resuelve de manera significativa la problemática planteada.
                      </ListItem>
                      <ListItem>
                        El MVP aborda la problemática, pero de manera muy limitada y con fallas graves.
                      </ListItem>
                      <ListItem>
                        El MVP intenta abordar la problemática, pero lo hace de manera parcial con deficiencias importantes.
                      </ListItem>
                      <ListItem>
                        El MVP es funcional, pero con errores o limitaciones que afectan su efectividad.
                      </ListItem>
                      <ListItem>
                        El MVP ofrece una solución funcional, aunque con deficiencias que limitan su efectividad.
                      </ListItem>
                      <ListItem>
                        El MVP resuelve la problemática, pero podría mejorarse en estabilidad y usabilidad.
                      </ListItem>
                      <ListItem>
                        El MVP resuelve bien la problemática y cumple con la mayoría de los objetivos definidos.
                      </ListItem>
                      <ListItem>
                        El MVP está bien implementado, con mínimos detalles a mejorar.
                      </ListItem>
                      <ListItem>
                        El MVP es sólido, con muy pocos errores y alta funcionalidad.
                      </ListItem>
                      <ListItem>
                        El MVP aborda completamente la problemática y proporciona una solución efectiva y bien implementada.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                <h1>
                  <AccordionPanel>
                    <Text fontSize={TextSize}>Presentación</Text>
                    <Spacer></Spacer>
                    <AccordionIcon />
                  </AccordionPanel>
                </h1>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Video</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        El video es confuso, incompleto o difícil de entender. No explica bien la problemática ni el MVP.
                      </ListItem>
                      <ListItem>
                        Presenta la problemática y el MVP de manera clara, aunque podría mejorar en estructura o presentación.
                      </ListItem>
                      <ListItem>
                        Explicación clara, bien estructurada y atractiva. Presenta la problemática, la solución y el MVP de forma convincente.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const MentorView = ({ token }) => {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Puntuación de equipos</Tab>
      </TabList>

      <TabPanels>
        {/* Selección de proyectos */}
        <TabPanel>
          <TeamRating token={token} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MentorView;
