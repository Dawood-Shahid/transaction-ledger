import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LedgerList from '../LedgerList';
import Home from '../Home';
import TransactionDetail from '../TransactionDetail';
import Menu from '../Menu';
import appColors from '../../styles/color';
import {View} from 'native-base';
import {LedgerIcon} from '../../assets/svgIcons';

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
          height: 80,
          // paddingTop: verticalScale(isIOS ? 15 : 0),
          // position: 'absolute',
          // backgroundColor: appColors.primary,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          // borderColor: appColors.red,
          // borderWidth: 1,
        },
        // tabBarActiveTintColor: appColors.primary,
        // tabBarInactiveTintColor: appColors.border,
        tabBarIcon: ({focused, color}) => {
          let style = {
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 5,
          };

          console.log('\n > file: StackNavigator.js > line 91 > route', route);

          return (
            <View>
              <View style={style}>
                {route.name === 'Ledgers' && <LedgerIcon />}
                {route.name === 'Menu' && <LedgerIcon />}
              </View>
            </View>
          );
        },
        tabBarLabelStyle: {
          marginBottom: 10,
          fontSize: 14,
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
