import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  Input,
  Select,
  Actionsheet,
  Icon,
  Image,
  ScrollView,
} from 'native-base';
import appStyles from '../../style';
import Header from '../Header';
import PageContainer from '../PageContainer';
import appColors from '../../color';
import {TRANSACTION_TYPE_EXPENSE} from '../../appConstants';
import {CalculatorInput} from 'react-native-calculator';
import {useNavigation} from '@react-navigation/native';
import {Ionicons, MaterialIcons} from '../Icons';
import {CATEGORY, PAYMENT} from '../constants/transactionConstant';
import {ImagePicker} from '../../appConstants';
import ImagesPreviewModal from '../ImagePreviewModal/ImagePreviewModal';

const TransactionDetail = ({route}) => {
  const navigation = useNavigation();
  const navigationProps = route.params;
  const transactionType =
    navigationProps.type === TRANSACTION_TYPE_EXPENSE ? 'Out' : 'In';
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(
    navigationProps.type === TRANSACTION_TYPE_EXPENSE
      ? 'Labour Changes'
      : 'Profit',
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
    setAmount(0);
    setDescription('');
    setCategory(
      navigationProps.type === TRANSACTION_TYPE_EXPENSE
        ? 'Labour Changes'
        : 'Profit',
    );
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
              color={
                navigationProps.type === TRANSACTION_TYPE_EXPENSE
                  ? appColors.red
                  : appColors.green
              }
              py={1}
              bold
              fontSize={'lg'}>
              Enter Cash {transactionType} Details
            </Text>
            <View style={styles.inputWrapper}>
              <Text color={appColors.primary} py={1} bold>
                Amount
              </Text>
              <View style={styles.inputContainer}>
                <CalculatorInput
                  hideDisplay={true}
                  value={amount}
                  onTextChange={text => setAmount(text)}
                  modalBackdropStyle={{
                    backgroundColor: appColors.transparent,
                  }}
                  fieldContainerStyle={styles.calculatorInputFieldContainer}
                  fieldTextStyle={{color: appColors.primary}}
                  fontSize={22}
                  numericButtonBackgroundColor={appColors.white}
                  numericButtonColor={appColors.black}
                  actionButtonBackgroundColor={appColors.inputBackground}
                  actionButtonColor={appColors.background}
                  calcButtonBackgroundColor={appColors.primary}
                  acceptButtonBackgroundColor={appColors.primary}
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text color={appColors.primary} py={1} bold>
                Details
              </Text>
              <View style={[styles.inputContainer, styles.inputHeight]}>
                <Input
                  value={description}
                  onChangeText={text => setDescription(text)}
                  size="lg"
                  variant="unstyled"
                  mx={2}
                  placeholder="Description"
                  placeholderTextColor={appColors.primary}
                  color={appColors.primary}
                  multiline={true}
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text color={appColors.primary} py={1} bold>
                Category
              </Text>
              <View style={styles.inputContainer}>
                <Select
                  placeholder="Choose Service"
                  placeholderTextColor={appColors.primary}
                  color={appColors.primary}
                  size={'lg'}
                  selectedValue={category}
                  onValueChange={item => setCategory(item)}
                  variant="unstyled"
                  mx={1}>
                  {CATEGORY.map((item, index) => (
                    <Select.Item key={index} label={item} value={item} />
                  ))}
                </Select>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text color={appColors.primary} py={1} bold>
                Payment Method
              </Text>
              <View style={styles.inputContainer}>
                <Select
                  placeholder="Choose Payment Method"
                  placeholderTextColor={appColors.primary}
                  color={appColors.primary}
                  size={'lg'}
                  selectedValue={payment}
                  onValueChange={item => setPayment(item)}
                  variant="unstyled"
                  mx={1}>
                  {PAYMENT.map((item, index) => (
                    <Select.Item key={index} label={item} value={item} />
                  ))}
                </Select>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text color={appColors.primary} py={1} bold>
                Image(s)
              </Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.uploadImageContainer}
                  activeOpacity={1}
                  onPress={() => setToggleActionSheet(true)}>
                  <Text color={appColors.primary} fontSize={'md'}>
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
              </View>
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
                        style={styles.cancelIcon}
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
          <View style={{...appStyles.flexRow}}>
            <TouchableOpacity
              activeOpacity={0.9}
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
              activeOpacity={0.9}
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
  inputContainer: {
    backgroundColor: appColors.inputBackground,
    marginTop: 5,
    ...appStyles.containerBorderRadius(),
  },
  inputHeight: {height: 100},
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
  actionSheetText: {color: appColors.primary},
  imageContainer: {
    ...appStyles.flexCount(1),
    marginVertical: 5,
    paddingVertical: 3,
    paddingHorizontal: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    margin: 2,
    borderWidth: 1,
    borderColor: appColors.primary,
    ...appStyles.containerBorderRadius(),
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
  cancelIcon: {
    color: appColors.primary,
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
});

export default TransactionDetail;
