import { config } from "dotenv";
import express from "express";
import { MongogetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-user";

config();

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}!`));

app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongogetUsersRepository();

  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});
