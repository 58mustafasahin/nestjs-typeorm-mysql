import { CreateUserDto } from '@app/users/dtos/CreateUser.dto';
import { CreateUserAddressDto } from '@app/users/dtos/CreateUserAddress.dto';
import { CreateUserPostDto } from '@app/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from '@app/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from '@app/users/dtos/UpdateUser.dto';
import { UsersService } from '@app/users/services/users/users.service';
import { SerializedUserParams } from '@app/utils/types';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }

  @Post(':id/addresses')
  createUserAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserAddressDto: CreateUserAddressDto,
  ) {
    return this.userService.createUserAddress(id, createUserAddressDto);
  }
}
