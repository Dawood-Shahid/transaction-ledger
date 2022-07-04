import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LedgerList from '../LedgerList';
import Home from '../Home';
import TransactionDetail from '../TransactionDetail';
import ViewTransaction from '../ViewTransaction';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LedgerList"
        component={LedgerList}
        options={{headerShown: false}}
      />
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
      <Stack.Screen
        name="ViewTransaction"
        component={ViewTransaction}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
