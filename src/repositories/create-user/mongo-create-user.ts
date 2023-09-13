import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-user.ts/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUser implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const collection = MongoClient.db.collection("users");

    const { insertedId } = await collection.insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not Created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
