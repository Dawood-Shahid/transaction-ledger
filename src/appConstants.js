import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const MAX_DIMENSION = 1280;

export const TRANSACTION_TYPE_EXPENSE = 'expense';

export const numberFormatter = (number = '10000') => {
  if (number.length < 4) {
    return number;
  }
  let pointIndex = number.length - 3;
  let remainingNumber = number.slice(0, pointIndex);
  let lastThreeNumbers = number.slice(pointIndex);
  let formattedNumber;
  if (remainingNumber.length > 3) {
    remainingNumber = numberFormatter(remainingNumber);
  }
  formattedNumber = `${remainingNumber},${lastThreeNumbers}`;
  return formattedNumber;
};

export const getImageDimensions = (height, width) => {
  let aspectRatio = 0;
  if (height > MAX_DIMENSION || width > MAX_DIMENSION) {
    if (height > width) {
      aspectRatio = width / height;
      height = MAX_DIMENSION;
      width = aspectRatio * MAX_DIMENSION;
      return {height, width};
    } else if (width > height) {
      aspectRatio = height / width;
      width = MAX_DIMENSION;
      height = aspectRatio * MAX_DIMENSION;
      return {height, width};
    }
  } else {
    return {height, width};
  }
};

export const resizeImage = async (uri, height, width) => {
  try {
    let resizeResponse = await ImageResizer.createResizedImage(
      uri,
      width,
      height,
      'JPEG',
      80,
    );
    resizeResponse.fileCopyUri = resizeResponse.uri;
    resizeResponse.type = 'image/jpeg';
    return resizeResponse;
  } catch (err) {
    console.log('error', err);
  }
};

const resizeImages = async results => {
  for (const item of results) {
    let resizeResponse;
    item.fileCopyUri = item.uri;
    const dimensions = getImageDimensions(item.height, item.width);
    resizeResponse = await resizeImage(
      item.uri,
      dimensions.height,
      dimensions.width,
    );
    resizeResponse.fileCopyUri = decodeURIComponent(resizeResponse.fileCopyUri);

    if (resizeResponse) {
      item.fileCopyUri = resizeResponse.fileCopyUri;
      item.type = resizeResponse.type;
      item.size = resizeResponse.size;
      item.height = resizeResponse.height;
      item.width = resizeResponse.width;
      item.name = resizeResponse.name;
    }
  }
  return results;
};

export const ImagePicker = async cameraLaunch => {
  return new Promise(async (resolve, reject) => {
    if (cameraLaunch) {
      launchCamera(
        {
          title: 'Take a Picture',
          mediaType: 'photo',
        },
        async response => {
          if (response?.assets?.length > 0) {
            let results = response.assets;
            results = await resizeImages(results);
            resolve(results);
          } else {
            reject([]);
          }
        },
      );
    } else {
      launchImageLibrary(
        {
          title: 'Upload Picture',
          mediaType: 'photo',
          selectionLimit: 0,
        },
        async response => {
          if (response?.assets?.length > 0) {
            let results = response.assets;
            console.log(
              '\n > file: appConstants.js > line 109 > response',
              results,
            );
            results = await resizeImages(results);
            console.log(
              '\n > file: appConstants.js > line 109 > response resize',
              results,
            );
            resolve(results);
          } else {
            reject([]);
          }
        },
      );
    }
  });
};
