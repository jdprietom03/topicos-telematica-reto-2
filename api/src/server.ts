import express, { Request, Response } from "express";
import multer from "multer";
import { context } from "./context.js";
import { Run as RungRPC } from "./grpc-run.js";
import { Run as RunAMQP } from "./amqp-run.js";

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send("Pong!")
});

app.get('/amqp', (req: Request, res: Response) => {
	RunAMQP(req, res);
});

app.get('/grpc', (req: Request, res: Response) => {
	RungRPC(req, res);
});

app.post('/grpc', multer().any(), (req: Request, res: Response) => {
	RungRPC(req, res);
});

app.listen(context.REMOTE_PORT, () => {
	console.log(`Listen to port: ${context.REMOTE_PORT}`);
});