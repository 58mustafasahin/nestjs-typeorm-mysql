import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './typeorm/entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
  //app.setGlobalPrefix('api'); //global url path http://localhost:3000/api
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'ASDASDASDASD',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors(); //activate Cors
  const options = new DocumentBuilder()
    .setTitle('Nestjs Example')
    .setDescription('Nestjs Description')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local environment')
    // .addServer('http://localhost:3001', 'Staging')
    // .addServer('http://localhost:3002', 'Production')
    .addTag('Tag Example')
    // .addGlobalParameters({
    //   name: 'country',
    //   in: 'query',
    // })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  //to access swagger interface link is created like this http://localhost:3000/api-docs
  await app.listen(3000);
}
bootstrap();
