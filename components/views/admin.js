import { AddIcon, CheckCircleIcon, CheckIcon, CloseIcon, Icon, MinusIcon } from "@chakra-ui/icons"
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
    Grid,
    SimpleGrid,
    GridItem,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    Center,
} from "@chakra-ui/react"

const HeadingSize = ['sm','md','lg','xl','2xl']
const TextSize = ['xs','sm','md','lg','xl']
const TeamCard = ({team, ...extendedProps}) => {
    const {isOpen, onToggle} = useDisclosure()
    return (
        <VStack p='2%' align='center' borderRadius='8px' borderWidth='2px 2px 6px 2px' borderColor='CSBlue' {...extendedProps}>
            <Flex onClick={onToggle} direction='row' verticalAlign='middle' width='full'>
                <Heading fontSize={HeadingSize}>{`Equipo ${team.number}: ${team.name}`}</Heading>
                <Spacer></Spacer>
                <HStack>
                    {team.qualified?<CheckCircleIcon color='CSGreen'/>:<CloseIcon color='red.500'/>}
                    <IconButton _hover={{"backgroundColor":"grey"}} mx='4%' onClick={onToggle} backgroundColor='transparent' icon={isOpen?<MinusIcon/>:<AddIcon/>}></IconButton>
                </HStack>
            </Flex>
            <Flex>
                
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <VStack width='full' align='start'>
                    <Text fontSize={TextSize} textAlign='start' color='CSBlue'>Describe al equipo: intereses, estudios, mentalidad:</Text>
                    <Text  size={TextSize}textAlign='start'>{team.teamDescription}</Text>
                    <Text fontSize={TextSize} textAlign='start' color='CSBlue'>¿Por qué les interesa participar en HackITBA?</Text>
                    <Text size={TextSize} textAlign='start'>{team.motivation}</Text> 
                    <Text fontSize={TextSize} textAlign='start' color='CSBlue'>Participantes</Text>
                    <Accordion width='full' defaultIndex={[]} allowMultiple>
                    {team.participants.map((participant,index)=>{
                        return(
                            <AccordionItem key={index}>
                                <h2>
                                <AccordionButton>
                                    <Text fontSize={TextSize}>{participant.name}</Text>
                                    <Spacer></Spacer>
                                    <AccordionIcon/>
                                </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <VStack align='start' width='full'>
                                        <Text size={TextSize} textAlign='start' color='CSBlue'>DNI: <Text size={TextSize} color='white' display='inline'>{participant.DNI}</Text></Text>
                                        <Text size={TextSize} textAlign='start' color='CSBlue'>email: <Text size={TextSize} color='white' display='inline'>{participant.email}</Text></Text>
                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })}
                    </Accordion>
                </VStack>
                <Flex width='full'>
                <Button 
                      size={["sm", "lg"]}
                      height="48px"
                      width="40%"
                      border="5px"
                      color="black"
                      variant="solid"
                      bgColor="red.500"
                      _hover={{"backgroundColor":'red.400'}}
                      my='4%'
                      leftIcon={<CloseIcon/>}
                      > 
                      Rechazar 
                    </Button>
                    <Spacer/>
                <Button 
                      size={["sm", "lg"]}
                      height="48px"
                      width="40%"
                      border="5px"
                      color="black"
                      variant="solid"
                      bgColor="CSGreen"
                      _hover={{"backgroundColor":'#05eda7'}}
                      my='4%'
                      leftIcon={<CheckIcon/>}
                      > 
                      Aceptar 
                    </Button>
                   
                </Flex>
            </Collapse>
        </VStack>
    )
}
const TeamSelection = ()=>{
    //TODO: replace with real data
    const teams = [
        {
            number: 1,
            name: 'Hello world',
            qualified:true,
            teamDescription: 'We are the best',
            motivation:'We want to win',
            participants:[{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'}]
        },
        {
            number: 1,
            name: 'Hello world',
            qualified:false,
            teamDescription: 'We are the best',
            motivation:'We want to win',
            participants:[{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'}]
        },
        {
            number: 1,
            name: 'Hello world',
            qualified:true,
            teamDescription: 'We are the best',
            motivation:'We want to win',
            participants:[{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'}]
        },{
            number: 1,
            name: 'Hello world',
            qualified:false,
            teamDescription: 'We are the best',
            motivation:'We want to win',
            participants:[{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'}]
        },
        {
            number: 1,
            name: 'Hello world',
            qualified:false,
            teamDescription: 'We are the best',
            motivation:'We want to win',
            participants:[{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'}]
        },
        {
            number: 1,
            name: 'Hello world',
            qualified:false,
            teamDescription: 'We are the best',
            motivation:'We want to win',
            participants:[{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'}]
        },
        {
            number: 1,
            name: 'Hello world',
            qualified:false,
            teamDescription: 'We are the best',
            motivation:'We want to win',
            participants:[{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'},{name:"Jose",DNI:'43448342',email:'jmentasti@itba.edu.ar'}]
        }

    ]
    return(
        <VStack align='start' width='full'>
            <Heading textAlign='start'>{`Equipos aceptados: ${teams.filter(team=>team.qualified).length}`}</Heading>
            {/* <Grid width='full' templateColumns={['repeat(1,1fr)','repeat(1,1fr)','repeat(2,1fr)','repeat(2,1fr)','repeat(2,1fr)']}>
                {teams.map((team,index)=>{
                    return(
                        <GridItem key={index} mx={['2%','2%','4%','6%','8%']} align='center' py='2%'>
                            <TeamCard team={team} key={index}></TeamCard>
                        </GridItem>
                    )
                })}
            </Grid> */}
            <Flex width='full' direction='row' flexWrap='wrap' justifyContent='start' alignItems='start' verticalAlign='top'>
                {teams.map((team,index)=>{
                    return(
                        <TeamCard key={index} mx='2%' my='1%' width={['100%','80%','45%','40%','25%']} team={team}></TeamCard>
                    )
                })}
            </Flex>
        </VStack>
    )

}
const AdminView = ()=>{
    return(
        <Tabs variant='enclosed'>
            <TabList>
                <Tab>
                    Selección de equipos
                </Tab>
                <Tab>
                    Evaluación de proyectos
                </Tab>
            </TabList>

            <TabPanels>
                {/* Selección de proyectos */}
                <TabPanel> 
                    <TeamSelection/>
                </TabPanel>
                {/* Evaluacion de proyectos */}
                <TabPanel>
                    <div>
                    <p>two!</p>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}


module.exports = {AdminView}