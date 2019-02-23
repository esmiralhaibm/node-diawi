const assert = require('assert');
const Diawi = require('../diawi.js');
const fs = require('fs');

beforeEach(function() {
  if (!fs.existsSync('./FILE')) {
    fs.writeFileSync('./FILE', 'test');
  }
});

afterEach(function() {
  if (fs.existsSync('./FILE')) {
    fs.unlinkSync('./FILE');
  }
});

describe('Upload command tests', function() {
  it('should throw given empty options', function() {
    assert.throws(() => {
      new Diawi({});
    });
  });
  it('should throw given only a token', function() {
    assert.throws(() => {
      new Diawi({token: 'XXX'});
    });
  });
  it('should throw given a token and a non-existing path', function() {
    if (fs.existsSync('./FILE2')) {
      fs.unlinkSync('./FILE2');
    }
    assert.throws(() => {
      new Diawi({token: 'XXX', path: './FILE2'});
    });
  });

  it('should not throw given a token and an existing path', function() {
    assert.doesNotThrow(() => {
      new Diawi({token: 'XXX', path: './FILE'});
    });
  });

  ['password', 'comment', 'callback_emails',
    'wall_of_apps', 'find_by_udid', 'installation_notifications']
      .forEach((option) => {
        it(`should store the option: ${option}`, function() {
          const token = 'XXX';
          const path = './FILE';
          const options = {token: token, path: path};
          options[option] = option;
          const diawi = new Diawi(options);
          assert.equal(token, diawi.token);
          assert.equal(path, diawi.path);
          assert.equal(option, diawi.formData[option]);
        });
      });
});
