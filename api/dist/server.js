import express from "express";
import multer from "multer";
import { context } from "./context.js";
import { Run as RungRPC } from "./grpc-run.js";
import { Run as RunAMQP } from "./amqp-run.js";
const app = express();
app.get('/', (req, res) => {
    res.send("Pong!");
});
app.get('/amqp', (req, res) => {
    RunAMQP(req, res);
});
app.get('/grpc', (req, res) => {
    RungRPC(req, res);
});
app.post('/grpc', multer().any(), (req, res) => {
    RungRPC(req, res);
});
app.listen(context.REMOTE_PORT, () => {
    console.log(`Listen to port: ${context.REMOTE_PORT}`);
});
