// package: file_service
// file: proto/FileService.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as proto_FileService_pb from "../proto/FileService_pb";

interface IFileServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listFiles: IFileServiceService_IListFiles;
    findFiles: IFileServiceService_IFindFiles;
}

interface IFileServiceService_IListFiles extends grpc.MethodDefinition<proto_FileService_pb.ListFilesRequest, proto_FileService_pb.ListFilesResponse> {
    path: "/file_service.FileService/ListFiles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_FileService_pb.ListFilesRequest>;
    requestDeserialize: grpc.deserialize<proto_FileService_pb.ListFilesRequest>;
    responseSerialize: grpc.serialize<proto_FileService_pb.ListFilesResponse>;
    responseDeserialize: grpc.deserialize<proto_FileService_pb.ListFilesResponse>;
}
interface IFileServiceService_IFindFiles extends grpc.MethodDefinition<proto_FileService_pb.FindFilesRequest, proto_FileService_pb.FindFilesResponse> {
    path: "/file_service.FileService/FindFiles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_FileService_pb.FindFilesRequest>;
    requestDeserialize: grpc.deserialize<proto_FileService_pb.FindFilesRequest>;
    responseSerialize: grpc.serialize<proto_FileService_pb.FindFilesResponse>;
    responseDeserialize: grpc.deserialize<proto_FileService_pb.FindFilesResponse>;
}

export const FileServiceService: IFileServiceService;

export interface IFileServiceServer {
    listFiles: grpc.handleUnaryCall<proto_FileService_pb.ListFilesRequest, proto_FileService_pb.ListFilesResponse>;
    findFiles: grpc.handleUnaryCall<proto_FileService_pb.FindFilesRequest, proto_FileService_pb.FindFilesResponse>;
}

export interface IFileServiceClient {
    listFiles(request: proto_FileService_pb.ListFilesRequest, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.ListFilesResponse) => void): grpc.ClientUnaryCall;
    listFiles(request: proto_FileService_pb.ListFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.ListFilesResponse) => void): grpc.ClientUnaryCall;
    listFiles(request: proto_FileService_pb.ListFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.ListFilesResponse) => void): grpc.ClientUnaryCall;
    findFiles(request: proto_FileService_pb.FindFilesRequest, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.FindFilesResponse) => void): grpc.ClientUnaryCall;
    findFiles(request: proto_FileService_pb.FindFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.FindFilesResponse) => void): grpc.ClientUnaryCall;
    findFiles(request: proto_FileService_pb.FindFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.FindFilesResponse) => void): grpc.ClientUnaryCall;
}

export class FileServiceClient extends grpc.Client implements IFileServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public listFiles(request: proto_FileService_pb.ListFilesRequest, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.ListFilesResponse) => void): grpc.ClientUnaryCall;
    public listFiles(request: proto_FileService_pb.ListFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.ListFilesResponse) => void): grpc.ClientUnaryCall;
    public listFiles(request: proto_FileService_pb.ListFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.ListFilesResponse) => void): grpc.ClientUnaryCall;
    public findFiles(request: proto_FileService_pb.FindFilesRequest, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.FindFilesResponse) => void): grpc.ClientUnaryCall;
    public findFiles(request: proto_FileService_pb.FindFilesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.FindFilesResponse) => void): grpc.ClientUnaryCall;
    public findFiles(request: proto_FileService_pb.FindFilesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_FileService_pb.FindFilesResponse) => void): grpc.ClientUnaryCall;
}
