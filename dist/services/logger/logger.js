"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino = require('pino');
const multistream = require('pino-multi-stream').multistream;
const path = require('path');
const logDirectory = path.resolve(__dirname, "");
const streams = [
    { level: "info", stream: process.stdout },
    { level: "warn", stream: process.stdout },
    { level: "error", stream: process.stdout },
    { level: 'warn', stream: pino.destination(`${logDirectory}/warn.log`) },
    { level: 'error', stream: pino.destination(`${logDirectory}/error.log`) },
];
const opts = {
    dedupe: true
};
exports.logger = pino({ level: 'info' }, multistream(streams, opts));
