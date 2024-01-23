import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';
import { NextFunction, Request, Response } from 'express';
import entities from '@app/typeorm/entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateUserMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('Last Middleware');
          next();
        },
      )
      // .exclude({
      //   path: '/users',
      //   method: RequestMethod.GET,
      // })
      .forRoutes(UsersController);
  }
}
