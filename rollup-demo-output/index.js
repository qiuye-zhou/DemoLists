import getnum from "./getnum";
import { sample } from "lodash";

const str = 'this is useless';

const arrs = ['a', 'b', 'c'];

export const printa = () => {
    console.log(`this is getnum: ${getnum}`);

    console.log(sample(arrs));
}