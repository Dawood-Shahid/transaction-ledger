export const numberFormatter = (number = '10000') => {
  const numberToString = number.toString();

  if (numberToString.length < 4) {
    return numberToString;
  }
  let pointIndex = numberToString.length - 3;
  let remainingNumber = numberToString?.slice(0, pointIndex);
  let lastThreeNumbers = numberToString?.slice(pointIndex);
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
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!value) {
    const isArray = findTypeOf(value) === typeConst.ARRAY;
    const isObject = findTypeOf(value) === typeConst.OBJECT;

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
    } else if (isObject) {
      // eslint-disable-next-line no-new-object
      const newObject = new Object(null);
      const objectKeys = Object.keys(value);

      objectKeys.forEach(key => {
        const eleIsArray = findTypeOf(value[key]) === typeConst.ARRAY;
        const eleIsObject = findTypeOf(value[key]) === typeConst.OBJECT;

        if (eleIsArray || eleIsObject) {
          newObject[key] = deepClone(value[key]);
        } else {
          newObject[key] = value[key];
        }
      });
      result = newObject;
    } else {
      result = value;
    }
  } else {
    result = value;
  }
  return result;
};
