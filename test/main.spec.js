const assert = require('assert');
const execSync = require('child_process').execSync;

describe('command-line tests', function() {
  const CLI_LOCATION = './bin/main.js';

  beforeEach(function() {

  });

  afterEach(function() {

  });

  it('should return semver version number when called with --version', function() {
    const version = execSync(CLI_LOCATION + ' --version').toString();
    const semverPattern = /^\d*\.\d*\.\d*\n$/;
    assert(version.toString().match(semverPattern), 'Versão: ' + version.toString());
  });

  it('should throw when called with no params', function() {
    assert.throws(() => {
      execSync(CLI_LOCATION);
    });
  });

  it('should throw when called with unrecognized param', function() {
    assert.throws(() => {
      execSync(CLI_LOCATION + ' --qweqwe');
    });
  });

  it('should throw when called with unrecognized param', function() {
    assert.throws(() => {
      execSync(CLI_LOCATION + ' --qweqwe');
    });
  });

  it('should accept a token and a file', function() {
    execSync('touch DIAWI_TEMP_FILE');
    try {
      execSync(CLI_LOCATION + ' TOKEN DIAWI_TEMP_FILE --dry-run');
    } catch (err) {
      assert.fail('Threw exception');
    } finally {
      execSync('rm -f DIAWI_TEMP_FILE');
    }
  });
});
