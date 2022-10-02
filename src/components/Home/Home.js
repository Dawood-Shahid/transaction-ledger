import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {View, Text, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

import PageContainer from '../PageContainer';
import Header from '../Header';
import FloatButton from '../FloatButton';
import BottomActionSheetModal from '../BottomActionSheetModal';

import {
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
  AntDesign,
} from '../../assets/vectorIcons';
import StatusTags from '../StatusTags';
import {TRANSACTION_TYPE_EXPENSE} from '../../appConstants';
import {numberFormatter} from '../../core/helper/HelperFunctions';
import appColors from '../../styles/color';
import appStyles from '../../styles/style';

const ANIMATED_Value = new Animated.Value(0);

const Home = ({
  // state
  selectedLedger,
  transactionList,
  // action
  setSelectedLedger,
}) => {
  // const selectedLedger = {
  //   id: '1660387506918',
  //   title: 'North Town phase II, block 1, Ext-2201',
  //   createdAt: '1660387506918',
  //   cashIn: 80000,
  //   cashOut: 45000,
  //   isDeleted: 0,
  // };
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);
  const [toggleViewTransactionModal, setToggleViewTransactionModal] =
    useState(false);

  useEffect(() => {
    return () => {
      setSelectedLedger({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Text color={appColors.white} mx={2} bold>
          Ledgers
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
          <Text color={appColors.text} fontSize={'md'} bold lineHeight={'2xl'}>
            Cash In
          </Text>
          <Text color={appColors.green} fontSize={'md'} bold lineHeight={'2xl'}>
            {numberFormatter(selectedLedger.cashIn)}
          </Text>
        </View>
        <View style={styles.cashDetailRow}>
          <Text color={appColors.text} fontSize={'md'} bold lineHeight={'2xl'}>
            Cash Out
          </Text>
          <Text color={appColors.red} fontSize={'md'} bold lineHeight={'2xl'}>
            {numberFormatter(selectedLedger.cashOut)}
          </Text>
        </View>
        <View style={styles.cashDetailRowTotal}>
          <Text
            color={appColors.primary}
            bold
            fontSize={'lg'}
            lineHeight={'xl'}>
            Net Balance
          </Text>
          <Text
            color={appColors.primary}
            bold
            fontSize={'lg'}
            lineHeight={'xl'}>
            {numberFormatter(selectedLedger.cashIn - selectedLedger.cashOut)}
          </Text>
        </View>
      </View>
    );
  };

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setToggleViewTransactionModal(true)}
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
              {format(
                new Date(parseInt(item.transactionDate, 10)),
                'MMM, dd yyyy',
              )}
            </Text>
          </View>
          <View style={appStyles.flexRow}>
            <View my={0.5} style={styles.cardStatusRow}>
              <Icon
                as={Entypo}
                name={'attachment'}
                size={'3'}
                color={appColors.black}
                style={styles.attachmentIcon}
              />
              <Text color={appColors.text}>
                Attachment{item.attachments.length > 1 && 's'}
              </Text>
            </View>
            <Text color={appColors.text} fontSize={'xs'} mr={3}>
              {format(new Date(parseInt(item.transactionTime, 10)), 'hh:mm a')}
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
            <Text color={appColors.white} mx={3} mt={2} bold noOfLines={1}>
              {selectedLedger.title}
            </Text>
            {renderCashDetailCard()}
            <View style={[appStyles.flexCount(1), styles.listWrapper]}>
              {true ? (
                <VirtualizedList
                  data={transactionList}
                  renderItem={renderCard}
                  contentContainerStyle={styles.listStyle}
                  keyExtractor={(item, index) => `${item.text}-${index}`}
                  getItemCount={() => transactionList.length}
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
        <BottomActionSheetModal
          showModal={toggleViewTransactionModal}
          setShowModal={setToggleViewTransactionModal}
        />
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
    borderTopWidth: 0.75,
    borderTopColor: appColors.primary,
  },
  listStyle: {
    paddingVertical: 5,
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
    alignItems: 'flex-end',
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
