import { User } from "../../models/user";
import { ServerError, badRequest, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const checkmsg = ", please check the body of the request.";
      const id = httpRequest?.params.id;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest("The user Id is missing" + checkmsg);
      }

      if (!body) {
        return badRequest("Fields are missing" + checkmsg);
      }

      const allowedFields: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowed = Object.keys(body).some(
        (key) => !allowedFields.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowed) {
        return badRequest("Some received Field is not allowed" + checkmsg);
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user);
    } catch {
      return ServerError();
    }
  }
}
