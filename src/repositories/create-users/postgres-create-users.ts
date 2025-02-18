import {
  ICreateUsersRepository,
  CreateUserParams,
} from "../../controllers/create-users/protocols";
import { PostgresClient } from "../../database/postgres";
import { User } from "../../models/user";

export class PostgresCreateUserRepository implements ICreateUsersRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    // Primeiro, verifica se o usuário já existe
    const existingUser = await PostgresClient.db.query(
      "SELECT * FROM users WHERE id = $1",
      [params.id]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("User already created");
    }

    // Insere o novo usuário
    const result = await PostgresClient.db.query(
      "INSERT INTO users(id, name, email) VALUES($1, $2, $3) RETURNING *",
      [
        params.id,
        params.firstname,
        params.lastname,
        params.password,
        params.email,
      ]
    );

    const { _id, ...rest } = result.rows[0];

    return {
      id: _id.toString(),
      ...rest,
    };
  }
}
