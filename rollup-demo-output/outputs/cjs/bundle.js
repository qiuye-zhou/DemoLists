'use strict';

var lodash = require('lodash');

var getnum = 66;

const arrs = ['a', 'b', 'c'];

const printa = () => {
    console.log(`this is getnum: ${getnum}`);

    console.log(lodash.sample(arrs));
};

exports.printa = printa;
