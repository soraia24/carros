import { ObjectId } from "mongodb";
import { getUserCollection } from "../models/UsuarioModel.js";

// Listar todos
export async function listarUsuarios() {
  const col = await getUserCollection();
  return col.find({}).toArray();
}

// Buscar por ID
export async function buscarUsuario(id) {
  if (!ObjectId.isValid(id)) return null;

  const col = await getUserCollection();
  return col.findOne({ _id: new ObjectId(id) });
}

// Cadastrar
export async function cadastrarUsuario(usuario) {
  const col = await getUserCollection();

  const result = await col.insertOne(usuario);

  // Retorna documento completo, mais seguro
  return await col.findOne({ _id: result.insertedId });
}

// Atualizar
export async function atualizarUsuario(id, dados) {
  if (!ObjectId.isValid(id)) return null;

  const col = await getUserCollection();

  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: dados }
  );

  return await col.findOne({ _id: new ObjectId(id) });
}

// Deletar
export async function deletarUsuario(id) {
  if (!ObjectId.isValid(id)) return false;

  const col = await getUserCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

// Buscar por login
export async function buscarPorLogin(login) {
  const col = await getUserCollection();
  return col.findOne({ login });
}
