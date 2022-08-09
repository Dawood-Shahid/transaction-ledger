import React, {useState} from 'react';
import {Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Text, View} from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';

import {Feather} from '../../assets/vectorIcons';
import appColors from '../../styles/color';
import appStyles from '../../styles/style';

const ImagesPreviewModal = ({
  modalVisible,
  setModalVisible,
  imageUrls,
  selectedImageIndex,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    selectedImageIndex + 1,
  );

  const _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Icon
              as={Feather}
              name={'arrow-left'}
              size={'5'}
              color={appColors.white}
            />
          </TouchableOpacity>
        </View>
        <RenderIndicator />
      </View>
    );
  };

  const RenderIndicator = () => {
    return (
      imageUrls.length > 1 && (
        <View style={styles.indicatorContainer}>
          <Text
            color={appColors.white}
            fontSize={'lg'}
            textAlign={'center'}
            bold>
            {currentImageIndex}/{imageUrls.length}
          </Text>
        </View>
      )
    );
  };

  return (
    <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.container}>
        <View style={appStyles.flexCount(1)}>
          <ImageViewer
            imageUrls={imageUrls}
            onChange={number => setCurrentImageIndex(number + 1)}
            enableSwipeDown={true}
            index={selectedImageIndex}
            onSwipeDown={() => setModalVisible(false)}
            renderHeader={_renderHeader}
            renderIndicator={() => {}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.flexCount(1),
    backgroundColor: appColors.black,
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
  header: {
    ...appStyles.flexRow,
    paddingVertical: 10,
  },
  indicatorContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
});

export default ImagesPreviewModal;
