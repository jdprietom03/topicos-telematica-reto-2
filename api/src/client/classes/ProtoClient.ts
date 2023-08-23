import { context } from './../context';
import { loadSync } from '@grpc/proto-loader';
import { loadPackageDefinition, credentials, Client } from '@grpc/grpc-js';
import { ProductServiceClient } from '../../../generated/proto/Service_grpc_pb';
import { FileServiceClient } from '../../../generated/proto/FileService_grpc_pb';
import { Request, Response } from 'express';

type ServiceClientConstructor<T> = new (host: string, credentials: any) => T;

export abstract class ProtoClient<T extends any> {
    protected client?: T;

    constructor(clientType?: ServiceClientConstructor<T>) {
        if (clientType) {
            this.client = new clientType(context.GRPC_HOST, credentials.createInsecure());
        }
    }
}
