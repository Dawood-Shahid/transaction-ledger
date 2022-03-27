import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Home';
import TransactionDetail from '../TransactionDetail';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
