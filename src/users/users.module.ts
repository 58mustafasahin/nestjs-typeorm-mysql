import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/typeorm/entities/User';
import { Profile } from '@app/typeorm/entities/Profile';
import { Post } from '@app/typeorm/entities/Post';
import { Address } from '@app/typeorm/entities/Address';

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
export class UsersModule {}
