import { context } from './context.js';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { credentials } from '@grpc/grpc-js';
import { ProductService } from './../proto/Service.proto';

const packageDefinition = protoLoader.loadSync(
    context.PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const PackageDefinition = grpc.loadPackageDefinition(packageDefinition);

const ClientBuilder = (service: string) => { 
    const ServiceConstructor = PackageDefinition[service] as typeof grpc.Client;
    
    return new ServiceConstructor(context.GRPC_HOST, credentials.createInsecure());
}

export const Services = {
    ProductService: (): ProductService => ClientBuilder("ProductService")
}