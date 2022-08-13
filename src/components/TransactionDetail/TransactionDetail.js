import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  Select,
  Actionsheet,
  Icon,
  Image,
  ScrollView,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {CalculatorInput} from 'react-native-calculator';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

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
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(identity);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(identity);
  const [category, setCategory] = useState(
    isTransactionExpense ? 'Labour Changes' : 'Profit',
  );
  const [payment, setPayment] = useState('Cash');
  const [toggleActionSheet, setToggleActionSheet] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [imageURls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let urls = attachments.map(attachment => {
      return {url: attachment.fileCopyUri};
    });
    setImageUrls(urls);
  }, [attachments]);

  const uploadImageHandler = async (camera = true) => {
    setToggleActionSheet(false);
    let response;
    try {
      response = await ImagePicker(camera);
    } catch (err) {
      return;
    }
    let attachmentsWithId = [...attachments, ...response].map(
      (attachment, index) => ({...attachment, id: index}),
    );
    setAttachments(attachmentsWithId);
  };

  const saveHandler = (addNew = false) => {
    let balance;

    if (isTransactionExpense) {
      balance = selectedLedger.cashIn - selectedLedger.cashOut - amount;
    } else {
      balance = selectedLedger.cashIn - selectedLedger.cashOut + amount;
    }

    const data = {
      id: identity,
      title,
      amount,
      date,
      time,
      category,
      paymentMethod: payment,
      attachments,
      balance,
      type: isTransactionExpense ? 'expense' : 'income',
    };

    addTransaction(data);

    setTitle('');
    setAmount(0);
    setDate(identity);
    setTime(identity);
    setCategory(isTransactionExpense ? 'Labour Changes' : 'Profit');
    setPayment('Cash');
    setAttachments([]);
    setImageUrls([]);
    setCurrentImageIndex(0);

    if (!addNew) {
      navigation.goBack();
    }
  };

  const removeAtIndex = id => {
    let remainingAttachments = attachments.filter(image => image.id !== id);
    setAttachments(remainingAttachments);
  };

  return (
    <PageContainer>
      <SafeAreaView style={appStyles.flexCount(1)}>
        <Header title={'Transaction Detail'} />
        <View style={styles.mainContainer}>
          <ScrollView>
            <Text
              color={isTransactionExpense ? appColors.red : appColors.green}
              py={1}
              bold
              fontSize={'lg'}>
              Enter Cash {transactionType} Details
            </Text>
            <View style={styles.inputWrapper}>
              <InputField
                value={title}
                setValue={setTitle}
                placeholder={'Title'}
                title={'Title'}
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputField
                label={'Amount'}
                otherInputField={
                  <CalculatorInput
                    hideDisplay={true}
                    value={amount}
                    onTextChange={value => setAmount(value)}
                    onBeforeChange={value => {
                      setAmount(value);
                      return true;
                    }}
                    modalBackdropStyle={styles.calculatorBackdrop}
                    fieldContainerStyle={styles.calculatorInputFieldContainer}
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
            </View>
            <View style={styles.inputWrapper}>
              <View style={appStyles.flexRow}>
                <View style={appStyles.flexCount(0.49)}>
                  <InputField
                    label={'Date'}
                    otherInputField={
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.uploadImageContainer}
                        onPress={() => setShowDatePicker(true)}>
                        <Text color={appColors.black}>
                          {format(new Date(parseInt(date, 10)), 'MMM, dd yyyy')}
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
                </View>
                <View style={appStyles.flexCount(0.49)}>
                  <InputField
                    label={'Time'}
                    otherInputField={
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.uploadImageContainer}
                        onPress={() => setShowTimePicker(true)}>
                        <Text color={appColors.black}>
                          {format(new Date(parseInt(time, 10)), 'hh:mm a')}
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
                </View>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <InputField
                label={'Category'}
                otherInputField={
                  <Select
                    placeholder="Choose Service"
                    placeholderTextColor={appColors.black}
                    color={appColors.black}
                    size={'lg'}
                    selectedValue={category}
                    onValueChange={item => setCategory(item)}
                    variant="unstyled"
                    mx={1}>
                    {CATEGORY.map((item, index) => (
                      <Select.Item key={index} label={item} value={item} />
                    ))}
                  </Select>
                }
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputField
                label={'Payment Method'}
                otherInputField={
                  <Select
                    placeholder="Choose Payment Method"
                    placeholderTextColor={appColors.black}
                    color={appColors.black}
                    size={'lg'}
                    selectedValue={payment}
                    onValueChange={item => setPayment(item)}
                    variant="unstyled"
                    mx={1}>
                    {PAYMENT.map((item, index) => (
                      <Select.Item key={index} label={item} value={item} />
                    ))}
                  </Select>
                }
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputField
                label={'Image(s)'}
                otherInputField={
                  <>
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
                  </>
                }
              />
            </View>
            <View style={styles.imageContainer}>
              {attachments.map((image, index) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() => {
                    setCurrentImageIndex(index);
                    setModalVisible(true);
                  }}>
                  <View style={styles.imageWrapper}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => removeAtIndex(image.id)}
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
              ))}
            </View>
          </ScrollView>
          {modalVisible && (
            <View>
              <ImagesPreviewModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                imageUrls={imageURls}
                selectedImageIndex={currentImageIndex}
              />
            </View>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={new Date(parseInt(date, 10))}
              mode={'date'}
              is24Hour={true}
              onChange={event => {
                const {nativeEvent, type} = event;
                setShowDatePicker(false);
                if (type === 'set') {
                  setDate(nativeEvent.timestamp.toString());
                }
              }}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={new Date(parseInt(time, 10))}
              mode={'time'}
              is24Hour={false}
              onChange={event => {
                const {nativeEvent, type} = event;
                setShowTimePicker(false);
                if (type === 'set') {
                  setTime(nativeEvent.timestamp.toString());
                }
              }}
            />
          )}
          <View style={{...appStyles.flexRow}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => saveHandler(true)}
              style={styles.button()}>
              <Text
                color={appColors.white}
                textTransform={'uppercase'}
                textAlign={'center'}>
                Save & Add
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonSeparator} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => saveHandler()}
              style={styles.button(true)}>
              <Text
                color={appColors.white}
                textTransform={'uppercase'}
                textAlign={'center'}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...appStyles.flexCount(1),
    padding: 10,
    position: 'relative',
  },
  inputWrapper: {marginTop: 15},
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
  button: (right = false) => ({
    backgroundColor: appColors.primary,
    paddingVertical: 12,
    width: '50%',
    ...(right
      ? {
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }
      : {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        }),
  }),
  buttonSeparator: {borderColor: appColors.white, borderWidth: 0.25},
  calculatorBackdrop: {
    backgroundColor: appColors.white,
    position: 'absolute',
    bottom: 0,
  },
});

export default TransactionDetail;
