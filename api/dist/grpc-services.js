import { context } from './context.js';
import protoLoader from '@grpc/proto-loader';
import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
const packageDefinition = protoLoader.loadSync(context.PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const PackageDefinition = loadPackageDefinition(packageDefinition);
const ClientBuilder = (service) => {
    const ServiceConstructor = PackageDefinition[service];
    return new ServiceConstructor(context.GRPC_HOST, credentials.createInsecure());
};
export const Services = {
    ProductService: () => ClientBuilder("ProductService")
};
