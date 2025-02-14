import { config } from "dotenv";
import express from "express";
import { MongogetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-user";
import { MongoClient } from "./database/mongo";

config();

const main = async () => {
  const app = express();

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongogetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT ?? 8000;
  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
