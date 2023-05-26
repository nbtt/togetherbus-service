import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-expection.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true, },
    forbidNonWhitelisted: true,
  }));
  const config = new DocumentBuilder()
      .setTitle("TOBUS API")
      .setDescription("Api for together bus")
      .setVersion('0.5.0')
      .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api",app,document);
  await app.listen(3000);
}
bootstrap();
