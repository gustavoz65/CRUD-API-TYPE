import { MongoClient as Mongo, Db } from "mongodb";

//db e client podem ser undfined caso a conexão não tenha sido realizada
export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGO_URL ?? "mongodb://localhost:27017"; // leitura das variaveis do banco
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;
  },
};
