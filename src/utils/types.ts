export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
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
