"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateObj = void 0;
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
exports.generateObj = generateObj;
process.on('message', (cant) => {
    if (process && process.send) {
        process.send(exports.generateObj(Number(cant)));
    }
});
