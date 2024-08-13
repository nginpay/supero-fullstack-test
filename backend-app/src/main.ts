import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';


declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const configService = new ConfigService();

  const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle(configService.get<string>('SYSTEM_API_TITLE'))
    .setDescription(configService.get<string>('SYSTEM_DESCRIPTION'))
    .setVersion(configService.get<string>('SYSTEM_VERSION'))
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );

  SwaggerModule.setup('api', app, swaggerDocument);

  app.enableCors();

  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
