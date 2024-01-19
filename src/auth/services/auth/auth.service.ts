import { UsersService } from '@app/users/services/users/users.service';
import { comparePasswords } from '@app/utils/bcrypt';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  async validateUser(username: string, password: string) {
    const userDB = await this.userService.getUserByUsername(username);
    if (userDB && comparePasswords(password, userDB.password)) {
      console.log('User Validation Success!');
      return userDB;
    }
    console.log('User Validation Failed!');
    return null;
  }
}
