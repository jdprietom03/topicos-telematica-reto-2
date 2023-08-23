// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_Service_pb = require('../proto/Service_pb.js');

function serialize_Product(arg) {
  if (!(arg instanceof proto_Service_pb.Product)) {
    throw new Error('Expected argument of type Product');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Product(buffer_arg) {
  return proto_Service_pb.Product.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TransactionResponse(arg) {
  if (!(arg instanceof proto_Service_pb.TransactionResponse)) {
    throw new Error('Expected argument of type TransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TransactionResponse(buffer_arg) {
  return proto_Service_pb.TransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProductServiceService = exports.ProductServiceService = {
  addProduct: {
    path: '/ProductService/AddProduct',
    requestStream: false,
    responseStream: false,
    requestType: proto_Service_pb.Product,
    responseType: proto_Service_pb.TransactionResponse,
    requestSerialize: serialize_Product,
    requestDeserialize: deserialize_Product,
    responseSerialize: serialize_TransactionResponse,
    responseDeserialize: deserialize_TransactionResponse,
  },
};

exports.ProductServiceClient = grpc.makeGenericClientConstructor(ProductServiceService);
