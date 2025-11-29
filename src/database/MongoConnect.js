import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let connected = false;

export async function connectToDataBase(dbName = "Catalogo_Carros") {
  try {
    if (!connected) {
      await client.connect();
      connected = true;
      console.log("✅ Conectado com sucesso ao MongoDB Atlas");
    }

    const database = client.db(dbName);
    return database;

  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB Atlas:", error);
    throw error;
  }
}
