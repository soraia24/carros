import { connectToDataBase } from "../database/MongoConnect.js";

let userCollection = null;

export async function getUserCollection() {
  if (!userCollection) {
    const db = await connectToDataBase("Catalogo_Usuarios");
    userCollection = db.collection("Usuarios");
  }
  return userCollection;
}
