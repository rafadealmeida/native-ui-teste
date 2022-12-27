import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Text, HStack, Switch, useColorMode, NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import NewAccount from './src/pages/NewAccount';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{
            headerShown:false
          }} component={Login} />
          <Stack.Screen name="NewAccount" options={{
            title:'Criar conta'
          }} component={NewAccount} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Login /> */}
      <ToggleDarkMode />
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
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        aria-label={colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
      />
      <Text>Light</Text>
    </HStack>
  );
}
