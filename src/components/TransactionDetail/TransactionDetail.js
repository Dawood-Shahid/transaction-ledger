import React from 'react';
import {View, Text} from 'react-native';

const TransactionDetail = ({route}) => {
  const navigationProps = route.params;
  // console.log(`\nrouteParams\n`, navigationProps);
  return (
    <View>
      <Text>Transaction Detail Page</Text>
    </View>
  );
};

export default TransactionDetail;
