import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import appColors from '../../styles/color';

const FloatButton = ({
  icon,
  onClick,
  color = appColors.primary,
  position = {bottom: 0, right: 0},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onClick}
      style={styles.buttonContainer(color, position)}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: (background, position) => ({
    position: 'absolute',
    bottom: position.bottom,
    right: position.right,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background,
    height: 50,
    width: 50,
    borderRadius: 100,
  }),
});

export default FloatButton;
