import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Home from './components/Home';

const App = () => {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
};

export default App;
