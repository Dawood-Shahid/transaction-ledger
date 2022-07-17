import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {View, Text, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import PageContainer from '../PageContainer';
import Header from '../Header';
import FloatButton from '../FloatButton';
import {
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
  AntDesign,
} from '../../assets/Icons';
import {TRANSACTION_DATA} from '../constants/transactionConstant';
import StatusTags from '../StatusTags';
import {numberFormatter, TRANSACTION_TYPE_EXPENSE} from '../../appConstants';
import appColors from '../../color';
import appStyles from '../../style';

const ANIMATED_Value = new Animated.Value(0);

const Home = ({route}) => {
  const navigation = useNavigation();
  const navigationProps = route.params;
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

  const navigationHandler = (navigateTo, params) => {
    navigation.navigate(navigateTo, params);
    toggleAnimationHandler();
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
        <Text
          color={appColors.white}
          ml={2}
          bold
          numberOfLines={1}
          maxWidth={130}>
          {navigationProps.type}
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
            {numberFormatter('50000')}
          </Text>
        </View>
        <View style={styles.cashDetailRow}>
          <Text color={appColors.text} bold lineHeight={'2xl'}>
            Cash Out
          </Text>
          <Text color={appColors.red} bold lineHeight={'2xl'}>
            {numberFormatter('15000')}
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
            {numberFormatter('35000')}
          </Text>
        </View>
      </View>
    );
  };

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ViewTransaction')}
        style={styles.cardContainer}>
        <View style={styles.sidebar} />
        <View style={styles.cardContentContainer}>
          <View mb={1} style={styles.cardTitleRow}>
            <Text noOfLines={1} bold color={appColors.primary} width={270}>
              {item.title}
            </Text>
            <View
              style={styles.cardStatus(
                item.type === TRANSACTION_TYPE_EXPENSE
                  ? appColors.red
                  : appColors.green,
              )}>
              <Text
                fontSize={'sm'}
                bold
                textTransform={'capitalize'}
                color={appColors.white}>
                {item.type}
              </Text>
            </View>
          </View>
          <View style={appStyles.flexRow}>
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
            <Text color={appColors.text} fontSize={'xs'} mr={3}>
              {item.createdAt}
            </Text>
          </View>
          <View my={0.5} style={styles.cardStatusRow}>
            <Icon
              as={Entypo}
              name={'attachment'}
              size={'3'}
              color={appColors.black}
              style={styles.attachmentIcon}
            />
            <Text color={appColors.text}>
              Attachment{item.attachment.length > 1 && 's'}
            </Text>
          </View>
          <View style={styles.cardAmountRow}>
            <Text fontSize={'xs'} color={appColors.text}>
              Balance: {numberFormatter(item.balance)}
            </Text>
            <Text
              color={
                item.type === TRANSACTION_TYPE_EXPENSE
                  ? appColors.red
                  : appColors.green
              }
              bold
              mr={3}>
              {numberFormatter(item.amount)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFloatButtonWithAnimation = () => {
    return (
      <>
        <Animated.View
          style={[styles.FloatingButtonBackground, styles.animateBackground]}
        />
        {toggle && (
          <>
            <Animated.View
              style={[styles.transactionButton, styles.animateButton(-120)]}>
              <FloatButton
                position={{bottom: 0, right: 0}}
                onClick={() =>
                  navigationHandler('TransactionDetail', {type: 'expense'})
                }
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
                onClick={() =>
                  navigationHandler('TransactionDetail', {type: 'income'})
                }
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
          </>
        )}
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
      <SafeAreaView style={appStyles.flexCount(1)}>
        <Header leftIcon={renderLeftIcon} />
        <View style={styles.mainContainer}>
          <View style={[appStyles.flexCount(1), styles.contentContainer]}>
            {renderCashDetailCard()}
            <View style={[appStyles.flexCount(1), styles.listWrapper]}>
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
  contentContainer: {
    backgroundColor: appColors.primary,
    marginTop: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  listWrapper: {
    backgroundColor: appColors.background,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cashDetails: {
    backgroundColor: appColors.secondary,
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
    ...appStyles.flexRow,
    justifyContent: 'flex-start',
    backgroundColor: appColors.white,
    marginVertical: 5,
    marginHorizontal: 10,
    ...appStyles.containerBorderRadius(),
    ...appStyles.boxShadow,
    overflow: 'hidden',
  },
  sidebar: {
    backgroundColor: appColors.primary,
    width: 10,
    height: '100%',
  },
  cardContentContainer: {
    ...appStyles.flexCount(1),
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 0,
  },
  cardTitleRow: {
    ...appStyles.flexRow,
    marginBottom: 5,
  },
  cardStatus: bg => ({
    backgroundColor: bg,
    height: 28,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
  }),
  cardStatusRow: {
    ...appStyles.flexRow,
    justifyContent: 'flex-start',
  },
  attachmentIcon: {height: 13, fontSize: 10},
  cardAmountRow: {
    ...appStyles.flexRow,
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
          outputRange: [0, 100],
        }),
      },
    ],
  },
});

export default Home;
