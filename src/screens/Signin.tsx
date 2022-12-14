import { useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme, Text } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from '../assets/logo_primary.svg';
import { Input } from "../components/input";
import { Button } from "../components/Button";


export function Signin(){
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const { colors } = useTheme();

    function handleSingIn(){
        if(!name || !password) {
            return Alert.alert('Entrar', 'Informe e-mail e senha.');
        }

        setIsLoading(true);

        auth()
        .signInWithEmailAndPassword(name, password)
        .catch((error) => {
            console.log(error.code);
            setIsLoading(false);

            if(error.code === 'auth/invalid-email'){
                return Alert.alert('Entrar', 'E-mail Inválido.');
            }

            if(error.code === 'auth/whong-password'){
                return Alert.alert('Entrar', 'E-mail ou senha Inválido.');
            }

            if(error.code === 'auth/user-not-found') {
                return Alert.alert('Entrar', 'Usuário não cadastrado.');
            }

           return Alert.alert('Entrar', 'Não foi possível acessar');
        });
    }

    return(
        <VStack flex={1} alignItems="center" bg={"gray.600"} px={8} pt={24}>

            <Logo/>

            <Heading color={"gray.100"} fontSize="xl" mt={20} mb={6}>
                Acesse Sua Conta
            </Heading>

            <Input placeholder="E-mail"
            mb={4}
            InputLeftElement = {<Icon as={<Envelope color={colors.gray[300]}/>} ml={4} />}
            onChangeText={setName}
            />
            <Input mb={8} placeholder="Senha"
            InputLeftElement = {<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
            secureTextEntry
            onChangeText={setPassword}
            />

            <Button 
            title="Entrar" 
            w="full" 
            onPress={handleSingIn}
            isLoading={isLoading}
            />

            <Text 
            color="white"
            mt={90}
            fontSize="xs"
            >© Copyright 2022 Felipe Holanda - All Rights Reserved</Text>
            
        </VStack>
    )
}