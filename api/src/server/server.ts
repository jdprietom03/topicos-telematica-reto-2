import { Server, ServerCredentials } from '@grpc/grpc-js';
import { context } from './context';
import { services } from './services';

const server = new Server();

services.forEach((service) =>
  server.addService(service.getService(), service.getMethods()),
);

server.bindAsync(context.GRPC_HOST, ServerCredentials.createInsecure(), () => {
  server.start();
  console.info('Server is running on ', context.GRPC_HOST);
});
