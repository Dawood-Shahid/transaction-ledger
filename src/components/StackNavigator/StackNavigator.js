import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, View} from 'native-base';

import LedgerList from '../LedgerList';
import Home from '../Home';
import TransactionDetail from '../TransactionDetail';
import Menu from '../Menu';
import {MaterialCommunityIcons} from '../../assets/vectorIcons';
import FontAwesomeIcon, {faBarsStaggered} from '../../assets/fontAwesomeIcons';
import appColors from '../../styles/color';

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LedgerList"
        component={BottomTab}
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
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 75,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.inputIconColor,
        tabBarIcon: ({color}) => {
          let style = {
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: -5,
          };

          return (
            <View style={style}>
              {route.name === 'Ledgers' && (
                <Icon
                  as={MaterialCommunityIcons}
                  name={'bookshelf'}
                  size={'9'}
                  color={color}
                />
              )}
              {route.name === 'Menu' && (
                <FontAwesomeIcon
                  icon={faBarsStaggered}
                  color={color}
                  size={28}
                />
              )}
            </View>
          );
        },
        tabBarLabelStyle: {
          marginBottom: 12,
          fontSize: 14,
          fontWeight: 'bold',
          lineHeight: 16,
        },
      })}>
      <Tab.Screen
        name="Ledgers"
        component={LedgerList}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Menu" component={Menu} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default StackNavigator;
