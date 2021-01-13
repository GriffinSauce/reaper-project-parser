import fs from 'fs-extra';
import path from 'path';
import parseProject from '../src';

describe('parse a project', () => {
  it('does not throw', () => {
    const projectRawText = fs.readFileSync(
      path.join(__dirname, '__fixtures__/with-external-files.rpp'),
      'utf8'
    );
    expect(function() {
      parseProject({ projectRawText });
    }).not.toThrow();
  });
});
