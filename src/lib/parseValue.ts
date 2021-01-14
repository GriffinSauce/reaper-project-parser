// Check whether a value is a list of strings
const stringListValueRegex = /("[^"]*" ?){2,}/;

const parseValue = (rawValue: string): Value => {
  const isStringList = stringListValueRegex.test(rawValue);
  if (isStringList) {
    // Split to values and remove wrapping quotes
    const values = rawValue.split(' ').map(val => val.slice(1, -1));
    return {
      rawValue,
      type: 'list',
      values,
    };
  }

  return {
    rawValue,
  };
};

export default parseValue;
