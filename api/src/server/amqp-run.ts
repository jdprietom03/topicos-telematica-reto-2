import amqp, { Channel, Connection, Message } from 'amqplib/callback_api.js';
import { context } from './context';
import FileService from './services/FileService';
import { logger } from '../client/context';

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
    });
  }

  private onListService(channel: Channel, msg: Message | null) {
    const files = new FileService().listFiles();
    logger.info('LIST SERVICE for ', msg?.properties.correlationId);
    this.publish(channel, files, msg);
  }

  private onFindService(channel: Channel, msg: Message | null) {
    if (!msg) {
      return;
    }
    
    logger.info('FIND SERVICE for ', msg?.properties.correlationId);

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

    amqpChannel.sendToQueue(replyTo, Buffer.from(response), { correlationId });

    amqpChannel.ack(msg);
  }
}
