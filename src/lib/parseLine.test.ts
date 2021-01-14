import { Encoding } from '../types';
import parseLine from './parseLine';

describe('parseLine', () => {
  it('parses a tag start line', () => {
    const parsedLine = parseLine('<REAPER_PROJECT 0.1 "6.11/x64" 1610552812');
    expect(parsedLine).toEqual({
      whitespace: '',
      bracket: '<',
      key: 'REAPER_PROJECT',
      rawValue: '0.1 "6.11/x64" 1610552812',
      encoding: Encoding.Unknown,
    });
  });

  it('parses a tag end line', () => {
    const parsedLine = parseLine('  >');
    expect(parsedLine).toEqual({
      whitespace: '  ',
      bracket: '>',
      key: '',
      rawValue: '',
      encoding: Encoding.Unknown,
    });
  });

  it('parses an unencoded value line', () => {
    const parsedLine = parseLine('  RENDER_RANGE 2 0 0 16 1000');
    expect(parsedLine).toEqual({
      whitespace: '  ',
      bracket: '',
      key: 'RENDER_RANGE',
      rawValue: '2 0 0 16 1000',
      encoding: Encoding.Unknown,
    });
  });

  it('parses a base64 encoded value line', () => {
    const parsedLine = parseLine('    a3B2dwMAAAABAAAAAAAAAAAAAAA=');
    expect(parsedLine).toEqual({
      whitespace: '    ',
      bracket: '',
      key: '',
      rawValue: 'a3B2dwMAAAABAAAAAAAAAAAAAAA=',
      encoding: Encoding.Base64,
    });
  });
});
