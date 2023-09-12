import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import express from "express";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT;

app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const response = await getUsersController.handle();

  res.send(response.body).status(response.statusCode);
});

app.listen(port, () => console.log(`listening on port ${port}`));
