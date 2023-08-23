// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_FileService_pb = require('../proto/FileService_pb.js');

function serialize_file_service_FindFileByNameRequest(arg) {
  if (!(arg instanceof proto_FileService_pb.FindFileByNameRequest)) {
    throw new Error('Expected argument of type file_service.FindFileByNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_service_FindFileByNameRequest(buffer_arg) {
  return proto_FileService_pb.FindFileByNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_file_service_FindFileByNameResponse(arg) {
  if (!(arg instanceof proto_FileService_pb.FindFileByNameResponse)) {
    throw new Error('Expected argument of type file_service.FindFileByNameResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_file_service_FindFileByNameResponse(buffer_arg) {
  return proto_FileService_pb.FindFileByNameResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  findFileByName: {
    path: '/file_service.FileService/FindFileByName',
    requestStream: false,
    responseStream: false,
    requestType: proto_FileService_pb.FindFileByNameRequest,
    responseType: proto_FileService_pb.FindFileByNameResponse,
    requestSerialize: serialize_file_service_FindFileByNameRequest,
    requestDeserialize: deserialize_file_service_FindFileByNameRequest,
    responseSerialize: serialize_file_service_FindFileByNameResponse,
    responseDeserialize: deserialize_file_service_FindFileByNameResponse,
  },
};

exports.FileServiceClient = grpc.makeGenericClientConstructor(FileServiceService);
