import { User } from "../../models/user";

export interface CreateUserParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICreateUsersController {
  handle(): any;
}

export interface ICreateUsersRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
