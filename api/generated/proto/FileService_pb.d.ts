// package: file_service
// file: proto/FileService.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ListFilesRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListFilesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListFilesRequest): ListFilesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListFilesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListFilesRequest;
    static deserializeBinaryFromReader(message: ListFilesRequest, reader: jspb.BinaryReader): ListFilesRequest;
}

export namespace ListFilesRequest {
    export type AsObject = {
    }
}

export class ListFilesResponse extends jspb.Message { 
    clearFileInfoList(): void;
    getFileInfoList(): Array<FileInfo>;
    setFileInfoList(value: Array<FileInfo>): ListFilesResponse;
    addFileInfo(value?: FileInfo, index?: number): FileInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListFilesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListFilesResponse): ListFilesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListFilesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListFilesResponse;
    static deserializeBinaryFromReader(message: ListFilesResponse, reader: jspb.BinaryReader): ListFilesResponse;
}

export namespace ListFilesResponse {
    export type AsObject = {
        fileInfoList: Array<FileInfo.AsObject>,
    }
}

export class FileInfo extends jspb.Message { 
    getName(): string;
    setName(value: string): FileInfo;

    getSize(): number;
    setSize(value: number): FileInfo;

    getTimestamp(): string;
    setTimestamp(value: string): FileInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileInfo.AsObject;
    static toObject(includeInstance: boolean, msg: FileInfo): FileInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileInfo;
    static deserializeBinaryFromReader(message: FileInfo, reader: jspb.BinaryReader): FileInfo;
}

export namespace FileInfo {
    export type AsObject = {
        name: string,
        size: number,
        timestamp: string,
    }
}

export class FindFilesRequest extends jspb.Message { 
    getFileName(): string;
    setFileName(value: string): FindFilesRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindFilesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FindFilesRequest): FindFilesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindFilesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindFilesRequest;
    static deserializeBinaryFromReader(message: FindFilesRequest, reader: jspb.BinaryReader): FindFilesRequest;
}

export namespace FindFilesRequest {
    export type AsObject = {
        fileName: string,
    }
}

export class FindFilesResponse extends jspb.Message { 
    clearFilesInfoList(): void;
    getFilesInfoList(): Array<FileInfo>;
    setFilesInfoList(value: Array<FileInfo>): FindFilesResponse;
    addFilesInfo(value?: FileInfo, index?: number): FileInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindFilesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FindFilesResponse): FindFilesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindFilesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindFilesResponse;
    static deserializeBinaryFromReader(message: FindFilesResponse, reader: jspb.BinaryReader): FindFilesResponse;
}

export namespace FindFilesResponse {
    export type AsObject = {
        filesInfoList: Array<FileInfo.AsObject>,
    }
}
