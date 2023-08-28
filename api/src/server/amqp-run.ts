import amqp, { Channel, Connection, Message } from 'amqplib/callback_api.js';
import { context } from './context';
import { Request, Response, response } from 'express';
import { v4 as uuid } from 'uuid';
import FileService from './services/FileService';

export default class AMQPServer {
  private channel: Channel | null = null;

  constructor() {}

  public run = async () => {
    amqp.connect(
      `amqp://${context.RMQ_USER}:${context.RMQ_PASS}@${context.RMQ_HOST}`,
      (err, conn) => {
        if (err) {
          console.log(
            err,
            `amqp://${context.RMQ_USER}:${context.RMQ_PASS}@${context.RMQ_HOST}`,
          );
          throw err;
        }

        this.init(conn);
      },
    );
  };

  private init(conn: Connection): void {
   conn.createChannel((err, channel) => {
      const amqpChannel = channel;
  
      if (!amqpChannel) {
        return;
      }
  
      amqpChannel.consume('list_service', (msg) => {
        this.onListService(amqpChannel, msg);
      });
      amqpChannel.consume('find_service', (msg) => {
        this.onFindService(amqpChannel, msg);
      });
   })
  }

  private onListService(channel: Channel, msg: Message | null) {
    const files = new FileService().listFiles();
    console.log("LISTING SERVICE: ")
    this.publish(channel, files, msg);
  }

  private onFindService(channel: Channel, msg: Message | null) {
    if (!msg) {
      return;
    }
    console.log("FINDING SERVICE: ")

    const files = new FileService().findFileByName(
      msg.content.toString('utf-8'),
    );

    this.publish(channel, files, msg);
  }

  private publish(channel: Channel, response: any, msg: Message | null): void {

    const amqpChannel = channel;

    if (!amqpChannel || !msg) {
      return;
    }

    const { replyTo, correlationId } = msg.properties;

    console.log("SENT: ", response)

    amqpChannel.sendToQueue(replyTo,  Buffer.from(response), { correlationId })

    amqpChannel.ack(msg);
  }
}
