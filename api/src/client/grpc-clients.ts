import { FileClient } from './classes/FileClient';
import { ProductClient } from './classes/ProductClient';

export const Clients = {
  ProductClient: new ProductClient(),
  FileClient: new FileClient(),
};
