import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Input} from 'native-base';

import appStyles from '../../style';
import appColors from '../../color';

const InputField = ({value, setValue, rightElement = null}) => {
  return (
    <View style={styles.inputContainer}>
      <Input
        value={value}
        onChangeText={text => setValue(text)}
        size="lg"
        variant="unstyled"
        ml={2}
        placeholder="Add Ledger Name"
        placeholderTextColor={appColors.primary}
        color={appColors.primary}
        rightElement={rightElement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    ...appStyles.containerBorderRadius(),
    borderWidth: 1.5,
    borderColor: appColors.primary,
    backgroundColor: appColors.white,
    height: 46,
    margin: 10,
  },
});

export default InputField;
