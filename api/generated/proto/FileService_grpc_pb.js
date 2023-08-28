// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_FileService_pb = require('../proto/FileService_pb.js');

function serialize_file_service_FindFilesRequest(arg) {
  if (!(arg instanceof proto_FileService_pb.FindFilesRequest)) {
    throw new Error('Expected argument of type file_service.FindFilesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_service_FindFilesRequest(buffer_arg) {
  return proto_FileService_pb.FindFilesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_service_FindFilesResponse(arg) {
  if (!(arg instanceof proto_FileService_pb.FindFilesResponse)) {
    throw new Error('Expected argument of type file_service.FindFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_service_FindFilesResponse(buffer_arg) {
  return proto_FileService_pb.FindFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_service_ListFilesRequest(arg) {
  if (!(arg instanceof proto_FileService_pb.ListFilesRequest)) {
    throw new Error('Expected argument of type file_service.ListFilesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_service_ListFilesRequest(buffer_arg) {
  return proto_FileService_pb.ListFilesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_service_ListFilesResponse(arg) {
  if (!(arg instanceof proto_FileService_pb.ListFilesResponse)) {
    throw new Error('Expected argument of type file_service.ListFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_service_ListFilesResponse(buffer_arg) {
  return proto_FileService_pb.ListFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FileServiceService = exports.FileServiceService = {
  listFiles: {
    path: '/file_service.FileService/ListFiles',
    requestStream: false,
    responseStream: false,
    requestType: proto_FileService_pb.ListFilesRequest,
    responseType: proto_FileService_pb.ListFilesResponse,
    requestSerialize: serialize_file_service_ListFilesRequest,
    requestDeserialize: deserialize_file_service_ListFilesRequest,
    responseSerialize: serialize_file_service_ListFilesResponse,
    responseDeserialize: deserialize_file_service_ListFilesResponse,
  },
  findFiles: {
    path: '/file_service.FileService/FindFiles',
    requestStream: false,
    responseStream: false,
    requestType: proto_FileService_pb.FindFilesRequest,
    responseType: proto_FileService_pb.FindFilesResponse,
    requestSerialize: serialize_file_service_FindFilesRequest,
    requestDeserialize: deserialize_file_service_FindFilesRequest,
    responseSerialize: serialize_file_service_FindFilesResponse,
    responseDeserialize: deserialize_file_service_FindFilesResponse,
  },
};

exports.FileServiceClient = grpc.makeGenericClientConstructor(FileServiceService);
