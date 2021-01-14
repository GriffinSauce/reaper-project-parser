import parseValue from './parseValue';

describe('parseValue', () => {
  it('parses a list of string values', () => {
    const recordPaths = parseValue({
      key: 'MEDIA_PATH',
      rawValue: '"media-primary" "media-secondary"',
    });
    expect(recordPaths).toEqual({
      key: 'MEDIA_PATH',
      rawValue: '"media-primary" "media-secondary"',
      type: 'list',
      values: ['media-primary', 'media-secondary'],
    });
  });
});
