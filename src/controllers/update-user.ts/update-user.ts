import { User } from "../../models/user";
import { CreateUserParams } from "../create-user.ts/protocols";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Provided Id was not found.",
        };
      }

      const allowedFields: (keyof CreateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowed = Object.keys(body).some(
        (key) => !allowedFields.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowed) {
        return {
          statusCode: 400,
          body: "Some received Field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch {
      return {
        statusCode: 500,
        body: "Something Went wrong",
      };
    }
  }
}
