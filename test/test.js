/**
 * Utilize Mocha to run unit tests on functionality
 */

const assert = require('assert');

const Controller = require('../controllers/controller');

describe('Controller', () => {
  describe('.returnString()', () => {
    let name = 'Holly';

    it(`should return "${name}" when "${name}" is passed`, () => {
      assert.equal(name, Controller.returnString(name));
    });
    it(`should return typeof {string} when string "${name}" is passed`, () => {
      assert.equal('string', typeof Controller.returnString(name));
    });
    it(`should return typeof {string} when number 1234 is passed`, () => {
      assert.equal('string', typeof Controller.returnString(1234));
    });
  });
});