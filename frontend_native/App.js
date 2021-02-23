
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/Home';
import Chat from './components/Chat';
import Map from './components/Map';
import POI from './components/POI';

import {provider, Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import userName from './reducers/userName.reducer'
import POIList from './reducers/POI.reducers'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const store = createStore(combineReducers( {userName, POIList}) )

function TabButton() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Chat') {
            iconName = 'chat';
          } else if (route.name === 'Map') {
            iconName = 'map';
          } else {
            iconName = 'list';
          }
        return <Entypo name={iconName} size={25} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#0984e3',
      inactiveTintColor: '#dfe6e9',
      style: {
        backgroundColor: '#130f40',
      }
    }}
    >
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name='POI' component={POI} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
       <NavigationContainer style={styles.container}>
       <Stack.Navigator screenOptions={{headerShown: false}}>
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="TabButton" component={TabButton} />
       </Stack.Navigator>
     </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
