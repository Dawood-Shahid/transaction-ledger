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

const typeConst = {
  NUMBER: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
};

const findTypeOf = value => {
  //'object', 'number', 'string', 'boolean'
  const type = typeof value;

  if (type === typeConst.OBJECT) {
    if (Array.isArray(value)) {
      return typeConst.ARRAY;
    } else {
      return typeConst.OBJECT;
    }
  } else {
    return type;
  }
};

export const deepClone = value => {
  let result;
  if (value !== null || value !== undefined) {
    const isArray = findTypeOf(value) === typeConst.ARRAY;

    if (isArray) {
      const {length} = value;
      const newArray = new Array(length);

      value.forEach((ele, index) => {
        const eleIsArray = findTypeOf(ele) === typeConst.ARRAY;
        const eleIsObject = findTypeOf(ele) === typeConst.OBJECT;

        if (eleIsArray || eleIsObject) {
          newArray[index] = deepClone(ele);
        } else {
          newArray[index] = ele;
        }
      });
      result = newArray;
    } else {
      const objectKeys = Object.keys(value);
      // eslint-disable-next-line no-new-object
      const newObject = new Object(null);

      objectKeys.forEach(key => {
        console.log('isObject => key, value: ', key, value[key]);
        const eleIsArray = findTypeOf(value[key]) === typeConst.ARRAY;
        const eleIsObject = findTypeOf(value[key]) === typeConst.OBJECT;

        if (eleIsArray || eleIsObject) {
          newObject[key] = deepClone(value[key]);
        } else {
          newObject[key] = value[key];
        }
      });
      result = newObject;
    }
  } else {
    result = value;
  }
  return result;
};
