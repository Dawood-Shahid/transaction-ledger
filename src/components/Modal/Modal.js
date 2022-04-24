import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'native-base';
import appStyles from '../../style';
import appColors from '../../color';

const Modal = ({title, content, buttons, onOutsideTap}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onOutsideTap}
      style={styles.modalWrapper}>
      <View style={styles.modalContentContainer}>
        <Text fontSize={'lg'} bold color={appColors.primary}>
          {title}
        </Text>
        <View>{content && content}</View>
        <View>{buttons && buttons}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.backgroundWithOpacity,
    position: 'absolute',
  },
  modalContentContainer: {
    ...appStyles.containerBorderRadius(),
    backgroundColor: appColors.white,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Modal;
