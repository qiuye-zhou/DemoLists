(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
    typeof define === 'function' && define.amd ? define('Test', ['exports', 'lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Test = {}, global.lodash));
})(this, (function (exports, lodash) { 'use strict';

    var getnum = 66;

    const arrs = ['a', 'b', 'c'];

    const printa = () => {
        console.log(`this is getnum: ${getnum}`);

        console.log(lodash.sample(arrs));
    };

    exports.printa = printa;

}));
