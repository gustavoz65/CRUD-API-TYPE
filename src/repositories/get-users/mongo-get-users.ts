import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongogetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        id: "1",
        firstname: "Fulano",
        lastname: "Silva",
        email: "teste@example.com",
        password: "1234",
      },
    ];
  }
}
