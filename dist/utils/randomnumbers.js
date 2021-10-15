"use strict";
const random = () => Math.floor(Math.random() * (1000) + 1);
const generateObj = (cant) => {
    let obj = {};
    for (let i = 0; i < cant; i++) {
        const key = random().toString();
        if (!obj[key] && obj[key] != 0) {
            obj[key] = 0;
        }
        else {
            obj[key]++;
        }
    }
    return obj;
};
process.on('message', (cant) => {
    if (process && process.send) {
        process.send(generateObj(Number(cant)));
    }
});
