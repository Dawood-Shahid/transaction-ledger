import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {StatusBar, View, Text, Input} from 'native-base';
import appStyles from '../../style';
import Header from '../Header';
import PageContainer from '../PageContainer';
import appColors from '../../color';
import {TRANSACTION_TYPE_EXPENSE} from '../constants/transactionConstant';

const TransactionDetail = ({route}) => {
  const navigationProps = route.params;
  const transactionType =
    navigationProps.type === TRANSACTION_TYPE_EXPENSE ? 'Out' : 'In';

  return (
    <PageContainer>
      <StatusBar />
      <SafeAreaView style={appStyles.flexCount(1)}>
        <Header title={'Transaction Detail'} />
        <View style={styles.mainContainer}>
          <Text
            color={
              navigationProps.type === TRANSACTION_TYPE_EXPENSE
                ? appColors.red
                : appColors.green
            }
            p={1}
            bold
            fontSize={'lg'}>
            Enter Cash {transactionType} Details
          </Text>
          <Input size="lg" placeholder="lg Input" />
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...appStyles.flexCount(1),
    padding: 10,
  },
});

export default TransactionDetail;
