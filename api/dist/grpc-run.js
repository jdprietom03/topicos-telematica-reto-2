import { Services } from "./grpc-services.js";
import { Run as RunAMQP } from "./amqp-run.js";
import util from "util";
import { Product } from "../generated/proto/Service_pb";
export const Run = async (req, res) => {
    console.info("Consumer service is started...");
    const idProduct = 1;
    const client = Services.ProductService();
    try {
        const addProductPromise = util.promisify(client.addProduct).bind(client);
        const product = new Product();
        product.setIdProduct(idProduct);
        const result = await addProductPromise(product);
        res.json({
            message: "Response received from remote service:",
            data: result
        });
    }
    catch (error) {
        await handleFallback(req, res);
    }
};
const handleFallback = async (req, res) => {
    RunAMQP(req, res);
};
