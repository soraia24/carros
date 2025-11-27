import { connectToDataBase } from "../database/MongoConnect.js";

let userCollection = null;

export async function getUserCollection() {
  if (!userCollection) {
    const db = await connectToDataBase();
    userCollection = db.collection("Usuarios");
  }
  return userCollection;
}
