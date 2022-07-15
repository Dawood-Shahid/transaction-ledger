import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {View} from 'native-base';

import appColors from '../../color';
import appStyles from '../../style';

const PageContainer = ({children}) => {
  return (
    <>
      <StatusBar backgroundColor={appColors.primary} />
      <View style={styles.container}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flexCount(1),
    backgroundColor: appColors.background,
  },
});

export default PageContainer;
