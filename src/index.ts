import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();
  const app = express();
  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const response = await getUsersController.handle();

    res.send(response.body).status(response.statusCode);
  });

  const port = process.env.PORT;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
