import { User } from '@app/typeorm/entities/User';
import { UsersService } from '@app/users/services/users/users.service';
import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('Serialize User');
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('Deserialize User');
    const userDB = await this.userService.getUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
