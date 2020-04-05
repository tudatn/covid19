/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, ColorPropType} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Views
import WorldView from './src/views/WorldView';
import CountryView from './src/views/CountryView';
import InfoView from './src/views/InfoView';
import {Icon} from 'native-base';

declare var global: {HermesInternal: null | {}};

const Tab = createBottomTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Word"
        component={WorldView}
        options={{
          title: 'World View',
          tabBarIcon: ({focused}) => (
            <Icon
              type="Ionicons"
              name="ios-globe"
              style={{color: focused ? 'orange' : 'gray'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Country"
        component={CountryView}
        options={{
          title: 'World View',
          tabBarIcon: ({focused}) => (
            <Icon
              type="Ionicons"
              name="ios-flag"
              style={{color: focused ? 'orange' : 'gray'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoView}
        options={{
          title: 'Info',
          tabBarIcon: ({focused}) => (
            <Icon
              type="MaterialIcons"
              name="info-outline"
              style={{color: focused ? 'orange' : 'gray'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>{TabStack()}</NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
