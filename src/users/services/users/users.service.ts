import { Address } from '@app/typeorm/entities/Address';
import { Post } from '@app/typeorm/entities/Post';
import { Profile } from '@app/typeorm/entities/Profile';
import { User } from '@app/typeorm/entities/User';
import {
  CreateUserAddressParams,
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from '@app/utils/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  getUsers() {
    return this.userRepository.find({
      relations: ['profile', 'posts', 'address'],
    });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
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
