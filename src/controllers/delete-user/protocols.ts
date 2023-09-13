import { HttpRequest } from "./../protocols";
import { User } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface IDeleteUserController {
  handle(HttpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}
export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
