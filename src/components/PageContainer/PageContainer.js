import React from 'react';
import {View, StyleSheet} from 'react-native';
import appColors from '../../color';
import appStyles from '../../style';

const PageContainer = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flexCount(1),
    backgroundColor: appColors.background,
  },
});

export default PageContainer;
