import fs from 'fs-extra';
import path from 'path';
import parseProject from '.';

const loadFixture = (fileName: string): string =>
  fs.readFileSync(
    path.join(__dirname, `../test/__fixtures__/${fileName}`),
    'utf8'
  );

describe('parse a project with content', () => {
  it('does not throw', () => {
    const projectRawText = loadFixture('with-external-files.rpp');
    expect(() => {
      parseProject({ projectRawText });
    }).not.toThrow();
  });

  it('matches the snapshot', () => {
    const projectRawText = loadFixture('with-external-files.rpp');
    expect(parseProject({ projectRawText })).toMatchSnapshot();
  });
});

describe('serialisable output', () => {
  it('generates serialisable output', () => {
    const projectRawText = loadFixture('with-external-files.rpp');
    const output = parseProject({ projectRawText });
    expect(() => {
      JSON.stringify(output, null, 2);
    }).not.toThrow();
  });

  it('matches the serialised JSON snapshot', () => {
    const projectRawText = loadFixture('with-external-files.rpp');
    const output = parseProject({ projectRawText });
    expect(JSON.stringify(output, null, 2)).toMatchSnapshot();
  });
});
