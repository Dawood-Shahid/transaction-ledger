import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import StackNavigator from './components/StackNavigator';
import {store} from './store/app.store';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Provider store={store}>
          <StackNavigator />
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
