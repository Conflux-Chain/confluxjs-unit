const units = require('../index.js'); // eslint-disable-line
const BigNumber = require('bn.js'); // eslint-disable-line
const ActualBigNumber = require('bignumber.js');
const assert = require('chai').assert; // eslint-disable-line

// The original random functionality test here is disabled.
// TODO: do random test in a better way

describe('getValueOfUnit', () => {
  it('should throw when undefined or not string', () => {
    function invalidFromDrip() {
      units.fromDrip(1000000000000000000, 'something');
    }
    assert.throws(invalidFromDrip, Error);
  });
});

describe('toDrip', () => {
  it('should handle edge cases', () => {
    assert.equal(units.toDrip(0, 'drip').toString(10), '0');
    assert.equal(units.toDrip('0.0', 'drip').toString(10), '0');
    assert.equal(units.toDrip('.3', 'cfx').toString(10), '300000000000000000');
    assert.throws(() => units.toDrip('.', 'drip'), Error);
    assert.throws(() => units.toDrip('1.243842387924387924897423897423', 'cfx'), Error);
    assert.throws(() => units.toDrip('8723.98234.98234', 'cfx'), Error);
  });

  it('should return the correct value', () => {
    assert.equal(units.toDrip(1, 'drip').toString(10), '1');
    assert.equal(units.toDrip(1, 'gdrip').toString(10), '1000000000');
    assert.equal(units.toDrip(1, 'Gdrip').toString(10), '1000000000');
    assert.equal(units.toDrip(1, 'cfx').toString(10), '1000000000000000000');

    assert.throws(() => { units.toDrip(1, 'drip1'); }, Error);
  });
});

describe('numberToString', () => {
  it('should handle edge cases', () => {
    assert.throws(() => units.numberToString(null), Error);
    assert.throws(() => units.numberToString(undefined), Error);
    // assert.throws(() => units.numberToString(NaN), Error);
    assert.throws(() => units.numberToString({}), Error);
    assert.throws(() => units.numberToString([]), Error);
    assert.throws(() => units.numberToString('-1sdffsdsdf'), Error);
    assert.throws(() => units.numberToString('-0..-...9'), Error);
    assert.throws(() => units.numberToString('fds'), Error);
    assert.throws(() => units.numberToString(''), Error);
    assert.throws(() => units.numberToString('#'), Error);
    assert.equal(units.numberToString(55), '55');
    assert.equal(units.numberToString(1), '1');
    assert.equal(units.numberToString(-1), '-1');
    assert.equal(units.numberToString(0), '0');
    assert.equal(units.numberToString(-0), '0');
    assert.equal(units.numberToString(new ActualBigNumber(10.1)), '10.1');
    assert.equal(units.numberToString(new ActualBigNumber(10000)), '10000');
    assert.equal(units.numberToString(new BigNumber(10000)), '10000');
    assert.equal(units.numberToString(new BigNumber('-1')), '-1');
    assert.equal(units.numberToString(new BigNumber('1')), '1');
    assert.equal(units.numberToString(new BigNumber(0)), '0');
  });
});

describe('fromDrip', () => {
  it('should handle options', () => {
    assert.equal(units.fromDrip(10000000, 'drip', { commify: true }), '10,000,000');
  });

  it('should return the correct value', () => {
    assert.equal(units.fromDrip(1000000000000000000, 'drip'), '1000000000000000000');
    assert.equal(units.fromDrip(1000000000000000000, 'gdrip'), '1000000000');
    assert.equal(units.fromDrip(1000000000000000000, 'cfx'), '1');
  });
});

