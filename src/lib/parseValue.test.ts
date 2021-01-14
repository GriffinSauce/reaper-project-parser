import parseValue from './parseValue';

describe('parseValue', () => {
  it('parses a list of string values', () => {
    const recordPaths = parseValue('"media-primary" "media-secondary"');
    expect(recordPaths).toEqual({
      rawValue: '"media-primary" "media-secondary"',
      type: 'list',
      values: ['media-primary', 'media-secondary'],
    });
  });
});
