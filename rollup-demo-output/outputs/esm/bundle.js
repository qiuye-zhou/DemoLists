import { sample } from 'lodash';

var getnum = 66;

const arrs = ['a', 'b', 'c'];

const printa = () => {
    console.log(`this is getnum: ${getnum}`);

    console.log(sample(arrs));
};

export { printa };
