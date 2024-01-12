import { Exclude } from "class-transformer";

export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export class SerializedUserParams {
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUserParams>){
    Object.assign(this, partial);
  }
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
};

export type CreateUserPostParams = {
  title: string;
  description: string;
};

export type CreateUserAddressParams = {
  line1: string;
  line2: string;
  zip: string;
  city: string;
  state: string;
};
