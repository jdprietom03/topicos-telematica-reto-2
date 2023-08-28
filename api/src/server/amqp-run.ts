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
  
      amqpChannel.consume('list_service', this.onListService, undefined, (err, ok) => {
        console.log(ok.consumerTag, err)
      });
      amqpChannel.consume('find_service', this.onFindService);

      this.channel = channel;
   })
  }

  private onListService(msg: Message | null) {
    const files = new FileService().listFiles();

    this.publish(files, msg);
  }

  private onFindService(msg: Message | null) {
    if (!msg) {
      return;
    }

    const files = new FileService().findFileByName(
      msg.content.toString('utf-8'),
    );

    this.publish(files, msg);
  }

  private publish(response: any, msg: Message | null): void {
    if (!this.channel) {
      return;
    }

    const amqpChannel = this.channel;

    if (!amqpChannel || !msg) {
      return;
    }

    const { replyTo, correlationId } = msg.properties;

    amqpChannel.publish('', replyTo, Buffer.from(response), { correlationId });

    amqpChannel.ack(msg);
  }
}
