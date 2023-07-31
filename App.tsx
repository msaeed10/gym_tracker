/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RealmContext from "./db/PlaceDatabase";
import Navigator from './components/Navigator';

const {RealmProvider } = RealmContext;

function App(): JSX.Element {

  return (
    <RealmProvider>
      <Navigator />
    </RealmProvider>
  );
}

export default App;
