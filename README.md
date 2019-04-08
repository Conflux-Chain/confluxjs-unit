## confluxjs-unit

A simple module for handling Conflux unit conversion. Forked and modified from [ethjs-unit](https://github.com/ethjs/ethjs-unit).

## Install

```
npm install --save confluxjs-unit
```

## Usage

```js
const unit = require('confluxjs-unit');

var val1 = unit.toDrip(249824778, 'cfx');

// result <BN ...> 249824778000000000000000000

var val2 = unit.fromDrip('249824778000000000000000000', 'cfx');

// result '249824778'
```

## About

A module that just handles the unit conversion between the various types of Conflux currency units.

Note, the `toDrip` returns a BN instance while `fromDrip` always returns a string number.

## Methods Available & Objects

```
unitMap         { unitName: singleUnitDripValue, ... }
getValueOfUnit  <Function (unit) : (BN)>
toDrip           <Function (value, unit) : (BN)>
fromDrip         <Function (value, unit) : (String)>
```

## Supported Units

```
'drip':          '1',
'gdrip':         '1000000000',
'Gdrip':         '1000000000',
'cfx':           '1000000000000000000',
```

## Contributing

Please help better the ecosystem by submitting issues and pull requests to default. We need all the help we can get to build the absolute best linting standards and utilities. We follow the AirBNB linting standard and the unix philosophy.

## Licence

This project is licensed under the MIT license, Copyright (c) 2016 Nick Dodson. For more information see LICENSE.md.

```
The MIT License

Copyright (c) 2016 Nick Dodson. nickdodson.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
