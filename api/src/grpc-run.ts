import { Services } from "./grpc-services";
import { Run as RunAMQP } from "./amqp-run";
import util from "util";
import { Request } from "express-serve-static-core";
import { Response } from "express";
import { Product } from "../generated/proto/Service_pb";

export const Run = async (req: Request, res: Response) => {
    console.info("Consumer service is started...")

    const idProduct = 1;
    const client = Services.ProductService();

    try {
        const addProductPromise = util.promisify(client.addProduct).bind(client);
        const product: Product = new Product();
        product.setIdProduct(idProduct);
        
        const result = await addProductPromise(product);

        res.json({ 
            message: "Response received from remote service:",
            data: result
        });
    } catch (error) {
        await handleFallback(req, res);
    }
}

const handleFallback = async (req: Request, res: Response) => {
    RunAMQP(req, res);
}