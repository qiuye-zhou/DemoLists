define('Test', ['exports', 'lodash'], (function (exports, lodash) { 'use strict';

    var getnum = 66;

    const arrs = ['a', 'b', 'c'];

    const printa = () => {
        console.log(`this is getnum: ${getnum}`);

        console.log(lodash.sample(arrs));
    };

    exports.printa = printa;

}));
