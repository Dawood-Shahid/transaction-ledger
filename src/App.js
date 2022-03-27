import React from 'react';
import {StyleSheet} from 'react-native';
import {NativeBaseProvider, View} from 'native-base';
import Home from './components/Home';
import appStyles from './style';

const App = () => {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
