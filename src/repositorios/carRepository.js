import { ObjectId } from "mongodb";
import { getCarCollection } from "../models/CarModel.js";

// Inicializar banco
export async function initDB() {
  await getCarCollection();
  console.log("Banco de dados 'Catalogo_Carros' pronto para uso.");
}

// Listar carros
export async function listarCar() {
  const collection = await getCarCollection();
  return await collection.find({}).toArray();
}

// Cadastrar carro
export async function cadastrarCar(car) {
  const collection = await getCarCollection();
  const result = await collection.insertOne(car);
  return { id: result.insertedId, ...car };
}

// Buscar por ID
export async function buscarCar(id) {
  const collection = await getCarCollection();
  return await collection.findOne({ _id: new ObjectId(id) });
}

// Atualizar carro
export async function atualizarCar(id, dados) {
  const collection = await getCarCollection();

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: dados }
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return await collection.findOne({ _id: new ObjectId(id) });
}

// Deletar carro
export async function deletarCar(id) {
  const collection = await getCarCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// Buscar por marca
export async function buscarPorMarca(marca) {
  const collection = await getCarCollection();
  return await collection.find({ marca }).toArray();
}

// 🔎 Buscar por chassi
export async function buscarPorChassi(chassi) {
  const collection = await getCarCollection();
  return await collection.findOne({ chassi });
}

export async function buscarCarrosIguais({ marca, modelo, ano, cor, preco }) {
  const collection = await getCarCollection();
  return await collection.find({
    marca, modelo, ano, cor, preco
  }).toArray();
}
