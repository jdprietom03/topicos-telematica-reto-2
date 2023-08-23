import { ProtoService } from "./ProtoService";
import { ProductServiceService } from "../../../generated/proto/Service_grpc_pb";
import { Product, TransactionResponse } from "../../../generated/proto/Service_pb";
import {
    ServerUnaryCall,
    sendUnaryData
} from '@grpc/grpc-js';

export class ProductService extends ProtoService {

    constructor() {
        super(ProductServiceService as any);
    }

    private addProduct(
        call: ServerUnaryCall<Product, TransactionResponse>,
        callback: sendUnaryData<TransactionResponse>
    ): void {
        const response = new TransactionResponse();
        
        response.setStatusCode(400)
        console.log(response)

        callback(null, response);
    }

    public getMethods(): any {
        return {
            addProduct: this.addProduct
        }
    }
}