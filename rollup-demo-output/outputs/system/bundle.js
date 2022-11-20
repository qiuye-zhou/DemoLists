System.register(['lodash'], (function (exports) {
    'use strict';
    var sample;
    return {
        setters: [function (module) {
            sample = module.sample;
        }],
        execute: (function () {

            var getnum = 66;

            const arrs = ['a', 'b', 'c'];

            const printa = exports('printa', () => {
                console.log(`this is getnum: ${getnum}`);

                console.log(sample(arrs));
            });

        })
    };
}));
