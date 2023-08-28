import { context } from './../context';
import { credentials } from '@grpc/grpc-js';

type ServiceClientConstructor<T> = new (host: string, credentials: any) => T;

export abstract class ProtoClient<T extends any> {
  protected client?: T;

  constructor(clientType?: ServiceClientConstructor<T>) {
    if (clientType) {
      this.client = new clientType(
        context.GRPC_HOST,
        credentials.createInsecure(),
      );
    }
  }
}
