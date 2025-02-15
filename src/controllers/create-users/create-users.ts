import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUsersController,
  ICreateUsersRepository,
} from "./protocols";

export class CreateUsersController implements ICreateUsersController {
  constructor(private readonly createUsersRepository: ICreateUsersRepository) {} // dependência injetada (readonly )

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return { statusCode: 400, body: "Please specify a body" };
      }

      const users = await this.createUsersRepository.createUser(
        httpRequest.body
      );

      return { statusCode: 201, body: users };
    } catch (error) {
      return { statusCode: 500, body: "Somenthing went wrong" };
    }
  }
}
