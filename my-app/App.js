import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Text, HStack, Switch, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import NewAccount from './src/pages/NewAccount';
import Routes from './src/routes/index.route';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <Routes/>
    </NativeBaseProvider>
  );
}


