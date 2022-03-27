import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text, Icon} from 'native-base';
import {Feather} from '../Icons';
import appColors from '../../color';
import appStyles from '../../style';

const Header = ({
  title = null,
  showLeftIcon = true,
  leftIcon = null,
  backHandler = null,
  rightIcon = null,
}) => {
  const renderLeftIcon = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (backHandler) {
            backHandler();
          } else {
            // goBack();
            console.log(`\nheader back clicked\n`);
          }
        }}>
        {leftIcon ? (
          leftIcon()
        ) : (
          <Icon
            as={Feather}
            name={'arrow-left'}
            size={'5'}
            color={appColors.text}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer(true)}>
        {showLeftIcon && renderLeftIcon()}
      </View>
      <View style={styles.titleContainer}>
        {title && (
          <Text color={appColors.text} style={{}}>
            {title}
          </Text>
        )}
      </View>
      <View style={styles.iconContainer(false)}>
        {rightIcon && rightIcon()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    backgroundColor: appColors.primary,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  iconContainer: left => ({
    ...(left ? {marginLeft: 10} : {marginRight: 10}),
  }),
  titleContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    alignItems: 'center',
  },
});

export default Header;
