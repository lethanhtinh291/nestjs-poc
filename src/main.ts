import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });

  const config = app.get(ConfigService);
  const host = config.get<string>('server.host');
  const port = config.get<number>('server.port');
  const configSwagger = new DocumentBuilder()
    .setTitle('POC Project')
    .setDescription('The POC Project NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    configSwagger,
    options,
  );
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, host, async (): Promise<void> => {
    Logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap().catch((error) => error);
