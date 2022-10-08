import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';

import appStyles from '../../styles/style';

const StatusTags = ({text, color, background}) => {
  return (
    <Text
      fontSize={'2xs'}
      px={2}
      py={0.5}
      mr={1}
      my={1}
      bold
      borderWidth={0.6}
      borderColor={color}
      color={color}
      textTransform={'capitalize'}
      style={styles.statusContainer(background)}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  statusContainer: statusType => ({
    ...appStyles.containerBorderRadius(5),
    backgroundColor: statusType,
  }),
});

export default StatusTags;
