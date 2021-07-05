/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import RNBootSplash from "react-native-bootsplash";
import {
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import { AuthProvider } from './src/navigation/AuthProvider';
import auth from '@react-native-firebase/auth'

const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const init = async () => {};

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
    });
    
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <AuthProvider>
        {user ? <AppStack /> : <AuthStack />}
    </AuthProvider>

  );
};

const styles = StyleSheet.create({
});

export default App;
