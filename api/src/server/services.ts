import { FileWrapperService } from './wrappers/FileWrapperService';
import { ProductWrapperService } from './wrappers/ProductWrapperService';
import { ProtoWrapperService } from './wrappers/ProtoWrapperService';

export const services: ProtoWrapperService[] = [
  new FileWrapperService(),
  new ProductWrapperService(),
];
