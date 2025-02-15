import {
  ICreateUsersRepository,
  CreateUserParams,
} from "../../controllers/create-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUserrepository implements ICreateUsersRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (user) {
      throw new Error("User already created");
    }

    const { _id, ...rest } = user!;

    return { id: _id.toHexString(), ...rest };
  }
}
