import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Input,
  Button,
  Image,
  Icon,
  Pressable,
  Alert,
  IconButton,
  CloseIcon,
  Box,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import AlertSuccesAccount from '../../components/alert';

import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '',
});

export default function NewAccount({ navigation }) {
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleNewAccount = () => {
    setLoad(true);
    auth()
      .createUserWithEmailAndPassword(email, senha)
      .then((UserCredential) => {
        const user = UserCredential.user;
        setShowAlert('success');
        console.log(user);
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message.split(' ')[0]);
        if (error.message.split(' ')[0] === '[auth/email-already-in-use]') {
          setShowAlert('inUse');
          console.log('Conta já existente');
        } else {
          setShowAlert('fail');
        }
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      <VStack space={5} alignItems="center">
        <Heading size="lg">Criar conta usando email e senha</Heading>
        <Input
          mx="3"
          placeholder="Email"
          w={{
            base: '75%',
            md: '25%',
          }}
          InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          mx="3"
          w={{
            base: '75%',
            md: '25%',
          }}
          type={show ? 'text' : 'password'}
          InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Senha"
          onChangeText={(text) => setSenha(text)}
        />
        <Button isLoading={load} isLoadingText="Entrando...." variant="outline" onPress={handleNewAccount}>
          Criar conta
        </Button>
      </VStack>
      {showAlert === 'success' && <AlertSuccesAccount status="success" />}
      {showAlert === 'fail' && <AlertSuccesAccount status="error" />}
      {showAlert === 'inUse' && <AlertSuccesAccount status="info" />}
    </Center>
  );
}
