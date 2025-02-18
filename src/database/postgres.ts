import { Pool, PoolClient } from "pg";

export const PostgresClient = {
  client: undefined as unknown as Pool,
  db: undefined as unknown as PoolClient,

  async connect(): Promise<void> {
    // Se tiver URL completa, use ela
    if (process.env.POSTGRES_URL) {
      const client = new Pool({
        connectionString: process.env.POSTGRES_URL,
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? { rejectUnauthorized: false }
            : false,
      });

      this.client = client;
      this.db = await client.connect();
    }
    // Senão, use as credenciais individuais
    else {
      const client = new Pool({
        host: "localhost",
        port: 5432,
        database: "postgres",
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? { rejectUnauthorized: false }
            : false,
      });

      this.client = client;
      this.db = await client.connect();
    }

    console.log("PostgreSQL connected");
  },
};

export default PostgresClient;
