/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Regions from './components/region/Regions';
import CalendarTracker from './components/calendar/CalendarTracker';

const Tab = createMaterialTopTabNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator style={styles.container}>
        <Tab.Screen
          name="Calendar"
          component={CalendarTracker}/>
        <Tab.Screen name="Regions" component={Regions} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginTop: 25
  },
});

export default App;
