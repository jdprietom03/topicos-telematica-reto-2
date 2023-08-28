import AMQPClient from './../amqp-run';
import util from 'util';
import { Request } from 'express-serve-static-core';
import { Response } from 'express';
import {
  ListFilesRequest,
  ListFilesResponse,
  FindFilesRequest,
  FindFilesResponse,
} from '../../../generated/proto/FileService_pb';
import { ProtoClient } from './ProtoClient';
import { FileServiceClient } from '../../../generated/proto/FileService_grpc_pb';

export class FileClient extends ProtoClient<FileServiceClient> {
  constructor() {
    super(FileServiceClient);
  }

  public async listFiles(req: Request, res: Response) {
    if (!this.client) {
      return;
    }

    try {
      const listFilesPromise = util
        .promisify(this.client.listFiles)
        .bind(this.client);
      const listFilesRequest: ListFilesRequest = new ListFilesRequest();

      const result = (await listFilesPromise(
        listFilesRequest,
      )) as ListFilesResponse;

      res.json({
        message: 'Response received from remote service:',
        data: result.toObject(),
      });
    } catch (error) {
      await this.handleFallback('list_service', req, res);
    }
  }

  public async findFiles(req: Request, res: Response) {
    if (!this.client) {
      return;
    }

    try {
      const findFilesPromise = util
        .promisify(this.client.findFiles)
        .bind(this.client);
      const findFilesRequest: FindFilesRequest = new FindFilesRequest();
      const { params } = req;

      findFilesRequest.setFileName(params.pattern);

      const result = (await findFilesPromise(
        findFilesRequest,
      )) as FindFilesResponse;

      res.json({
        message: 'Response received from remote service:',
        data: result.toObject(),
      });
    } catch (error) {
      await this.handleFallback('find_service', req, res);
    }
  }

  public async handleFallback(route: string, req: Request, res: Response) {
    const client = new AMQPClient(route, req, res);
  }
}
