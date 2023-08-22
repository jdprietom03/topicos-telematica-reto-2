import { context } from './context';
import { loadSync } from '@grpc/proto-loader';
import { loadPackageDefinition, credentials, Client } from '@grpc/grpc-js';
import { ProductServiceClient } from './../generated/proto/Service_grpc_pb';

const packageDefinition = loadSync(
    context.PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const PackageDefinition = loadPackageDefinition(packageDefinition);

const ClientBuilder = (service: string): Client => { 
    const ServiceConstructor = PackageDefinition[service] as typeof Client;
    
    return new ServiceConstructor(context.GRPC_HOST, credentials.createInsecure());
}

export const Services = {
    ProductService: (): ProductServiceClient => ClientBuilder("ProductService") as any
}