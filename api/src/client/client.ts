import express, { Request, Response } from 'express';
import multer from 'multer';
import { context } from './context';
import { Clients } from './grpc-clients';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Pong!');
});

app.get('/file/list', multer().any(), (req: Request, res: Response) => {
  Clients.FileClient.listFiles(req, res);
});

app.get(
  '/file/find/:pattern',
  multer().any(),
  (req: Request, res: Response) => {
    Clients.FileClient.findFiles(req, res);
  },
);

app.listen(context.REMOTE_PORT, () => {
  console.log(`Listen to port: ${context.REMOTE_PORT}`);
});
