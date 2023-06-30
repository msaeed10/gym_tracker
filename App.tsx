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

import Places from './components/place/Places';
import CalendarTracker from './components/calendar/CalendarTracker';
import RealmContext from "./db/PlaceDatabase";

const { RealmProvider } = RealmContext;

const Tab = createMaterialTopTabNavigator();
function App(): JSX.Element {
  return (
    <RealmProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={() => ({
                //Tab bar styles can be added here
                tabBarStyle:{paddingTop: 25,
                  backgroundColor:'#C0C0C0',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 2,
                  height:70},
            })}>
          <Tab.Screen
            name="Calendar"
            component={CalendarTracker}/>
            <Tab.Screen name="Places" component={Places} />
        </Tab.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
