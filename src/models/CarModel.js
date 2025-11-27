import { connectToDataBase } from "../database/MongoConnect.js";

export async function getCarCollection() {
  const db = await connectToDataBase();
  return db.collection("Carros"); 
}
