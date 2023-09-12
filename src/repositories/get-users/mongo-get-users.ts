import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Vinicius",
        lastName: "Bernardo",
        email: "vini383@gmail.com",
        password: "12345",
      },
    ];
  }
}
