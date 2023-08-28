"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const context_1 = require("./context");
const grpc_run_1 = require("./grpc-run");
const amqp_run_1 = require("./amqp-run");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send("Pong!");
});
app.get('/amqp', (req, res) => {
    (0, amqp_run_1.Run)(req, res);
});
app.get('/grpc', (req, res) => {
    (0, grpc_run_1.Run)(req, res);
});
app.post('/grpc', (0, multer_1.default)().any(), (req, res) => {
    (0, grpc_run_1.Run)(req, res);
});
app.listen(context_1.context.REMOTE_PORT, () => {
    console.log(`Listen to port: ${context_1.context.REMOTE_PORT}`);
});
