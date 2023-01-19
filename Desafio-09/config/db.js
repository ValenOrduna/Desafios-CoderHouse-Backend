import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://valenordu:valenordu@cluster0.dezvmft.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("coderhouse");

export default db;
