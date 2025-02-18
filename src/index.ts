import { config } from "dotenv";
import express from "express";
import { PostgresGetUsersRepository } from "./repositories/get-users/postgres-get-users";
import { GetUsersController } from "./controllers/get-users/get-user";
import { PostgresClient } from "./database/postgres";
import { PostgresCreateUserRepository } from "./repositories/create-users/postgres-create-users";
import { CreateUsersController } from "./controllers/create-users/create-users";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await PostgresClient.connect();

  app.get("/users", async (req, res) => {
    const postgresGetUsersRepository = new PostgresGetUsersRepository();

    const getUsersController = new GetUsersController(
      postgresGetUsersRepository
    );

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  app.post("/users", async (req, res) => {
    const postgresGetUsersRepository = new PostgresCreateUserRepository();

    const createUsersController = new CreateUsersController(
      postgresGetUsersRepository
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
