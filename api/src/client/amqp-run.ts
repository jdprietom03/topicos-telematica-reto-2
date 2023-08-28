import amqp, { Channel, Connection, Message } from 'amqplib/callback_api.js';
import { context } from './context';
import { Request, Response, response } from 'express';
import { v4 as uuid } from 'uuid';

export default class AMQPClient {
  private correlationId: string | undefined;
  private response: object | undefined;
  private connection: Connection | undefined;
  private channel: Channel | undefined;
  private route: string;
  private replyTo: string;
  private req: Request;
  private res: Response;

  constructor(route: string, req: Request, res: Response) {
    this.route = route;
    this.replyTo = '';
    this.req = req;
    this.res = res;
    this.init();
  }

  public init() {
    amqp.connect(
      `amqp://${context.RMQ_USER}:${context.RMQ_PASS}@${context.RMQ_HOST}`,
      (err, conn) => {
        if (err) {
          throw err;
        }

        this.publish(conn);
      },
    );
  }

  private publish(conn: Connection) {
    conn.createChannel((err, channel) => {
      const amqpChannel = channel;

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
          amqpChannel.consume(this.replyTo, this.onResponse);
        },
      );

      this.channel = channel;

      this.run();
    });
  }

  public run() {
    const amqpChannel = this.channel;

      if (!amqpChannel) {
        return;
      }

      const { body } = this.req;
      this.correlationId = uuid();
      this.response = undefined;
      const msg = JSON.stringify(body) || "";
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
        this.res.send(this.response);

        setTimeout(() => {
          if (this.connection && this.channel) {
            this.connection.close();
            amqpChannel.close(() => {});
          }
        }, 200);
      }
  }

  public onResponse(msg: Message | null): void {
    if (msg && msg.properties.correlationId == this.correlationId) {
      this.response = response;
    }
  }
}
