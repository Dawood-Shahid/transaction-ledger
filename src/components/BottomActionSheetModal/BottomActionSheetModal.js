import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {Text, View, Image, Icon, Button} from 'native-base';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import StatusTags from '../StatusTags';

import {Entypo, Ionicons} from '../../assets/vectorIcons';
import {numberFormatter} from '../../core/helper/HelperFunctions';
import {TRANSACTION_TYPE_EXPENSE} from '../../appConstants';
import appStyles from '../../styles/style';
import appColors from '../../styles/color';
import ImagesPreviewModal from '../ImagePreviewModal/ImagePreviewModal';

export const BottomActionSheetModal = ({
  // state
  selectedTransaction: data,
  showModal,
  // action
  setShowModal,
  deleteTransaction,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageURls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let urls = data.attachments.map(attachment => {
      return {url: attachment.fileCopyUri};
    });
    setImageUrls(urls);
  }, [data]);

  const onEdit = () => {
    navigation.navigate('TransactionDetail', {...data});
    setShowModal(false);
  };

  const onDelete = () => {
    deleteTransaction(data);
    setShowModal(false);
  };

  return (
    <Modal animationType={'slide'} transparent={true} visible={showModal}>
      <TouchableOpacity style={styles.modal} activeOpacity={1}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text py={1} bold fontSize={'lg'}>
              View Transaction
            </Text>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              activeOpacity={0.9}
              onPress={() => setShowModal(false)}>
              <Icon
                as={Ionicons}
                name="close-sharp"
                size={5}
                color={appColors.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <View
                style={styles.statusBar(
                  data.type === TRANSACTION_TYPE_EXPENSE
                    ? appColors.red
                    : appColors.green,
                )}
              />
              <View my={1} style={styles.bodyContentContainer}>
                <View style={appStyles.flexRow}>
                  <Text fontSize={'md'}>Transaction on</Text>
                  <Text fontSize={'md'}>
                    {`${format(
                      new Date(parseInt(data.transactionDate, 10)),
                      'MMM, dd yyyy',
                    )} | ${format(
                      new Date(parseInt(data.transactionTime, 10)),
                      'hh:mm a',
                    )}`}
                  </Text>
                </View>
                <Text my={1} fontSize={'lg'}>
                  {data.title}
                </Text>
                <View my={1} style={appStyles.flexRow}>
                  <Text fontSize={'md'}>{numberFormatter(data.balance)}</Text>
                  <Text
                    fontSize={'md'}
                    bold
                    color={
                      data.type === TRANSACTION_TYPE_EXPENSE
                        ? appColors.red
                        : appColors.green
                    }>
                    {numberFormatter(data.amount)}
                  </Text>
                </View>
                <View style={styles.contentContainerRow}>
                  <StatusTags
                    text={data.paymentMethod}
                    color={appColors.paymentMethodText}
                    background={appColors.paymentMethodBackground}
                  />
                  {data.category && (
                    <StatusTags
                      text={data.category}
                      color={appColors.categoryText}
                      background={appColors.categoryBackground}
                    />
                  )}
                </View>
                <View my={0.5} style={styles.contentContainerRow}>
                  <Icon
                    as={Entypo}
                    name={'attachment'}
                    size={'3'}
                    color={appColors.black}
                    style={styles.attachmentIcon}
                  />
                  <Text color={appColors.text} fontSize={'md'}>
                    Attachment{data.attachments.length > 1 && 's'}
                  </Text>
                </View>
                <View style={styles.imageContainer}>
                  {data.attachments.map((image, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => {
                        setCurrentImageIndex(index);
                        setModalVisible(true);
                      }}>
                      <View style={styles.imageWrapper}>
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
              </View>
            </View>
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
            <View style={styles.btnContainer}>
              <Button
                style={[
                  appStyles.button(appColors.white, appColors.red),
                  appStyles.containerBorderRadius(),
                ]}
                _text={appStyles.buttonText(appColors.red)}
                onPress={onDelete}>
                Delete
              </Button>
              <Button
                style={[appStyles.button(), appStyles.containerBorderRadius()]}
                _text={appStyles.buttonText()}
                onPress={onEdit}>
                Edit
              </Button>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    ...appStyles.flexCount(1),
    justifyContent: 'flex-end',
    backgroundColor: appColors.backgroundWithOpacity,
  },
  modalContainer: {
    ...appStyles.flexCount(0.79),
    backgroundColor: appColors.white,
    ...appStyles.containerBorderRadius(),
    overflow: 'hidden',
  },
  modalHeader: {
    ...appStyles.flexRow,
    backgroundColor: appColors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  body: {
    ...appStyles.flexCount(1),
    padding: 10,
  },
  bodyContent: {
    ...appStyles.flexCount(1),
    ...appStyles.boxShadow,
    backgroundColor: appColors.white,
    overflow: 'hidden',
    ...appStyles.containerBorderRadius(),
    marginBottom: 10,
  },
  statusBar: color => ({
    backgroundColor: color,
    width: '100%',
    height: 10,
  }),
  bodyContentContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },
  contentContainerRow: {
    ...appStyles.flexRow,
    justifyContent: 'flex-start',
  },
  attachmentIcon: {
    height: 13,
    fontSize: 10,
  },
  imageContainer: {
    ...appStyles.flexCount(1),
    marginVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  btnContainer: {
    ...appStyles.flexRow,
  },
});
