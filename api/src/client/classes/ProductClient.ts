import AMQPClient from './../amqp-run';
import util from 'util';
import { Request } from 'express-serve-static-core';
import { Response } from 'express';
import {
  Product,
  TransactionResponse,
} from './../../../generated/proto/Service_pb';
import { ProtoClient } from './ProtoClient';
import { ProductServiceClient } from '../../../generated/proto/Service_grpc_pb';

export class ProductClient extends ProtoClient<ProductServiceClient> {
  constructor() {
    super(ProductServiceClient);
  }

  public async addProduct(req: Request, res: Response) {
    if (!this.client) {
      return;
    }

    const idProduct = 3;

    try {
      const addProductPromise = util
        .promisify(this.client.addProduct)
        .bind(this.client);
      const product: Product = new Product();
      product.setIdProduct(idProduct);

      const result = (await addProductPromise(product)) as TransactionResponse;

      res.json({
        message: 'Response received from remote service:',
        data: result.toObject(),
      });
    } catch (error) {
      await this.handleFallback('', req, res);
    }
  }

  public async handleFallback(route: string, req: Request, res: Response) {
    const client = new AMQPClient(route, req, res);
  }
}
