import { ICreateUsersController, ICreateUsersRepository } from "./protocols";

export class CreateUsersController implements ICreateUsersController {
  constructor(private readonly createUsersRepository: ICreateUsersRepository) {} // dependência injetada (readonly )
  handle() {
    throw new Error("Method not implemented.");
  }
}
