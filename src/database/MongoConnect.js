import "dotenv/config";
import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function connectToDataBase() {
  try {
    await client.connect();
    console.log("✅ Conectado com sucesso ao MongoDB Atlas");

    const database = client.db("Catalogo_Carros");
    return database; // retorna o objeto do banco pra ser usado nos Models
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB Atlas:", error);
    throw error;
  }
}