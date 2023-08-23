"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.context = {
    PROTO_PATH: process.env.PROTO_PATH,
    GRPC_HOST: process.env.GRPC_HOST,
    REMOTE_PORT: process.env.REMOTE_PORT,
    RMQ_HOST: process.env.RMQ_HOST,
    RMQ_PORT: process.env.RMQ_PORT,
    RMQ_USER: process.env.RMQ_USER,
    RMQ_PASS: process.env.RMQ_PASS,
    RMQ_QUEUE: process.env.RMQ_QUEUE,
    RMQ_EXCHANGE: process.env.RMQ_EXCHANGE,
    RMQ_TYPE: process.env.RMQ_TYPE
};
