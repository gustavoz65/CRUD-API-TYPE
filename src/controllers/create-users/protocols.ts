import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface CreateUserParams {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICreateUsersController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface ICreateUsersRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
