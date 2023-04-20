import { CustomTransportStrategy, Server } from '@nestjs/microservices';

export class GoogleCloudPubSubServer
  extends Server
  implements CustomTransportStrategy
{
  /**
   * This method is triggered when you run "app.listen()".
   */
  listen(callback: () => void) {
    callback();
  }

  /**
   * This method is triggered on application shutdown.
   */
  close() {}
}
