import dotenv from 'dotenv';
import { pino } from 'pino';

dotenv.config();

export const logger = pino();

export const context = {
  PROTO_PATH: process.env.PROTO_PATH as string,
  GRPC_HOST: process.env.GRPC_HOST as string,
  REMOTE_PORT: process.env.REMOTE_PORT as string,
  RMQ_HOST: process.env.RMQ_HOST as string,
  RMQ_PORT: process.env.RMQ_PORT as string,
  RMQ_USER: process.env.RMQ_USER as string,
  RMQ_PASS: process.env.RMQ_PASS as string,
  RMQ_QUEUE: process.env.RMQ_QUEUE as string,
  RMQ_EXCHANGE: process.env.RMQ_EXCHANGE as string,
  RMQ_TYPE: process.env.RMQ_TYPE as string,
};
