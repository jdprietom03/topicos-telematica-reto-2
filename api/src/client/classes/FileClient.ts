import { Run as RunAMQP } from "./../amqp-run";
import util from "util";
import { Request } from "express-serve-static-core";
import { Response } from "express";
import { ListFilesRequest, ListFilesResponse, FindFileByNameRequest, FindFileByNameResponse } from "../../../generated/proto/FileService_pb";
import { ProtoClient } from "./ProtoClient";
import { FileServiceClient } from "../../../generated/proto/FileService_grpc_pb";

export class FileClient extends ProtoClient<FileServiceClient> {

    constructor() {
        super(FileServiceClient);
    }

    public async listFiles(req: Request, res: Response) {
        if (!this.client) {
            return;
        }

        try {
            const listFilesPromise = util.promisify(this.client.listFiles).bind(this.client);
            const listFilesRequest: ListFilesRequest = new ListFilesRequest();

            const result = await listFilesPromise(listFilesRequest) as ListFilesResponse;

            res.json({  
                message: "Response received from remote service:",
                data: result.toObject()
            });
        } catch (error) {
            await this.handleFallback(req, res);
        }
    }

    public async findFileByName(req: Request, res: Response) {
        if (!this.client) {
            return;
        }

        try {
            const findFileByNamePromise = util.promisify(this.client.findFileByName).bind(this.client);
            const findFileByNameRequest: FindFileByNameRequest = new FindFileByNameRequest();
            findFileByNameRequest.setFileName("Archivo xd")
            const result = await findFileByNamePromise(findFileByNameRequest)  as FindFileByNameResponse;

            res.json({  
                message: "Response received from remote service:",
                data: result.toObject()
            });
        } catch (error) {
           // await this.handleFallback(req, res);
        }
    }

    public async handleFallback(req: Request, res: Response) {
        RunAMQP(req, res);
    }
}
