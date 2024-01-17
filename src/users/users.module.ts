import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/typeorm/entities/User';
import { Profile } from '@app/typeorm/entities/Profile';
import { Post } from '@app/typeorm/entities/Post';
import { Address } from '@app/typeorm/entities/Address';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Address])],
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
