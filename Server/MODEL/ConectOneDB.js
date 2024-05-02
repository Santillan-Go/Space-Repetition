import { MongoClient, ServerApiVersion } from "mongodb";

const db_name="users_db";
const URI = process.env.ATLAS_URI || "mongodb+srv://santillango10405:JcAbGlpOSDkOQkh9@clustercarlos.8dtccyu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCarlos";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db(db_name);

export default db;