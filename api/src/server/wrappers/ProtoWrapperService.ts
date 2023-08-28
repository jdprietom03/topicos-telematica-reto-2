import { ServiceDefinition, UntypedServiceImplementation } from '@grpc/grpc-js';

export abstract class ProtoWrapperService {
  private service: ServiceDefinition<UntypedServiceImplementation>;

  constructor(service: ServiceDefinition<UntypedServiceImplementation>) {
    this.service = service;
  }

  public getService(): ServiceDefinition<UntypedServiceImplementation> {
    return this.service;
  }

  public abstract getMethods(): any;
}
