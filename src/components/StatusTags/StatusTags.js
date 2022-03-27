import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'native-base';
import appStyles from '../../style';

const StatusTags = ({text, color, background}) => {
  return (
    <Text
      fontSize={'2xs'}
      p={2}
      m={1}
      bold
      color={color}
      style={styles.statusContainer(background)}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  statusContainer: statusType => ({
    ...appStyles.containerBorderRadius(100),
    backgroundColor: statusType,
  }),
});

export default StatusTags;
