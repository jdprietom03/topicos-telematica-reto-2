import amqp, { Channel, Connection, Message } from 'amqplib/callback_api.js';
import { context } from './context';
import { Request, Response, response } from 'express';
import { v4 as uuid } from 'uuid';

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

export default class AMQPClient {
  private correlationId: string | undefined;
  private response: object | undefined;
  private connection: Connection | undefined;
  private channel: AMQPChannel | undefined;
  private route: string;
  private replyTo: string;

  constructor(route: string) {
    this.route = route;
    this.replyTo = '';
    this.init();
    this.publish();
  }

  private init = async () => {
    amqp.connect(
      `amqp://${context.RMQ_USER}:${context.RMQ_PASS}@${context.RMQ_HOST}`,
      (err, conn) => {
        if (err) { 
          throw err;
        }

        this.channel = AMQPChannel.getInstance(conn);
      },
    );
  };

  private publish(): void {
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
  }

  public run(request: Request, response: Response) {
    if (!this.channel) {
      return;
    }

    const amqpChannel = this.channel.getChannel();

    if (!amqpChannel) {
      return;
    }

    const { body } = request;
    this.correlationId = uuid();
    this.response = undefined;

    const published = amqpChannel.publish(
      context.RMQ_EXCHANGE,
      this.route,
      Buffer.from(JSON.stringify(body)),
      {
        replyTo: this.replyTo,
        correlationId: this.correlationId,
      },
    );

    if (published) {
      response.send(this.response);

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
