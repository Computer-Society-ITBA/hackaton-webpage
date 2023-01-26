import {
    Heading,
    Flex,
    Box,
    Img,
  } from "@chakra-ui/react";
import Particles from "react-tsparticles";
import particlesConfig from "../config/configParticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticlesLogo = (props) =>{
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);
  
    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
    const csImage = `/images/cs_logo.svg`;
    return (
        <Flex>
      <Particles id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded} options={particlesConfig}/> 
      <Box direction="column" m='auto' marginTop={'12em'} paddingX='10%' position="absolute" left={0} right={0} top={0} bottom={0}>
          <Img src={csImage}  height="35%" alt="logo"/>
          <Box textAlign={'end'}>
            <Heading display='inline' color='white'>by </Heading>
            <Heading display='inline' color='orange'>Computer Society ITBA</Heading>
          </Box>
      </Box>
      </Flex>
    )
}
export default ParticlesLogo