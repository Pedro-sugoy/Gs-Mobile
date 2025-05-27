import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TelaHome from './screens/TelaHome';
import TelaDevs from './screens/TelaDev';
import TelaInform from './screens/TelaInform';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 24 }}>☰</Text> 
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
        })}
      >
        <Drawer.Screen name="Home" component={TelaHome} />
        <Drawer.Screen name="Desenvolvedores" component={TelaDevs} />
        <Drawer.Screen name="Informação" component={TelaInform} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
