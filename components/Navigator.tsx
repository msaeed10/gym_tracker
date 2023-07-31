import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Places from './place/Places';
import CalendarTracker from './calendar/CalendarTracker';
import RealmContext, { Place } from "../db/PlaceDatabase";

const {useQuery } = RealmContext;

const Tab = createMaterialTopTabNavigator();

function Navigator(): JSX.Element {
  const places = useQuery(Place);
  let initialRoute = places.length === 0 ? "Places" : "Calendar";

  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={() => ({
                tabBarStyle:{paddingTop: 25,
                    backgroundColor:'#C0C0C0',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 2,
                    height:70},
            })} initialRouteName={initialRoute}>
            <Tab.Screen
            name="Calendar"
            component={CalendarTracker}/>
            <Tab.Screen name="Places" component={Places} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;