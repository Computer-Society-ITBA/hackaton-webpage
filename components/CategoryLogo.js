import { Box, Heading, Img, Center } from "@chakra-ui/react"
import { useState } from "react";

const CategoryLogo = (props) => {
 const {names,imgSrc} = props
//  const [isShown, setIsShown] = useState(false);
 return(
    <Box boxSize="25%" direction="column" w='100%'>
        <Center>
            {/* {isShown?<Img onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)} height='200px' width='200px' src={imgSrc} alt={names[0]}></Img>: <Img onMouseEnter={()=>setIsShown(true)} onMouseLeave={()=>setIsShown(false)} height='200px' width='200px' src='/images/IEEE_CS.svg' alt={names[0]}></Img>} */}
            <Img height='200px' width='200px' src={imgSrc} alt={names[0]}></Img>
        </Center>
        {names.map((name)=>{
            return(<Heading  key={name} size={['xs','xs','md','md','lg']} textAlign='center' width="100%">{name}</Heading>)
        })}
    </Box>
 )
}
export default CategoryLogo