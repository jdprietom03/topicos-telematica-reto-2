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

  public static async getInstance(conn: Connection): Promise<AMQPChannel> {
    if (!AMQPChannel.instance) {
      AMQPChannel.instance = new AMQPChannel(conn);

      await AMQPChannel.instance.initializeChannel();
    }
    return AMQPChannel.instance;
  }

  public async initializeChannel() {
    return new Promise<void>((resolve, reject) => {
      if (this.channel) {
        resolve();
      } else {
        reject(new Error('Canal no inicializado'));
      }
    });
  }

  private initChannel(conn: Connection): void {
    conn.createChannel((err, channel) => {
      if (err) {
        throw err;
      }
      this.channel = channel;
    });
  }

  public getChannel(): Channel {
    if (!this.channel) {
      throw new Error('Canal no inicializado');
    }
    return this.channel;
  }
}

export default class AMQPClient {
  private correlationId: string | undefined;
  private response: object | undefined;
  private connection: Connection | undefined;
  private channel: AMQPChannel | null = null;
  private route: string;
  private replyTo: string;

  constructor(route: string) {
    this.route = route;
    this.replyTo = '';
    this.init();
    this.publish();
  }

  private async init() {
    return new Promise<void>((resolve, reject) => {
      amqp.connect(
        `amqp://${context.RMQ_USER}:${context.RMQ_PASS}@${context.RMQ_HOST}`,
        (err, conn) => {
          if (err) {
            reject(err);
          } else {
            AMQPChannel.getInstance(conn)
              .then((amqpChannel) => {
                this.channel = amqpChannel;
                resolve();
              })
              .catch(reject);
          }
        },
      );
    });
  }

  private async publish() {
    if (!this.channel) {
      return;
    }

    await this.channel.initializeChannel();
    
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

  public async run(request: Request, response: Response) {
    if (!this.channel) {
      return;
    }

    await this.channel.initializeChannel();
    
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
