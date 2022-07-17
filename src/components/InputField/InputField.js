import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Input} from 'native-base';

import appStyles from '../../style';
import appColors from '../../color';

const InputField = ({
  value,
  setValue,
  placeholder = null,
  label = null,
  rightElement = null,
  customStyles = {},
  otherInputField = null,
}) => {
  return (
    <View>
      {label && (
        <Text color={appColors.black} py={1} bold>
          {label}
        </Text>
      )}
      <View style={[styles.inputContainer, customStyles]}>
        {!otherInputField ? (
          <Input
            value={value}
            onChangeText={text => setValue(text)}
            size="lg"
            variant="unstyled"
            ml={2}
            placeholder={placeholder}
            placeholderTextColor={appColors.black}
            color={appColors.black}
            rightElement={rightElement}
          />
        ) : (
          <>{otherInputField}</>
        )}
      </View>
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
  },
});

export default InputField;
