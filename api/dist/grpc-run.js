"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const grpc_services_1 = require("./grpc-services");
const amqp_run_1 = require("./amqp-run");
const util_1 = __importDefault(require("util"));
const Service_pb_1 = require("../generated/proto/Service_pb");
const Run = async (req, res) => {
    console.info("Consumer service is started...");
    const idProduct = 1;
    const client = grpc_services_1.Services.ProductService();
    try {
        const addProductPromise = util_1.default.promisify(client.addProduct).bind(client);
        const product = new Service_pb_1.Product();
        product.setIdProduct(idProduct);
        console.log(client);
        const result = await addProductPromise(product.toObject());
        console.log(result);
        res.json({
            message: "Response received from remote service:",
            data: result
        });
    }
    catch (error) {
        await handleFallback(req, res);
    }
};
exports.Run = Run;
const handleFallback = async (req, res) => {
    (0, amqp_run_1.Run)(req, res);
};
