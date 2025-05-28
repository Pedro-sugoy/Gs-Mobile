// App.js

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import TelaHome from './screens/TelaHome';
import TelaDevs from './screens/TelaDev';
import TelaInform from './screens/TelaInform';
import TelaLogin from './screens/TelaLogin';
import TelaCadas from './screens/TelaCadas';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 24 }}>☰</Text>
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
      })}
    >
      <Drawer.Screen name="Home" component={TelaHome} />
      <Drawer.Screen name="Desenvolvedores" component={TelaDevs} />
      <Drawer.Screen name="Informação" component={TelaInform} />
      <Drawer.Screen name="Login" component={TelaLogin} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={DrawerRoutes} />
        <Stack.Screen name="TelaCadas" component={TelaCadas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
