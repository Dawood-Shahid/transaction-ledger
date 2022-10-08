import React, {useState, useEffect, useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  Select,
  Actionsheet,
  Icon,
  Image,
  ScrollView,
  Button,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {CalculatorInput} from 'react-native-calculator';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {useForm, Controller} from 'react-hook-form';

import PageContainer from '../PageContainer';
import Header from '../Header';
import ImagesPreviewModal from '../ImagePreviewModal/ImagePreviewModal';
import InputField from '../InputField/InputField';

import {ImagePicker} from '../../core/helper/FileSystemManager';
import {TRANSACTION_TYPE_EXPENSE} from '../../appConstants';
import {CATEGORY, PAYMENT} from '../constants/transactionConstant';
import {Ionicons, MaterialIcons} from '../../assets/vectorIcons';
import appColors from '../../styles/color';
import appStyles from '../../styles/style';

// const keys = {
//   title: 'title',
//   amount: 'amount',
//   transactionDate: 'date',
//   transactionTime: 'time',
//   category: 'category',
//   paymentMethod: 'payment',
//   attachments: 'attachments',
// };

const TransactionDetail = ({
  route,
  // states
  selectedLedger,
  // actions
  addTransaction,
}) => {
  const navigation = useNavigation();
  const navigationProps = route.params;
  const isTransactionExpense =
    navigationProps.type === TRANSACTION_TYPE_EXPENSE;
  const transactionType = isTransactionExpense ? 'Out' : 'In';
  const identity = Date.now().toString();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [toggleActionSheet, setToggleActionSheet] = useState(false);
  const [imageURls, setImageUrls] = useState([]);
  const [showImagesPreviewModal, setShowImagesPreviewModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {control, handleSubmit, setValue, getValues, reset} = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      amount: 0,
      date: identity,
      time: identity,
      category: isTransactionExpense ? 'Labour Changes' : 'Profit',
      payment: 'Cash',
      attachments: [],
    },
  });

  // useLayoutEffect(() => {
  //   if (
  //     navigationProps.hasOwnProperty('title') &&
  //     navigationProps.hasOwnProperty('amount')
  //   ) {
  //     const {
  //       title,
  //       amount,
  //       transactionDate,
  //       transactionTime,
  //       category,
  //       paymentMethod,
  //       attachments,
  //     } = navigationProps;

  //     console.log(
  //       '\n -------- > file: TransactionDetail.js > line 85 > navigationProps',
  //       {
  //         title,
  //         amount: +amount,
  //         transactionDate,
  //         transactionTime,
  //         category,
  //         paymentMethod,
  //         attachments,
  //       },
  //     );
  //     // delete navigationProps.id;
  //     // delete navigationProps.balance;
  //     // delete navigationProps.type;

  //     // for (const key in navigationProps) {
  //     //   console.log(
  //     //     '\n -------- > file: TransactionDetail.js > line 73 > key',
  //     //     key,
  //     //   );
  //     //   setValue(keys[key], key);
  //     // }
  //     console.log(`\nset values\n`, title, +amount);
  //     setValue('title', title);
  //     setValue('amount', +amount);
  //   }
  //   console.log(`\nin use layout\n`, getValues());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // console.log(`\nin use layout\n`, {
  //   t: getValues('title'),
  //   a: getValues('amount'),
  // });
  useEffect(() => {
    return () => {
      console.log(`\nreset run\n`);
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImageHandler = async (camera = true) => {
    const attachments = getValues('attachments');
    let response,
      urls = [];

    setToggleActionSheet(false);

    try {
      response = await ImagePicker(camera);
    } catch (err) {
      return;
    }

    let attachmentsWithId = [...attachments, ...response].map(
      (attachment, index) => {
        urls.push({url: attachment.fileCopyUri});
        return {...attachment, id: index};
      },
    );

    setValue('attachments', attachmentsWithId);
    setImageUrls(urls);
  };

  const removeAttachmentAtIndex = id => {
    const attachments = getValues('attachments');
    let remainingAttachments = attachments.filter(image => image.id !== id);
    setValue('attachments', remainingAttachments);
  };

  const saveHandler = (addNew = false) => {
    const data = getValues();
    const {title, amount, date, time, category, payment, attachments} = data;
    let balance;

    if (isTransactionExpense) {
      balance = selectedLedger.cashIn - selectedLedger.cashOut - amount;
    } else {
      balance = selectedLedger.cashIn - selectedLedger.cashOut + amount;
    }

    const params = {
      id: identity,
      title,
      amount,
      transactionDate: date,
      transactionTime: time,
      category: category.toLowerCase(),
      paymentMethod: payment.toLowerCase(),
      attachments,
      balance,
      type: isTransactionExpense ? 'expense' : 'income',
    };

    addTransaction(params);

    if (!addNew) {
      navigation.goBack();
    }
  };

  return (
    <PageContainer>
      <SafeAreaView style={appStyles.flexCount(1)}>
        <Header title={'Transaction Detail'} />
        <View style={styles.mainContainer}>
          <Text
            color={isTransactionExpense ? appColors.red : appColors.green}
            py={1}
            px={2.5}
            bold
            fontSize={'lg'}>
            Enter Cash {transactionType} Details
          </Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name={'title'}
                render={({field: {onChange, value}}) => {
                  const {title, amount} = getValues();
                  setIsButtonDisabled(!(!!title.length && !!amount));

                  return (
                    <InputField
                      value={value}
                      setValue={onChange}
                      placeholder={'Title'}
                      label={'Title'}
                    />
                  );
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name={'amount'}
                render={({field: {onChange, value}}) => {
                  const {title, amount} = getValues();
                  setIsButtonDisabled(!(!!title.length && !!amount));
                  return (
                    <InputField
                      label={'Amount'}
                      otherInputField={
                        <CalculatorInput
                          hideDisplay={true}
                          value={value}
                          onTextChange={onChange}
                          onBeforeChange={num => {
                            onChange(num);
                            return true;
                          }}
                          modalBackdropStyle={styles.calculatorBackdrop}
                          fieldContainerStyle={
                            styles.calculatorInputFieldContainer
                          }
                          fieldTextStyle={styles.actionSheetText}
                          numericButtonBackgroundColor={appColors.white}
                          numericButtonColor={appColors.black}
                          actionButtonBackgroundColor={appColors.background}
                          actionButtonColor={appColors.primary}
                          calcButtonBackgroundColor={appColors.primary}
                          acceptButtonBackgroundColor={appColors.primary}
                        />
                      }
                    />
                  );
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <View style={appStyles.flexRow}>
                <View style={appStyles.flexCount(0.49)}>
                  <Controller
                    control={control}
                    name={'date'}
                    render={({field: {value}}) => (
                      <InputField
                        label={'Date'}
                        otherInputField={
                          <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.uploadImageContainer}
                            onPress={() => setShowDatePicker(true)}>
                            <Text color={appColors.black}>
                              {format(
                                new Date(parseInt(value, 10)),
                                'MMM, dd yyyy',
                              )}
                            </Text>
                            <Icon
                              as={Ionicons}
                              name={'ios-calendar'}
                              size={'4'}
                              color={appColors.inputIconColor}
                            />
                          </TouchableOpacity>
                        }
                      />
                    )}
                  />
                </View>
                <View style={appStyles.flexCount(0.49)}>
                  <Controller
                    control={control}
                    name={'time'}
                    render={({field: {value}}) => (
                      <InputField
                        label={'Time'}
                        otherInputField={
                          <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.uploadImageContainer}
                            onPress={() => setShowTimePicker(true)}>
                            <Text color={appColors.black}>
                              {format(new Date(parseInt(value, 10)), 'hh:mm a')}
                            </Text>
                            <Icon
                              as={Ionicons}
                              name={'time-outline'}
                              size={'5'}
                              color={appColors.inputIconColor}
                            />
                          </TouchableOpacity>
                        }
                      />
                    )}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name={'category'}
                render={({field: {onChange, value}}) => (
                  <InputField
                    label={'Category'}
                    otherInputField={
                      <Select
                        color={appColors.black}
                        textTransform={'capitalize'}
                        size={'lg'}
                        selectedValue={value}
                        onValueChange={onChange}
                        variant={'unstyled'}
                        mx={1}>
                        {CATEGORY.map((item, index) => (
                          <Select.Item key={index} label={item} value={item} />
                        ))}
                      </Select>
                    }
                  />
                )}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name={'payment'}
                render={({field: {onChange, value}}) => (
                  <InputField
                    label={'Payment Method'}
                    otherInputField={
                      <Select
                        color={appColors.black}
                        size={'lg'}
                        selectedValue={value}
                        onValueChange={onChange}
                        variant="unstyled"
                        mx={1}>
                        {PAYMENT.map((item, index) => (
                          <Select.Item key={index} label={item} value={item} />
                        ))}
                      </Select>
                    }
                  />
                )}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name={'attachments'}
                render={() => (
                  <InputField
                    label={'Image(s)'}
                    otherInputField={
                      <TouchableOpacity
                        style={styles.uploadImageContainer}
                        activeOpacity={0.7}
                        onPress={() => setToggleActionSheet(true)}>
                        <Text color={appColors.black} fontSize={'md'}>
                          Upload Image(s)
                        </Text>
                        <Icon
                          as={Ionicons}
                          name={'chevron-down-sharp'}
                          size={'5'}
                          color={appColors.inputIconColor}
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />
            </View>
            <View style={styles.imageContainer}>
              <Controller
                control={control}
                name={'attachments'}
                render={({field: {value}}) =>
                  value.map((image, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => {
                        setCurrentImageIndex(index);
                        setShowImagesPreviewModal(true);
                      }}>
                      <View style={styles.imageWrapper}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => removeAttachmentAtIndex(image.id)}
                          style={styles.cancelIconContainer}>
                          <View style={styles.iconColor} />
                          <Icon
                            as={MaterialIcons}
                            name="cancel"
                            size={4}
                            color={appColors.primary}
                          />
                        </TouchableOpacity>
                        <Image
                          style={styles.image}
                          source={{
                            uri: image?.fileCopyUri,
                          }}
                          alt="Alternate Text"
                        />
                      </View>
                    </TouchableOpacity>
                  ))
                }
              />
            </View>
          </ScrollView>
          {showDatePicker && (
            <Controller
              control={control}
              name={'date'}
              render={({field: {onChange, value}}) => (
                <DateTimePicker
                  value={new Date(parseInt(value, 10))}
                  mode={'date'}
                  is24Hour={true}
                  onChange={event => {
                    const {nativeEvent, type} = event;
                    setShowDatePicker(false);
                    if (type === 'set') {
                      onChange(nativeEvent.timestamp.toString());
                    }
                  }}
                />
              )}
            />
          )}
          {showTimePicker && (
            <Controller
              control={control}
              name={'time'}
              render={({field: {onChange, value}}) => (
                <DateTimePicker
                  value={new Date(parseInt(value, 10))}
                  mode={'time'}
                  is24Hour={false}
                  onChange={event => {
                    const {nativeEvent, type} = event;
                    setShowTimePicker(false);
                    if (type === 'set') {
                      onChange(nativeEvent.timestamp.toString());
                    }
                  }}
                />
              )}
            />
          )}
          {toggleActionSheet && (
            <Actionsheet
              isOpen={toggleActionSheet}
              onClose={() => setToggleActionSheet(false)}>
              <Actionsheet.Content>
                <Actionsheet.Item
                  _text={styles.actionSheetText}
                  startIcon={
                    <Icon
                      as={Ionicons}
                      name={'camera-outline'}
                      size={'5'}
                      color={appColors.inputIconColor}
                    />
                  }
                  onPress={() => uploadImageHandler(true)}>
                  Camera
                </Actionsheet.Item>
                <Actionsheet.Item
                  _text={styles.actionSheetText}
                  startIcon={
                    <Icon
                      as={Ionicons}
                      name={'md-images'}
                      size={'5'}
                      color={appColors.inputIconColor}
                    />
                  }
                  onPress={() => uploadImageHandler(false)}>
                  Gallery
                </Actionsheet.Item>
              </Actionsheet.Content>
            </Actionsheet>
          )}
          {showImagesPreviewModal && (
            <View>
              <ImagesPreviewModal
                modalVisible={showImagesPreviewModal}
                setModalVisible={setShowImagesPreviewModal}
                imageUrls={imageURls}
                selectedImageIndex={currentImageIndex}
              />
            </View>
          )}
          <View style={styles.btnContainer}>
            <Button
              style={[
                appStyles.button(appColors.white, appColors.primary),
                appStyles.containerBorderRadius(),
              ]}
              _text={appStyles.buttonText(appColors.primary)}
              isDisabled={isButtonDisabled}
              onPress={() => handleSubmit(saveHandler(true))}>
              Save & Add
            </Button>
            <View style={styles.buttonSeparator} />
            <Button
              style={[appStyles.button(), appStyles.containerBorderRadius()]}
              _text={appStyles.buttonText()}
              isDisabled={isButtonDisabled}
              onPress={() => handleSubmit(saveHandler())}>
              Save
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...appStyles.flexCount(1),
    paddingTop: 10,
    position: 'relative',
  },
  scrollContainer: {paddingHorizontal: 10},
  inputWrapper: {marginTop: 10},
  calculatorInputFieldContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 6,
  },
  uploadImageContainer: {
    paddingLeft: 17,
    paddingRight: 8,
    paddingVertical: 12,
    ...appStyles.flexRow,
  },
  actionSheetText: {color: appColors.black},
  imageContainer: {
    ...appStyles.flexCount(1),
    marginVertical: 5,
    width: 346,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    margin: 2,
    borderWidth: 0.75,
    borderColor: appColors.primary,
    ...appStyles.containerBorderRadius(),
    height: 65,
    width: 65,
  },
  image: {
    height: 65,
    width: 65,
  },
  cancelIconContainer: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
  iconColor: {
    height: 10,
    width: 10,
    position: 'absolute',
    zIndex: -1,
    backgroundColor: appColors.white,
    borderRadius: 100,
  },
  buttonSeparator: {borderColor: appColors.white, borderWidth: 0.25},
  calculatorBackdrop: {
    backgroundColor: appColors.white,
    position: 'absolute',
    bottom: 0,
  },
  btnContainer: {
    ...appStyles.flexRow,
    padding: 10,
  },
});

export default TransactionDetail;
