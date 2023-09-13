import { MongoClient as Mongo, Db, WithId } from "mongodb";
import { MongoUser } from "../repositories/mongo-protocols";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:27017";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;

    console.log("connected");
  },

  MapId(user: WithId<MongoUser>) {
    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  },
};
