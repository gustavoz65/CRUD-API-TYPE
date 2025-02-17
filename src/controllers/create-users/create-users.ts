import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUsersController,
  ICreateUsersRepository,
} from "./protocols";

export class CreateUsersController implements ICreateUsersController {
  constructor(private readonly createUsersRepository: ICreateUsersRepository) {} // Dependência injetada

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body || Object.keys(httpRequest.body).length === 0) {
        return { statusCode: 400, body: "Please specify a valid body" };
      }

      const user = await this.createUsersRepository.createUser(
        httpRequest.body
      );

      return { statusCode: 201, body: user };
    } catch (error) {
      console.error("Error in CreateUsersController:", error);
      return {
        statusCode: 500,
        body: "Something went wrong. Please try again later.",
      };
    }
  }
}
