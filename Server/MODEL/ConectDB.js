import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://santillango10405:JcAbGlpOSDkOQkh9@clustercarlos.8dtccyu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCarlos";

async function connectDB() {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    return client;
  } catch (err) {
    console.log(`Error to connect to DB`);
    throw err;
  }
}

async function desconnectDB(client) {
  client.close();
  console.log("Disconnect to DB");
}

export { connectDB, desconnectDB };
