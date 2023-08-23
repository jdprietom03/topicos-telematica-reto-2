"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const callback_api_js_1 = __importDefault(require("amqplib/callback_api.js"));
const context_1 = require("./context");
const Run = async (request, response) => {
    callback_api_js_1.default.connect(`amqp://${context_1.context.RMQ_USER}:${context_1.context.RMQ_PASS}@${context_1.context.RMQ_HOST}`, (err, conn) => {
        if (err) {
            throw err;
        }
        publish(conn, request, response);
    });
};
exports.Run = Run;
const publish = (conn, request, response) => {
    conn.createChannel((err, channel) => {
        if (err) {
            throw err;
        }
        const { body, params, query, files } = request;
        const msg = JSON.stringify({ body, params, query, files });
        channel.assertExchange(context_1.context.RMQ_EXCHANGE, context_1.context.RMQ_TYPE, {
            durable: true
        });
        const isPublished = channel.publish(context_1.context.RMQ_EXCHANGE, "", Buffer.from(msg));
        if (isPublished) {
            response.send(" [x] Sent: " + msg);
            setTimeout(() => conn.close(), 100);
        }
    });
};
