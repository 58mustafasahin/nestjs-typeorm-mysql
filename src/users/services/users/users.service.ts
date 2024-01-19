import { Address } from '@app/typeorm/entities/Address';
import { Post } from '@app/typeorm/entities/Post';
import { Profile } from '@app/typeorm/entities/Profile';
import { User } from '@app/typeorm/entities/User';
import { encodePassword } from '@app/utils/bcrypt';
import {
  CreateUserAddressParams,
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  SerializedUserParams,
  UpdateUserParams,
} from '@app/utils/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private userProfileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private userPostRepository: Repository<Post>,
    @InjectRepository(Address)
    private userAddressRepository: Repository<Address>,
  ) {}

  async getUsers() {
    return (
      await this.userRepository.find({
        relations: ['profile', 'posts', 'address'],
      })
    ).map((user) => plainToClass(SerializedUserParams, user));
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username: username });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    return user;
  }

  createUser(userDetails: CreateUserParams) {
    const password = encodePassword(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
      createdAt: new Date(),
    });
    this.userRepository.save(newUser);
  }

  updateUser(id: number, userDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    userProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot Create Profile',
        HttpStatus.BAD_REQUEST,
      );

    const newProfile = this.userProfileRepository.create(userProfileDetails);
    const savedProfile = await this.userProfileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(id: number, userPostDetails: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot Create Post',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.userPostRepository.create({
      ...userPostDetails,
      user,
    });
    return this.userPostRepository.save(newPost);
  }

  async createUserAddress(
    id: number,
    userAddressDetails: CreateUserAddressParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot Create Address',
        HttpStatus.BAD_REQUEST,
      );

    const newAddress = this.userAddressRepository.create(userAddressDetails);
    const savedAddress = await this.userAddressRepository.save(newAddress);
    user.address = savedAddress;
    return this.userRepository.save(user);
  }
}
