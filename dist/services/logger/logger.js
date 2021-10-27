"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_multi_stream_1 = __importDefault(require("pino-multi-stream"));
const child_process_1 = __importDefault(require("child_process"));
const stream_1 = __importDefault(require("stream"));
const path_1 = __importDefault(require("path"));
// Environment variables
const cwd = process.cwd();
const { env } = process;
const logPath = `${cwd}/log`;
const ruta = path_1.default.resolve(__dirname);
// Create a stream where the logs will be written
const logThrough = new stream_1.default.PassThrough();
const prettyStream = pino_multi_stream_1.default.prettyStream();
const streams = [
    { stream: logThrough },
    { stream: prettyStream }
];
const pinomsmultistream = pino_multi_stream_1.default.multistream(streams);
exports.logger = pino_multi_stream_1.default(pinomsmultistream);
// Log to multiple files using a separate process
const child = child_process_1.default.spawn(process.execPath, [
    require.resolve('pino-tee'),
    'warn', `${ruta}/warn.log`,
    'error', `${ruta}/error.log`
], { cwd, env });
logThrough.pipe(child.stdin);
// export const logger = pino({
//     level: "trace"
// }, pino.multistream(streams))
