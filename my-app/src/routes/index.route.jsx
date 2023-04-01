import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import NewAccount from '../pages/NewAccount';
import Dashboard from '../pages/Dashboard';
import { Text, HStack, Switch, useColorMode, NativeBaseProvider, extendTheme } from 'native-base';
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

export const theme = extendTheme({ config });

const Stack = createNativeStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <ToggleDarkMode />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={Login}
        />
        <Stack.Screen
          name="NewAccount"
          options={{
            title: 'Criar conta',
          }}
          component={NewAccount}
        />
        <Stack.Screen
          name="Dashboard"
          options={{
            headerShown: false,
          }}
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
