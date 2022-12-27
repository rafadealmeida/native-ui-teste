import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
} from 'native-base';
import Login from './src/pages/Home';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider>
      <Login />
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
