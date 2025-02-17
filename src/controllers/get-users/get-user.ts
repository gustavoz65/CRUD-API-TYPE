import { IGetUsersController, IGetUsersRepository } from "./protocols";

// dependência Injetada
export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      // validar requisição
      // buscar usuários === Direciona chamada para repository
      const user = await this.getUsersRepository.getUsers();

      return { statusCode: 500, body: user };
    } catch (error) {
      return { statusCode: 500, body: "Somenthingggggggg went wrong" };
    }
  }
}
