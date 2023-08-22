import { Services } from "./grpc-services.js";
import { Run as RunAMQP } from "./amqp-run.js";
import util from "util";
import { Request } from "express-serve-static-core";
import { Response } from "express";

export const Run = async (req: Request, res: Response) => {
    console.info("Consumer service is started...")

    const idProduct = 1;
    const client = Services.ProductService();

    try {
        const addProductPromise = util.promisify(client.AddProduct).bind(client);
        const result = await addProductPromise({ id_product: idProduct });

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