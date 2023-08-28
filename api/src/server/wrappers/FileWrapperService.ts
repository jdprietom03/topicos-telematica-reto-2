import { ProtoWrapperService } from './ProtoWrapperService';
import { FileServiceService } from '../../../generated/proto/FileService_grpc_pb';
import {
  ListFilesRequest,
  ListFilesResponse,
  FindFilesRequest,
  FindFilesResponse,
  FileInfo,
} from '../../../generated/proto/FileService_pb';
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import FileService from './../services/FileService';

export class FileWrapperService extends ProtoWrapperService {
  constructor() {
    super(FileServiceService as any);
  }

  private listFiles(
    call: ServerUnaryCall<ListFilesRequest, ListFilesResponse>,
    callback: sendUnaryData<ListFilesResponse>,
  ): void {
    const response = new ListFilesResponse();

    const files = new FileService().listFiles();

    response.setFileInfoList(
      files.map((file) => {
        const fileInfo = new FileInfo();
        fileInfo.setName(file.name);
        fileInfo.setSize(file.size);
        fileInfo.setTimestamp(file.timestamp.toString());

        return fileInfo;
      }),
    );

    callback(null, response);
  }

  private findFiles(
    call: ServerUnaryCall<FindFilesRequest, FindFilesResponse>,
    callback: sendUnaryData<FindFilesResponse>,
  ): void {
    const response = new FindFilesResponse();

    const files = new FileService().findFileByName(call.request.getFileName());

    response.setFilesInfoList(
      files.map((file) => {
        const fileInfo = new FileInfo();
        fileInfo.setName(file.name);
        fileInfo.setSize(file.size);
        fileInfo.setTimestamp(file.timestamp.toString());

        return fileInfo;
      }),
    );

    callback(null, response);
  }

  public getMethods(): any {
    return {
      listFiles: this.listFiles,
      findFiles: this.findFiles,
    };
  }
}
