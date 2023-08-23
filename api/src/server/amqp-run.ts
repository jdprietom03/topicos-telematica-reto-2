import amqp, { Connection } from 'amqplib/callback_api.js';
import { context } from './context';
import { Request, Response } from 'express';

export const Run = async (request: Request, response: Response) => {
    amqp.connect(`amqp://${context.RMQ_USER}:${context.RMQ_PASS}@${context.RMQ_HOST}`, (err, conn) => {
        if (err) {
            throw err;
        }

        publish(conn, request, response);
    });
} 

const publish = (conn: Connection, request: Request, response: Response) => {
    conn.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        const { body, params, query, files } = request;

        const msg = JSON.stringify({ body, params, query, files });

        channel.assertExchange(context.RMQ_EXCHANGE, context.RMQ_TYPE, {
            durable: true
        });

        const isPublished = channel.publish(context.RMQ_EXCHANGE, "", Buffer.from(msg));

        if (isPublished) {
            response.send(" [x] Sent: " + msg);
            setTimeout( () => conn.close(), 100);
        }
    });
}