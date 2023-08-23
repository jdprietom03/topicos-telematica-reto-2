import { ProtoService } from "./ProtoService";
import { FileServiceService } from "../../../generated/proto/FileService_grpc_pb";
import { ListFilesRequest, ListFilesResponse, FindFileByNameRequest, FindFileByNameResponse, FileInfo } from "../../../generated/proto/FileService_pb";
import {
    ServerUnaryCall,
    sendUnaryData
} from '@grpc/grpc-js';

export class FileService extends ProtoService {

    constructor() {
        super(FileServiceService as any);
    }

    private listFiles(
        call: ServerUnaryCall<ListFilesRequest, ListFilesResponse>,
        callback: sendUnaryData<ListFilesResponse>
    ): void {
        const response = new ListFilesResponse();
        console.log(call.request.toObject())

        response.setFileInfoList([])

        callback(null, response);
    }

    private findFileByName(
        call: ServerUnaryCall<FindFileByNameRequest, FindFileByNameResponse>,
        callback: sendUnaryData<FindFileByNameResponse>
    ): void {
        const response = new FindFileByNameResponse();
        console.log(call.request.toObject())

        const fileInfo: FileInfo = new FileInfo();
        fileInfo.setName("Archivo xd")
        response.setFileInfo(fileInfo)

        callback(null, response);
    }

    public getMethods(): any {
        return {
            listFiles: this.listFiles,
            findFileByName: this.findFileByName
        }
    }
}