import { VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../components/Button';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Input } from '../components/input';


export function Register() {
  const [isLoadiding, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [descriptor, setDescriptor] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister(){
    if(!patrimony || !descriptor){
     return Alert.alert('Registrar', 'Preencha todos os campos.')
    }

    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      descriptor,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      return Alert.alert('Solicitação', 'Não foi possivel registrar o pedido');
    });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
        <Header title="Nova Solicitação"/>

        <Input 
            placeholder='Número do patrimônio'
            mt={4}
            onChangeText={setPatrimony}
        />
        <Input 
            placeholder='Descrição do problema'
            mt={5}
            flex={1}
            multiline
            textAlignVertical='top'
            onChangeText={setDescriptor}
        />

        <Button 
        title='Cadastrar'
        mt={5}
        isLoading={isLoadiding}
        onPress={handleNewOrderRegister}
        />
    </VStack>
  );
}