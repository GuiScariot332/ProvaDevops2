import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não existem no DTO
      forbidNonWhitelisted: true, // erro 400 se enviarem campos extras
      transform: true, // converte tipos automaticamente
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Fornecedores')
    .setDescription('CRUD de fornecedores - Exercício II de DevOps')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`API rodando na porta ${port} | Swagger em /docs`);
}
bootstrap();
