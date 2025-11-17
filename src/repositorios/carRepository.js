import { ObjectId } from "mongodb"; 
import {connectToDataBase} from "../database/MongoConnect.js";
 
export async function initDB() { 
  const db = await connectToDataBase();
  console.log("Banco de dados 'Catalogo_Carros' pronto para uso.");
}


// Listar Carros
export async function listarCar() {
  const db =  await connectToDataBase();
  const cars = await db.collection("Carros").find({}).toArray();
  return cars
}

// Cadastrar Carro
export async function cadastrarCar(car) {
  const db =  await connectToDataBase();
  const result = await db.collection("Carros").insertOne(car);
  return { id: result.insertedId, ...car };
}

// Buscar por id
export async function buscarCar(id) {
  const db =  await connectToDataBase();
  const car = await db.collection("Carros").findOne({ _id: new ObjectId(id) });
  return car;
}

// Atualizar carro
export async function atualizarCar(id, dados) {
  const db = await connectToDataBase();
  
  // Usa updateOne em vez de findOneAndUpdate pra evitar retorno nulo
  const result = await db.collection("Carros").updateOne(
    { _id: new ObjectId(id) },
    { $set: dados }
  );

  if (result.matchedCount === 0) {
    // Nenhum carro encontrado com esse ID
    return null;
  }

  // Retorna o documento atualizado manualmente
  const carroAtualizado = await db.collection("Carros").findOne({ _id: new ObjectId(id) });
  return carroAtualizado;
}

// Deletar filme
export async function deletarCar(id) {
  const db =  await connectToDataBase();
  const result = await db.collection("Carros").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

//buscar por modelo  
export async function buscarPorMarca(marca) {
  const db = await connectToDataBase();
  const cars = await db.collection("Carros").find({ marca });
  return cars;
}