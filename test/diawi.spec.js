const assert = require('assert');
const Diawi = require('../diawi.js');
const fs = require('fs');

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
    if (fs.existsSync('./FILE')) {
      fs.unlinkSync('./FILE');
    }
    assert.throws(() => {
      new Diawi({token: 'XXX', path: './FILE'});
    });
  });
  it('should not throw given a token and an existing path', function() {
    try {
      if (!fs.existsSync('./FILE')) {
        fs.writeFileSync('./FILE', 'test');
      }
      assert.doesNotThrow(() => {
        new Diawi({token: 'XXX', path: './FILE'});
      });
    } finally {
      if (fs.existsSync('./FILE')) {
        fs.unlinkSync('./FILE');
      }
    }
  });
});
