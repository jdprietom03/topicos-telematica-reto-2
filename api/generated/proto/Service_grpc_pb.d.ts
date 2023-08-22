// package: 
// file: proto/Service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as proto_Service_pb from "../proto/Service_pb";

interface IProductServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addProduct: IProductServiceService_IAddProduct;
}

interface IProductServiceService_IAddProduct extends grpc.MethodDefinition<proto_Service_pb.Product, proto_Service_pb.TransactionResponse> {
    path: "/ProductService/AddProduct";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_Service_pb.Product>;
    requestDeserialize: grpc.deserialize<proto_Service_pb.Product>;
    responseSerialize: grpc.serialize<proto_Service_pb.TransactionResponse>;
    responseDeserialize: grpc.deserialize<proto_Service_pb.TransactionResponse>;
}

export const ProductServiceService: IProductServiceService;

export interface IProductServiceServer {
    addProduct: grpc.handleUnaryCall<proto_Service_pb.Product, proto_Service_pb.TransactionResponse>;
}

export interface IProductServiceClient {
    addProduct(request: proto_Service_pb.Product, callback: (error: grpc.ServiceError | null, response: proto_Service_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    addProduct(request: proto_Service_pb.Product, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_Service_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    addProduct(request: proto_Service_pb.Product, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_Service_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
}

export class ProductServiceClient extends grpc.Client implements IProductServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addProduct(request: proto_Service_pb.Product, callback: (error: grpc.ServiceError | null, response: proto_Service_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public addProduct(request: proto_Service_pb.Product, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_Service_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
    public addProduct(request: proto_Service_pb.Product, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_Service_pb.TransactionResponse) => void): grpc.ClientUnaryCall;
}
