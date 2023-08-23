"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const Service_grpc_pb_1 = require("../generated/proto/Service_grpc_pb");
const Service_pb_1 = require("../generated/proto/Service_pb");
const addProduct = (call, callback) => {
    const response = new Service_pb_1.TransactionResponse();
    console.log(call.request.toObject());
    response.setStatusCode(200);
    callback(null, response);
};
const server = new grpc_js_1.Server();
const productService = Service_grpc_pb_1.ProductServiceService;
server.addService(productService, { addProduct });
server.bindAsync('0.0.0.0:4000', grpc_js_1.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('server is running on 0.0.0.0:4000');
});
