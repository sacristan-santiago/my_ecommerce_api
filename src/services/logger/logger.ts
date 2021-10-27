const fs = require('fs');
const pino = require('pino');
const multistream = require('pino-multi-stream').multistream;
const path = require('path');

const logDirectory = path.resolve(__dirname, "");
const streams = [
    { level: "info", stream: process.stdout},
    { level: "warn", stream: process.stdout},
    { level: "error", stream: process.stdout},
    { level: 'warn', stream: pino.destination(`${logDirectory}/warn.log`) },
    { level: 'error', stream: pino.destination(`${logDirectory}/error.log`) },
];
const opts = {
    dedupe: true
}

export const logger = pino({ level: 'info' }, multistream(streams, opts));
