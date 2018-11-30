const { stdout } = require('test-console');
const { exec } = require('../src/index');

describe('it should handle anything', () => {
  test('1', () => {
    // jest.spyOn(process, 'exit').mockImplementationOnce(() => {
    //   throw new Error('process.exit() was called.');
    // });
    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() was called.');
    });

    exec();

    // var output = stdout.inspectSync();

    // console.log('output :');
    // console.log(output);
  });
});
