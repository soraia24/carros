import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Define o caminho da pasta database
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbFolder = join(__dirname, '..', 'database');

// Garante que a pasta src/database exista
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

// Caminho do arquivo JSON
const file = join(dbFolder, 'usuarios.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { usuarios: [] }); // 👈 Aqui está o dado padrão obrigatório!

// Inicializa o banco de dados
export async function initDB() {
  await db.read();
  db.data ||= { usuarios: [] }; // garante que nunca fique undefined
  await db.write();
}

// Listar usuarios
export async function listarUsuarios() {
  await db.read();
  return db.data.usuarios;
}

// Buscar por id
export async function buscarUsuarios(id) {
  await db.read();
  return db.data.usuarios.find(u => u.id === Number(id)) || null;
}

// Cadastrar usuarios
export async function cadastrarUsuarios(usuario) {
  await db.read();
  const senhaHash = await bcrypt.hash(String(usuario.senha), 10);
  const novo = {
    id: db.data.usuarios.length ? Math.max(...db.data.usuarios.map(u => u.id)) + 1 : 1,
    ...usuario,
    senha: senhaHash
  };
  db.data.usuarios.push(novo);
  await db.write();
  return novo;
}


// Atualizar usuarios
export async function atualizarUsuarios(id, dados) {
  await db.read();

  const index = db.data.usuarios.findIndex(u => u.id === Number(id));
  if (index === -1) return null;

  const usuarioExistente = db.data.usuarios[index];

  // Se enviou nova senha, faz o hash
  let senhaAtualizada = usuarioExistente.senha;
  if (dados.senha) {
    senhaAtualizada = await bcrypt.hash(String(dados.senha), 10);
  }

  // Atualiza apenas o que foi enviado
  db.data.usuarios[index] = {
    ...usuarioExistente,
    ...dados,
    senha: senhaAtualizada
  };

  await db.write();
  return db.data.usuarios[index];
}


// Deletar usuarios
export async function deletarUsuarios(id) {
  await db.read();
  const index = db.data.usuarios.findIndex(u => u.id === Number(id));
  if (index === -1) return false;
  db.data.usuarios.splice(index, 1);
  await db.write();
  return true;
}

// buscar login
export async function buscarPorLogin(login) {
  await db.read();
  return db.data.usuarios.find(u => u.login === login);
}
