import { Box, Input, Text } from '@chakra-ui/react';

export default function SubmitInput({label, name, register, placeholder, errors, validation = {}, errorMsg = '', InputComponent = Input}) {
    return (
        <Box py={2}>
            <Text color='#55faa2' fontSize='xl'>{label}</Text>
            <InputComponent {...register(name, validation)} w={['100%', '100%', '70%', '50%', '50%']} 
                display='block' placeholder={placeholder}/>
            {errors && errors[name] && <Text color={'red'}>{errorMsg}</Text>}
        </Box>
    )
}
