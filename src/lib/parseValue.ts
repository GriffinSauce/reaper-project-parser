import { Value, Encoding, ValueType } from '../types';

// Check whether a value is a list of strings
const stringListValueRegex = /("[^"]*" ?){2,}/;

interface Input {
  key: string;
  rawValue: string;
  encoding?: Encoding;
}

const parseValue = ({ key, rawValue, encoding }: Input): Value => {
  if (encoding === Encoding.Base64) {
    return {
      key,
      rawValue,
      type: ValueType.Base64,
      value: rawValue,
    };
  }

  const isStringList = stringListValueRegex.test(rawValue);
  if (isStringList) {
    // Split to values and remove wrapping quotes
    const values = rawValue.split(' ').map(val => val.slice(1, -1));
    return {
      key,
      rawValue,
      type: ValueType.List,
      values,
    };
  }

  return {
    key,
    rawValue,
  };
};

export default parseValue;
