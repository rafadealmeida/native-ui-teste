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
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '180449136029-6gs92s69u8teforhtgrlj6n88njqe48h.apps.googleusercontent.com',
});

export default function Login({ navigation }) {
  const [load, setLoad] = useState(false);
  const [loadGoogle, setLoadGoogle] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLoad = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 5000);
  };

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken, user } = await GoogleSignin.signIn();
      console.log(user);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = () => {
    setLoad(true);
    auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        navigation.navigate('Dashboard');
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  };
  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      <VStack space={5} alignItems="center">
        <Image
          size={150}
          borderRadius={100}
          source={{
            uri: 'https://img.freepik.com/premium-vector/cloud-with-padlock-hand-drawn-outline-doodle-icon-internet-password-data-protection-security-concept_107173-18135.jpg',
          }}
          alt="Alternate Text"
        />
        <Heading size="lg">Entre com sua conta</Heading>
        <Input
          mx="3"
          placeholder="Login"
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
        <HStack space={2}>
          <Button isLoading={load} isLoadingText="Entrando...." variant="outline" onPress={handleLogin}>
            Entrar
          </Button>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('NewAccount')}
          >
            Criar nova conta
          </Button>
        </HStack>
        <Button isLoading={loadGoogle} isLoadingText="Entrando...." variant="outline" onPress={onGoogleButtonPress}>
          Entrar com google
        </Button>
      </VStack>
    </Center>
  );
}
