import { connectToDataBase } from "../dtos/MongoConnect.js";

export async function getCarCollection() {
  const db = await connectToDataBase();
  return db.collection("Carros"); 
}
