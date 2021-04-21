import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://admin:33xfCJQPBZTzqQen@cluster0.s2yuj.mongodb.net/roa-community?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function connect() {
  if (!client.isConnected()) await client.connect();
  const db = client.db("roa-community");
  return { db, client };
}

export { connect };
