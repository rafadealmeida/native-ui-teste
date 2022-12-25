import React, {useState} from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Input,
  Button,
  Image,
  Icon
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [load, setLoad]= useState(false)
  const [show, setShow]= useState(false)

  const handleLoad =()=>{
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 5000);
  }
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <VStack space={5} alignItems="center">
          <Image size={150} borderRadius={100}source={{
      uri:"https://img.freepik.com/premium-vector/cloud-with-padlock-hand-drawn-outline-doodle-icon-internet-password-data-protection-security-concept_107173-18135.jpg"
    }} 
    alt="Alternate Text"/>
          <Heading size="lg">Entre com sua conta</Heading>
    <Input mx="3" placeholder="Login" w={{
      base: "75%",
      md: "25%"
    }} 
    InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} />
    <Input mx="3" placeholder="Login" w={{
      base: "75%",
      md: "25%"
    }} 
    InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />} />
           {/* <Input mx="3" w={{
      base: "75%",
      md: "25%"
    }} 
    type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Senha" /> */}
          <Button isLoading={load} isLoadingText="Entrando...." variant="outline" onPress={handleLoad}>
        Entrar
      </Button>
          <ToggleDarkMode />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
