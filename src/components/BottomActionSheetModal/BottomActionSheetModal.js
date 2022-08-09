import React from 'react';
import {StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {Text, View, Image, Icon} from 'native-base';

import StatusTags from '../StatusTags';

import {Entypo, Ionicons} from '../../assets/vectorIcons';
import {numberFormatter} from '../../core/helper/HelperFunctions';
import {TRANSACTION_TYPE_EXPENSE} from '../../appConstants';
import appStyles from '../../styles/style';
import appColors from '../../styles/color';

export const BottomActionSheetModal = ({
  showModal,
  setShowModal,
  heading,
  message,
  onCancel,
  onSubmit,
  showTopCancelbutton = false,
  topCancelbutton,
  customButtons = false,
}) => {
  const data = {
    id: 1,
    title: 'Monthly Income',
    transactionDate: '08-08-2022',
    transactionTime: '10:00 AM',
    category: 'Salary',
    paymentMethod: 'Online',
    balance: '80000',
    amount: '65000',
    type: 'income',
    attachments: [
      {
        fileCopyUri:
          'file:///data/user/0/com.transection_leasure/cache/8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        fileName:
          'rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        fileSize: 43486,
        height: 894,
        id: 0,
        name: '8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        size: 50534,
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.transection_leasure/cache/rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        width: 720,
      },
      {
        fileCopyUri:
          'file:///data/user/0/com.transection_leasure/cache/8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        fileName:
          'rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        fileSize: 43486,
        height: 894,
        id: 1,
        name: '8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        size: 50534,
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.transection_leasure/cache/rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        width: 720,
      },
      {
        fileCopyUri:
          'file:///data/user/0/com.transection_leasure/cache/8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        fileName:
          'rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        fileSize: 43486,
        height: 894,
        id: 2,
        name: '8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        size: 50534,
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.transection_leasure/cache/rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        width: 720,
      },
      {
        fileCopyUri:
          'file:///data/user/0/com.transection_leasure/cache/8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        fileName:
          'rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        fileSize: 43486,
        height: 894,
        id: 0,
        name: '8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        size: 50534,
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.transection_leasure/cache/rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        width: 720,
      },
      {
        fileCopyUri:
          'file:///data/user/0/com.transection_leasure/cache/8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        fileName:
          'rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        fileSize: 43486,
        height: 894,
        id: 1,
        name: '8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        size: 50534,
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.transection_leasure/cache/rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        width: 720,
      },
      {
        fileCopyUri:
          'file:///data/user/0/com.transection_leasure/cache/8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        fileName:
          'rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        fileSize: 43486,
        height: 894,
        id: 2,
        name: '8ead2b70-270f-4f9e-90df-732edb6b128d.JPEG',
        size: 50534,
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.transection_leasure/cache/rn_image_picker_lib_temp_677b29a2-bfa3-439f-87a1-6149de9b50bf.jpg',
        width: 720,
      },
    ],
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
                    {data.transactionDate}, {data.transactionTime}
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
                        console.log(`\nImage tap\n`);
                        // setCurrentImageIndex(index);
                        // setModalVisible(true);
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
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => console.log(`\nEdit transaction\n`)}
              style={styles.button}>
              <Text
                color={appColors.white}
                textTransform={'uppercase'}
                textAlign={'center'}>
                Edit
              </Text>
            </TouchableOpacity>
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
    width: '100%',
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
  button: {
    backgroundColor: appColors.primary,
    paddingVertical: 12,
    ...appStyles.containerBorderRadius(100),
  },
  // heading: {
  //   marginBottom: 10,
  // },
  // whiteText: {color: appColors.white, textAlign: 'center'},
  // // Button
  // buttonsContainer: {
  //   flexDirection: 'row',
  //   borderTopWidth: 0.5,
  //   borderTopColor: appColors.lightGray,
  //   marginTop: 26,
  // },
  // button: {flex: 1, justifyContent: 'center'},
  // fullWidth: {flex: 1},
  // leftButton: {
  //   borderRightWidth: 0.5,
  //   borderRightColor: appColors.lightGray,
  // },
});
