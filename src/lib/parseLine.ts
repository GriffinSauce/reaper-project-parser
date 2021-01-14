import { Encoding } from '../types';

interface ParsedLine {
  whitespace: string;
  bracket: string;
  key: string;
  rawValue: string;
  encoding: Encoding;
}

// Get leading white space
const whitespaceRegex = /^(?<whitespace>\s*)/;

// Used to parse a line to its components
const lineRegex = /^(?<whitespace>\s*)(?<bracket>[<>])?(?<key>[a-zA-Z_]*)\s?(?<rawValue>.*)?/;

// Check whether line is encoded data
const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;

const isBase64EncodedLine = (line: string): boolean =>
  base64Regex.test(line.trim());

const parseLine = (line: string): ParsedLine => {
  const whitespaceMatch = whitespaceRegex.exec(line);
  if (!whitespaceMatch || !whitespaceMatch.groups) {
    throw new Error(`No whitespace match`);
  }
  const { whitespace = '' } = whitespaceMatch.groups;

  // Encoded value lines have no key/key
  // The line regex parses this incorrectly, massage the output instead of making the regex more complex
  if (isBase64EncodedLine(line)) {
    return {
      whitespace,
      bracket: '',
      key: '',
      rawValue: line.trim(),
      encoding: Encoding.Base64,
    };
  }

  const match = lineRegex.exec(line);
  if (!match || !match.groups) {
    throw new Error(`No match`);
  }
  const { bracket = '', key = '', rawValue = '' } = match.groups;
  return {
    whitespace,
    bracket,
    key,
    rawValue,
    encoding: Encoding.Unknown,
  };
};

export default parseLine;
