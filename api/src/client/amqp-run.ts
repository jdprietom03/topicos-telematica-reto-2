import amqp, { Channel, Connection, Message } from 'amqplib/callback_api.js';
import { context } from './context';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { logger } from '../server/context';

export default class AMQPClient {
  private correlationId: string | undefined;
  private response: string = '';
  private connection: Connection | undefined;
  private channel: Channel | null = null;
  private route: string;
  private replyTo: string;
  private res: Response;
  private req: Request;

  constructor(route: string, req: Request, res: Response) {
    this.route = route;
    this.replyTo = '';
    this.res = res;
    this.publish().then( () => this.run());
  }

  public async init() {
    amqp.connect(
      `amqp://${context.RMQ_USER}:${context.RMQ_PASS}@${context.RMQ_HOST}`,
      (err, conn) => {
        if (err) {
          throw err;
        }

        this.connection = conn;
        conn.createChannel((err, channel) => {
          this.channel = channel;
        });
      },
    );
  }

  private async publish() {
    const amqpChannel = this.channel;

    if (!amqpChannel) {
      return;
    }

    amqpChannel.assertExchange(context.RMQ_EXCHANGE, context.RMQ_TYPE, {
      durable: true,
    });

    amqpChannel.assertQueue(
      '',
      {
        exclusive: true,
      },
      (err, ok) => {
        this.replyTo = ok.queue;
        amqpChannel.consume(this.replyTo, this.onResponse.bind(this), {
          noAck: false,
        });
      },
    );
  }

  public run() {
    const amqpChannel = this.channel;

    if (!amqpChannel) {
      return;
    }

    const { body } = this.req;
    this.correlationId = uuid();
    this.response = '';
    const msg = JSON.stringify(body) || '';
    const published = amqpChannel.publish(
      context.RMQ_EXCHANGE,
      this.route,
      Buffer.from(msg),
      {
        replyTo: this.replyTo,
        correlationId: this.correlationId,
      },
    );

    if (published) {
      setTimeout(() => {
        if (this.connection) {
            this.connection.close();
        }

        amqpChannel.close(() => {});
      }, 1000);
    }
  }

  public onResponse(msg: Message | null): void {
    if (msg && msg.properties.correlationId == this.correlationId) {
      this.response = msg.content.toString('utf-8') as string;
      logger.info('WITH RESPONSE: ' + this.response);
      this.res.send(JSON.parse(this.response));
    }
  }
}
