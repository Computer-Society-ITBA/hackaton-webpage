import { Box, Center, CircularProgress, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { auth } from '../../config/firebaseConfig';

const HeadingSize = ['sm','md','lg','xl','2xl']
const TextSize = ['xs','sm','md','lg','xl']

const TODOView = ()=>{
    return(
        <VStack p='4%' >
            <Heading size={HeadingSize} py='2%' textAlign='center' color="CSGreen">¡Nos estamos preparando!</Heading>
            <Text size={TextSize} textAlign='center'>Te avisaremos cuando puedas comenzar a usar tu perfil</Text>
        </VStack>
    )
}
const {AdminView} = require('../../components/views/admin')
const Home = () => {
    const [view, setView] = useState(
        <Flex pt='8%' justifyContent='center' alignItems='center'align='center'>
            <CircularProgress isIndeterminate color='CSOrange' size='40%'></CircularProgress>
        </Flex>
        
    )
    useEffect(()=>{
        async function getUser(){
        if(auth.currentUser){
            const userCredentials = await auth.currentUser.getIdTokenResult()
            switch(userCredentials.claims.role){
                case "admin": setView(<AdminView></AdminView>);break;
                default: setView(<TODOView/>)
            }
        }
        }
        getUser()
    },[])
    return view
}
  
  
  export default Home;