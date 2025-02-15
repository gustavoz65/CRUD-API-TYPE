import { config } from "dotenv";
import express from "express";
import { MongogetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-user";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserrepository } from "./repositories/create-users/mongo-create-users";
import { CreateUsersController } from "./controllers/create-users/create-users";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongogetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  app.post("/userss", async (req, res) => {
    const mongoCreateUsersRepository = new MongoCreateUserrepository();

    const createUsersController = new CreateUsersController(
      mongoCreateUsersRepository
    );

    const { body, statusCode } = await createUsersController.handle({
      body: req.body,
    });

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT ?? 8000;
  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
