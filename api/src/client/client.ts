import express, { Request, Response } from "express";
import multer from "multer";
import { context } from "./context";
import { Clients } from "./grpc-clients";
import { Run as RunAMQP } from "./amqp-run";
import { Client } from "@grpc/grpc-js";

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send("Pong!")
});

app.get('/amqp', (req: Request, res: Response) => {
	RunAMQP(req, res);
});

app.get('/grpc', (req: Request, res: Response) => {
	Clients.ProductClient.addProduct(req, res);
});

app.get('/product/add', multer().any(), (req: Request, res: Response) => {
	Clients.ProductClient.addProduct(req, res);
});

app.get('/file/list', multer().any(), (req: Request, res: Response) => {
	Clients.FileClient.listFiles(req, res);
});

app.get('/file/find', multer().any(), (req: Request, res: Response) => {
	Clients.FileClient.findFileByName(req, res);
});

app.listen(context.REMOTE_PORT, () => {
	console.log(`Listen to port: ${context.REMOTE_PORT}`);
});