"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const context_1 = require("./context");
const proto_loader_1 = require("@grpc/proto-loader");
const grpc_js_1 = require("@grpc/grpc-js");
const packageDefinition = (0, proto_loader_1.loadSync)(context_1.context.PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const PackageDefinition = (0, grpc_js_1.loadPackageDefinition)(packageDefinition);
const ClientBuilder = (service) => {
    const ServiceConstructor = PackageDefinition[service];
    return new ServiceConstructor(context_1.context.GRPC_HOST, grpc_js_1.credentials.createInsecure());
};
exports.Services = {
    ProductService: () => ClientBuilder("ProductService")
};
