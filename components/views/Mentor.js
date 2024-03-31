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
const INNOVACION = 1;
const IMPACTO = 2;
const INTERFAZ = 3;
const MVP = 4;
const TEMATICA = 5;
const VIDEO = 6;

const criteria = [
  { name: "Problemática", count: 5 },
  { name: "Innovación y oportunidad", count: 5 },
  { name: "Impacto", count: 5 },
  { name: "Interfaz de usuario", count: 5 },
  { name: "Calidad del MVP", count: 5 },
  { name: "Relación con la temática", count: 3 },
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
      const votings = await axiosApiInstance.get(
        `/votes?mentor=${userInfo.uid}&submission=${team.submission}`
      );
      if (votings.data.length > 0) {
        setVoted(true);
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
        innovacion: ratings[INNOVACION],
        impacto: ratings[IMPACTO],
        interfaz: ratings[INTERFAZ],
        mvp: ratings[MVP],
        tematica: ratings[TEMATICA],
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
      } finally {
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    getTeams();
  }, [userInfo]);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <VStack align="start" width="full">
        {isLoading ? (
          <Center width="full">
            <CircularProgress
              isIndeterminate
              color="CSOrange"
              size="40%"
            ></CircularProgress>
          </Center>
        ) : (
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
        )}
      </VStack>
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
                        No se menciona el problema que se quiere resolver.
                      </ListItem>
                      <ListItem>
                        Se mencionan algunos ejemplos del problema, sin explicar
                        el problema en general.
                      </ListItem>
                      <ListItem>
                        Se explica el problema, pero sin ejemplos concretos del
                        mismo.
                      </ListItem>
                      <ListItem>
                        Se explica la problemática y se utilizan ejemplos, pero
                        estos no se relacionan con la problemática definida.
                      </ListItem>
                      <ListItem>
                        Se explica la problemática y se utilizan ejemplos claros
                        sobre su presencia.{" "}
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Innovación y oportunidad</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        La idea ya es implementada completamente por una
                        empresa, y el público ya la utiliza.
                      </ListItem>
                      <ListItem>
                        La idea ya es implementada completamente por una
                        empresa, pero esta tiene público reducido.
                      </ListItem>
                      <ListItem>
                        La idea ya es parcialmente implementada por una empresa,
                        pero lo propuesto es un incremento sobre esta.
                      </ListItem>
                      <ListItem>
                        La idea es semejante a la implementada por otras
                        empresas, pero ofrece un enfoque distinto para
                        implementar la solución.
                      </ListItem>
                      <ListItem>
                        La idea es disruptiva y no es implementada por otra
                        empresa.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Impacto</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        El proyecto no es aplicable a los usuarios con la
                        problemática en el futuro.
                      </ListItem>
                      <ListItem>
                        El proyecto no es aplicable actualmente a los usuarios
                        con la problemática, pero podía serlo en un futuro (por
                        ejemplo, por el desarrollo de una tecnología
                        complementaria).
                      </ListItem>
                      <ListItem>
                        El proyecto es aplicable actualmente a los usuarios con
                        la problemática, pero su uso se verá limitado por
                        factores ajenos a lo económico.
                      </ListItem>
                      <ListItem>
                        El proyecto es aplicable actualmente a los usuarios con
                        la problemática, pero su uso se verá limitado por
                        factores económicos (por ejemplo, por el costo asociado
                        al usuario).
                      </ListItem>
                      <ListItem>
                        El proyecto es aplicable actualmente a los usuarios con
                        la problemática, y su adopción no será limitada por
                        factores económicos.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Interfaz de usuario</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        La interfaz no permite las acciones mencionadas en la
                        solución (por ejemplo, se tienen que subir archivos pero
                        no se puede hacer mediante la aplicación).
                      </ListItem>
                      <ListItem>
                        La interfaz permite la mayoría de las acciones, pero
                        muchas de ellas no informan lo sucedido al usuario.
                      </ListItem>
                      <ListItem>
                        La interfaz permite la mayoría de las acciones y proveen
                        feedback claro, pero su acceso es poco intuitivo.
                      </ListItem>
                      <ListItem>
                        La interfaz permite la mayoría de las acciones con
                        acceso intuitivo y feedback claro, pero no es
                        consistente a lo largo de la aplicación.
                      </ListItem>
                      <ListItem>
                        La interfaz permite la mayoría de las acciones con
                        acceso intuitivo y feedback claro, manteniendo
                        consistencia en toda la aplicación.
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
                        El MVP no ofrece gran parte de la funcionalidad
                        propuesta para resolver la problemática.
                      </ListItem>
                      <ListItem>
                        El MVP ofrece gran parte de la funcionalidad propuesta
                        para resolver la problemática, pero lo hace con notables
                        problemas que no son reconocidos por el equipo.
                      </ListItem>
                      <ListItem>
                        El MVP ofrece gran parte de la funcionalidad propuesta
                        para resolver la problemática, tiene notables problemas
                        pero la mayoría de estos son reconocidos por el equipo
                        como punto de mejora.
                      </ListItem>
                      <ListItem>
                        El MVP ofrece gran parte de la funcionalidad propuesta
                        para resolver la problemática, y tiene problemas mínimos
                        para resolver.
                      </ListItem>
                      <ListItem>
                        El MVP implementa toda la funcionalidad propuesta para
                        resolver la problemática, y podría comenzar a utilizarse
                        con cambios mínimos.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Relación con la temática</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        El proyecto no se relaciona con la temática bajo ningún
                        enfoque.
                      </ListItem>
                      <ListItem>
                        El proyecto se relaciona con la temática pero bajo un
                        enfoque rebuscado.
                      </ListItem>
                      <ListItem>
                        El proyecto se relaciona con la temática de manera
                        clara.
                      </ListItem>
                    </OrderedList>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Text fontSize={TextSize}>Presentación (video)</Text>
                      <Spacer></Spacer>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <OrderedList textAlign="start">
                      <ListItem>
                        La presentación es difícil de seguir, no hay un hilo
                        conductor claro sobre el proyecto desarrollado.
                      </ListItem>
                      <ListItem>
                        La presentación tiene un hilo conductor, pero el video o
                        el audio son poco útiles para demostrar la solución.
                      </ListItem>
                      <ListItem>
                        La presentación tiene un hilo conductor, con video y
                        audio que muestran claramente el funcionamiento de la
                        solución.
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
