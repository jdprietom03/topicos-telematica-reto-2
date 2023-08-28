import amqp, { Channel, Connection, Message } from 'amqplib/callback_api.js';
import { context } from './context';
import { Request, Response, response } from 'express';
import { v4 as uuid } from 'uuid';
import FileService from './services/FileService';

class AMQPChannel {
  private static instance: AMQPChannel;
  private channel: Channel | undefined;

  private constructor(conn: Connection) {
    this.initChannel(conn);
  }

  public static getInstance(conn: Connection): AMQPChannel {
    if (!AMQPChannel.instance) {
      AMQPChannel.instance = new AMQPChannel(conn);
    }
    return AMQPChannel.instance;
  }

  private initChannel(conn: Connection): void {
    conn.createChannel((err, channel) => {
      if (err) {
        throw err;
      }
      this.channel = channel;
    });
  }

  public getChannel(): Channel | undefined {
    return this.channel;
  }
}

export default class AMQPServer {
  private channel: AMQPChannel | undefined;

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

        this.channel = AMQPChannel.getInstance(conn);
        this.init();
      },
    );
  };

  private init(): void {
    if (!this.channel) {
      return;
    }

    const amqpChannel = this.channel.getChannel();

    if (!amqpChannel) {
      return;
    }

    amqpChannel.assertExchange(context.RMQ_EXCHANGE, context.RMQ_TYPE, {
      durable: true,
    });

    amqpChannel.consume('list_service', this.onListService);
    amqpChannel.consume('find_service', this.onFindService);
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

    const amqpChannel = this.channel.getChannel();

    if (!amqpChannel || !msg) {
      return;
    }

    amqpChannel.assertExchange(context.RMQ_EXCHANGE, context.RMQ_TYPE, {
      durable: true,
    });

    const { replyTo, correlationId } = msg.properties;

    amqpChannel.publish('', replyTo, Buffer.from(response), { correlationId });

    amqpChannel.ack(msg);
  }
}
