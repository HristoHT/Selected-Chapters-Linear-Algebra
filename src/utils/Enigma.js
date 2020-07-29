import { C1, C2, C3, ReflectionBoard, PlugBoard, shiftedMatrix } from './Matrecies';
const math = require('mathjs');

function fromCharToArr(demension, char) {
    return new Array(demension).fill(0).map((val, i) => { return (char.charCodeAt() - 'a'.charCodeAt() === i || (i === 26 && char === ' ')) ? 1 : 0 })
}

function fromArrToChar(arr) {
    return String.fromCharCode(arr._data.indexOf(1) === 26 ? 32 : arr._data.indexOf(1) + 'a'.charCodeAt());
}

function devide(a, b) {
    return a % b;
}

const Enigma = (demension, offset1, offset2, offset3, S, letter, index) => {
    let letterArr = fromCharToArr(demension, letter),
        Q1 = math.multiply(C1, math.pow(S, devide(index + offset1, demension))),
        Q2 = math.multiply(C2, math.pow(S, devide(Math.floor(index / demension) + offset2), demension)),
        Q3 = math.multiply(C3, math.pow(S, devide((Math.floor(index / demension * demension) + offset3, demension))));

    let cripted = math.multiply(PlugBoard,
        math.multiply(math.inv(Q1),
            math.multiply(math.inv(Q2),
                math.multiply(math.inv(Q3),
                    math.multiply(ReflectionBoard,
                        math.multiply(Q3,
                            math.multiply(Q2,
                                math.multiply(Q1,
                                    math.multiply(PlugBoard, letterArr)))))))));

    return fromArrToChar(cripted);
}

const cryptWord = (word, settings) => {
    let crypt = '';
    for (let i = 0; i < word.length; i++) {
        crypt += Enigma(27, settings.shift1, settings.shift2, settings.shift3, shiftedMatrix(27, settings.offset), word[i], i)
    }

    return crypt;
}

export default cryptWord;