import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  VirtualizedList,
  Animated,
} from 'react-native';
import {View, Text, Icon} from 'native-base';
import PageContainer from '../PageContainer';
import Header from '../Header';
import FloatButton from '../FloatButton';
import {MaterialCommunityIcons, Entypo, Ionicons, AntDesign} from '../Icons';
import appColors from '../../color';
import appStyles from '../../style';
import {
  TRANSACTION_DATA,
  TRANSACTION_TYPE_EXPENSE,
} from '../constants/transactionConstant';
import StatusTags from '../StatusTags';

const ANIMATED_Value = new Animated.Value(0);

const Home = () => {
  const [toggle, setToggle] = useState(false);

  const toggleAnimationHandler = () => {
    const toValue = toggle ? 0 : 1;

    Animated.timing(ANIMATED_Value, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setToggle(!toggle);
  };

  const renderLeftIcon = () => {
    return (
      <View style={appStyles.flexRow}>
        <Icon
          as={MaterialCommunityIcons}
          name={'notebook-multiple'}
          size={'5'}
          color={appColors.white}
        />
        <Text color={appColors.white} ml={2} bold numberOfLines={1} width={125}>
          Ledger Name Ledger Name Ledger Name
        </Text>
        <Icon
          as={Entypo}
          name={'chevron-small-down'}
          size={'5'}
          color={appColors.white}
        />
      </View>
    );
  };

  const renderCashDetailCard = () => {
    return (
      <View style={styles.cashDetails}>
        <View style={styles.cashDetailRow}>
          <Text color={appColors.text} bold lineHeight={'2xl'}>
            Cash In
          </Text>
          <Text color={appColors.green} bold lineHeight={'2xl'}>
            50000
          </Text>
        </View>
        <View style={styles.cashDetailRow}>
          <Text color={appColors.text} bold lineHeight={'2xl'}>
            Cash Out
          </Text>
          <Text color={appColors.red} bold lineHeight={'2xl'}>
            15000
          </Text>
        </View>
        <View style={styles.cashDetailRowTotal}>
          <Text
            color={appColors.primary}
            bold
            fontSize={'md'}
            lineHeight={'2xl'}>
            Total Cash
          </Text>
          <Text
            color={appColors.primary}
            bold
            fontSize={'md'}
            lineHeight={'2xl'}>
            35000
          </Text>
        </View>
      </View>
    );
  };

  const renderCard = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardTitleRow}>
          <Text noOfLines={2} width={250} color={appColors.primary}>
            {item.title}
          </Text>
          <Text color={appColors.text}>{item.createdAt}</Text>
        </View>
        <View style={styles.cardStatusRow}>
          <StatusTags
            text={item.paymentMethod}
            color={appColors.paymentMethodText}
            background={appColors.paymentMethodBackground}
          />
          {item.category && (
            <StatusTags
              text={item.category}
              color={appColors.categoryText}
              background={appColors.categoryBackground}
            />
          )}
        </View>
        <View style={styles.cardAmountRow}>
          <Text fontSize={'xs'} color={appColors.subText}>
            Balance: {item.balance}
          </Text>
          <Text
            color={
              item.type === TRANSACTION_TYPE_EXPENSE
                ? appColors.red
                : appColors.green
            }
            bold
            lineHeight={'2xl'}>
            {item.amount}
          </Text>
        </View>
      </View>
    );
  };

  const renderFloatButtonWithAnimation = () => {
    return (
      <>
        <Animated.View
          style={[styles.FloatingButtonBackground, styles.animateBackground]}
        />
        <Animated.View
          style={[styles.transactionButton, styles.animateButton(-120)]}>
          <FloatButton
            position={{bottom: 0, right: 0}}
            onClick={() => console.log(`\nadd button click\n`)}
            color={appColors.red}
            icon={
              <Icon
                as={AntDesign}
                name={'minus'}
                size={'6'}
                color={appColors.white}
              />
            }
          />
        </Animated.View>
        <Animated.View
          style={[styles.transactionButton, styles.animateButton(-60)]}>
          <FloatButton
            position={{bottom: 0, right: 0}}
            onClick={() => console.log(`\nadd button click\n`)}
            color={appColors.green}
            icon={
              <Icon
                as={Ionicons}
                name={'md-add'}
                size={'6'}
                color={appColors.white}
              />
            }
          />
        </Animated.View>
        <FloatButton
          position={{bottom: 40, right: 30}}
          onClick={toggleAnimationHandler}
          icon={
            <Icon
              as={Entypo}
              name={'add-to-list'}
              size={'5'}
              color={appColors.white}
            />
          }
        />
      </>
    );
  };

  return (
    <PageContainer>
      <StatusBar />
      <SafeAreaView style={appStyles.flexCount(1)}>
        <Header
          leftIcon={renderLeftIcon}
          backHandler={() => console.log(`\nnavigate to ledger list\n`)}
        />
        <View style={styles.mainContainer}>
          {renderCashDetailCard()}
          <View style={appStyles.flexCount(1)}>
            {true ? (
              <VirtualizedList
                data={TRANSACTION_DATA}
                renderItem={renderCard}
                keyExtractor={(item, index) => `${item.text}-${index}`}
                getItemCount={() => TRANSACTION_DATA.length}
                getItem={(data, index) => ({id: index, ...data[index]})}
              />
            ) : (
              <Text
                color={appColors.primary}
                width="100%"
                textAlign={'center'}
                lineHeight={'3xl'}>
                No Transaction Details
              </Text>
            )}
          </View>
          {renderFloatButtonWithAnimation()}
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...appStyles.flexCount(1),
    position: 'relative',
  },
  cashDetails: {
    backgroundColor: appColors.cashDetailBackground,
    paddingVertical: 10,
    margin: 10,
    ...appStyles.containerBorderRadius(),
    ...appStyles.boxShadow,
  },
  cashDetailRow: {
    ...appStyles.flexRow,

    paddingHorizontal: 20,
  },
  cashDetailRowTotal: {
    ...appStyles.flexRow,
    paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderTopColor: appColors.primary,
  },
  cardContainer: {
    backgroundColor: appColors.cardBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    ...appStyles.containerBorderRadius(),
    ...appStyles.boxShadow,
  },
  cardTitleRow: {
    ...appStyles.flexRow,
    marginBottom: 5,
  },
  cardStatusRow: {
    ...appStyles.flexRow,
    justifyContent: 'flex-start',
  },
  cardAmountRow: {
    ...appStyles.flexRow,
    marginTop: 5,
  },
  transactionButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  animateButton: maxValue => ({
    transform: [
      {
        scale: ANIMATED_Value,
      },
      {
        translateY: ANIMATED_Value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, maxValue],
        }),
      },
    ],
  }),
  FloatingButtonBackground: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: appColors.backgroundWithOpacity,
  },
  animateBackground: {
    transform: [
      {
        scale: ANIMATED_Value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30],
        }),
      },
    ],
  },
});

export default Home;
