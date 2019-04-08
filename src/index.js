const BN = require('bn.js');
const numberToBN = require('number-to-bn');

const zero = new BN(0);
const negative1 = new BN(-1);

// complete conflux unit map
const unitMap = {
  'nocfx':        '0', // eslint-disable-line
  'drip':         '1', // eslint-disable-line
  'gdrip':        '1000000000', // eslint-disable-line
  'Gdrip':        '1000000000', // eslint-disable-line
  'cfx':          '1000000000000000000', // eslint-disable-line
};

/**
 * Returns value of unit in Drip
 *
 * @method getValueOfUnit
 * @param {String} unit the unit to convert to, default cfx
 * @returns {BigNumber} value of the unit (in Drip)
 * @throws error if the unit is not correct:w
 */
function getValueOfUnit(unitInput) {
  const unit = unitInput ? unitInput.toLowerCase() : 'cfx';
  var unitValue = unitMap[unit]; // eslint-disable-line

  if (typeof unitValue !== 'string') {
    throw new Error(`[confluxjs-unit] the unit provided ${unitInput} doesn't exists, please use the one of the following units ${JSON.stringify(unitMap, null, 2)}`);
  }

  return new BN(unitValue, 10);
}

function numberToString(arg) {
  if (typeof arg === 'string') {
    if (!arg.match(/^(((\+|-)?([0-9]+)(\.[0-9]*)?)|((\+|-)?\.?[0-9]+))$/)) {
      throw new Error(`while converting number to string, invalid number value '${arg}', should be a number matching (^(((\\+|-)?([0-9]+)(\\.[0-9]*)?)|((\\+|-)?\\.?[0-9]+))$).`);
    }
    return arg;
  } else if (typeof arg === 'number') {
    return String(arg);
  } else if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
    if (arg.toPrecision) {
      return String(arg.toPrecision());
    } else { // eslint-disable-line
      return arg.toString(10);
    }
  }
  throw new Error(`while converting number to string, invalid number value '${arg}' type ${typeof arg}.`);
}

function fromDrip(dripInput, unit, optionsInput) {
  var drip = numberToBN(dripInput); // eslint-disable-line
  var negative =  drip.lt(zero); // eslint-disable-line
  const base = getValueOfUnit(unit);
  const baseLength = unitMap[unit].length - 1 || 1;
  const options = optionsInput || {};

  if (negative) {
    drip = drip.mul(negative1);
  }

  var fraction =  drip.mod(base).toString(10); // eslint-disable-line

  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }

  if (!options.pad) {
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  }

  var whole =  drip.div(base).toString(10); // eslint-disable-line

  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  var value = `${whole}${fraction === '0' ? '' : `.${fraction}`}`; // eslint-disable-line

  if (negative) {
    value = `-${value}`;
  }

  return value;
}

function toDrip(cfxInput, unit) {
  var cfx = numberToString(cfxInput); // eslint-disable-line
  const base = getValueOfUnit(unit);
  const baseLength = unitMap[unit].length - 1 || 1;

  // Is it negative?
  var negative = (cfx.substring(0, 1) === '-'); // eslint-disable-line
  if (negative) {
    cfx = cfx.substring(1);
  }

  if (cfx === '.') { throw new Error(`[confluxjs-unit] while converting number ${cfxInput} to drip, invalid value`); }

  // Split it into a whole and fractional part
  var comps = cfx.split('.'); // eslint-disable-line
  if (comps.length > 2) { throw new Error(`[confluxjs-unit] while converting number ${cfxInput} to drip,  too many decimal points`); }

  var whole = comps[0], fraction = comps[1]; // eslint-disable-line

  if (!whole) { whole = '0'; }
  if (!fraction) { fraction = '0'; }
  if (fraction.length > baseLength) { throw new Error(`[confluxjs-unit] while converting number ${cfxInput} to drip, too many decimal places`); }

  while (fraction.length < baseLength) {
    fraction += '0';
  }

  whole = new BN(whole);
  fraction = new BN(fraction);
  var drip = (whole.mul(base)).add(fraction); // eslint-disable-line

  if (negative) {
    drip = drip.mul(negative1);
  }

  return new BN(drip.toString(10), 10);
}

module.exports = {
  unitMap,
  numberToString,
  getValueOfUnit,
  fromDrip,
  toDrip,
};
