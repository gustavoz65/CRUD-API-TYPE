import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";
import { PostgresClient } from "../../database/postgres";

export class PostgresGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const result = await PostgresClient.db.query("SELECT * FROM users");

    return result.rows.map(({ id, ...rest }) => ({
      ...rest,
      id: id.toString(),
    }));
  }
}
