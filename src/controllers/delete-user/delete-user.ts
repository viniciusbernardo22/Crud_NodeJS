import { User } from "../../models/user";
import { ServerError, badRequest, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = HttpRequest?.params?.id;
      if (!id) {
        return badRequest(
          "The user was not deleted because the ID was not found on the DataBase"
        );
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok<User>(user);
    } catch (e) {
      return ServerError();
    }
  }
}
