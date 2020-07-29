const math = require("mathjs");
const D = 27;
try {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function fromCharToArr(demension, char) {
        return new Array(demension).fill(0).map((val, i) => { return (char.charCodeAt() - 'a'.charCodeAt() == i) ? 1 : 0 })
    }

    function shiftedMatrix(demension, firstOne) {
        let _matrix = [];
        for (let i = 0; i < demension; i++) {
            let row = new Array(demension).fill(0);
            row[firstOne] = 1;
            firstOne++;
            if (firstOne >= demension) firstOne = 0;
            _matrix.push(row);
        }

        return math.matrix(_matrix);
    }

    // 0 1 2 3 4 5 6
    // 1 2 0 3 6 4 5
    // 1 0 

    function swappedMatrix(demension) {
        let _matrix = [];
        let swapMap = new Array(demension).fill(0).map((val, i) => i),
            used = new Array(demension).fill(0);

        for (let i = 0; i < demension; i++) {
            if(swapMap[i] != i)continue;
            let randomIndex = getRandomInt(0, demension);
            while(swapMap[randomIndex] != randomIndex)randomIndex = getRandomInt(0, demension);
            let c = swapMap[i];
            swapMap[i] = randomIndex;
            swapMap[randomIndex] = c;
        }

        for (let i = 0; i < demension; i++) {
            let row = new Array(demension).fill(0);
            row[swapMap[i]] = 1;
            _matrix.push(row);
        }

        return math.matrix(_matrix);
    }

    function scrambleMatrix(demension) {
        let _matrix = [];
        let swapMap = new Array(demension).fill(0).map((val, i) => i).sort(() => (.5 - Math.random()));

        for (let i = 0; i < demension; i++) {
            let row = new Array(demension).fill(0);
            row[swapMap[i]] = 1;
            _matrix.push(row);
        }

        return math.matrix(_matrix);
    }

    function enigma(demension, C1, C2, C3, S, P, R, letter, index) {
        let letterArr = fromCharToArr(demension, letter),
            Q1 = math.multiply(C1, math.pow(S, Math.floor(index / demension))),
            Q2 = math.multiply(C2, math.pow(S, Math.floor(Math.floor(index / math.pow(demension, 2)) / math.pow(demension, 2)))),
            Q3 = math.multiply(C3, math.pow(S, Math.floor(Math.floor(index / math.pow(demension, 3)) / math.pow(demension, 3))));

        // Q2 = Q1; Q3 = Q1;
        let cripted = math.multiply(Q1,
            math.multiply(math.inv(Q1),
                math.multiply(math.inv(Q2),
                    math.multiply(math.inv(Q3),
                        math.multiply(R,
                            math.multiply(Q3,
                                math.multiply(Q2,
                                    math.multiply(Q1,
                                        math.multiply(math.inv(Q1), letterArr)))))))));

        // console.log(letter, '= (', cripted._data.indexOf(1), '+', 'a'.charCodeAt(), cripted._data.indexOf(1) + 'a'.charCodeAt(), ') ->', letterArr.indexOf(1), letter);
        // console.log(JSON.stringify(cripted._data));
        return String.fromCharCode(cripted._data.indexOf(1) + 'a'.charCodeAt());
    }

    const c1 = scrambleMatrix(D), c2 = scrambleMatrix(D), c3 = scrambleMatrix(D),
        p = swappedMatrix(D), r = swappedMatrix(D);


    console.log(JSON.stringify(c1._data))
    console.log(JSON.stringify(c2._data))
    console.log(JSON.stringify(c3._data))
    console.log(JSON.stringify(p._data))
    console.log(JSON.stringify(r._data))

} catch (e) { console.log(e.stack) }


