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

export class FindFileByNameRequest extends jspb.Message { 
    getFileName(): string;
    setFileName(value: string): FindFileByNameRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindFileByNameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FindFileByNameRequest): FindFileByNameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindFileByNameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindFileByNameRequest;
    static deserializeBinaryFromReader(message: FindFileByNameRequest, reader: jspb.BinaryReader): FindFileByNameRequest;
}

export namespace FindFileByNameRequest {
    export type AsObject = {
        fileName: string,
    }
}

export class FindFileByNameResponse extends jspb.Message { 

    hasFileInfo(): boolean;
    clearFileInfo(): void;
    getFileInfo(): FileInfo | undefined;
    setFileInfo(value?: FileInfo): FindFileByNameResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindFileByNameResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FindFileByNameResponse): FindFileByNameResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindFileByNameResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindFileByNameResponse;
    static deserializeBinaryFromReader(message: FindFileByNameResponse, reader: jspb.BinaryReader): FindFileByNameResponse;
}

export namespace FindFileByNameResponse {
    export type AsObject = {
        fileInfo?: FileInfo.AsObject,
    }
}
