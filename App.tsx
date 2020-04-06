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
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Views
import WorldView from './src/views/WorldView';
import CountryView from './src/views/CountryView';
import InfoView from './src/views/InfoView';
import {Icon} from 'native-base';
import CountryMapView from './src/views/CountryMapView';

declare var global: {HermesInternal: null | {}};

const Tab = createBottomTabNavigator();
const CountryStack = createStackNavigator();

function CountryViewStack() {
  return (
    <CountryStack.Navigator initialRouteName="CountryList">
      <CountryStack.Screen
        name="CountryList"
        component={CountryView}
        options={{title: 'covid19@countries', headerShown: false}}
      />
      <CountryStack.Screen
        name="CountryMapView"
        component={CountryMapView}
        options={{title: 'Country Map View'}}
      />
    </CountryStack.Navigator>
  );
}

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
              style={{color: focused ? 'red' : 'gray'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Country"
        component={CountryViewStack}
        options={{
          title: 'Country View',
          tabBarIcon: ({focused}) => (
            <Icon
              type="Ionicons"
              name="ios-flag"
              style={{color: focused ? 'red' : 'gray'}}
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
