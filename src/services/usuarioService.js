import * as UsuarioRepository from "../repositorios/usuarioRepository.js";
import bcrypt from "bcryptjs";

class UsuarioService {

  // Listar
  static async listar() {
    return await UsuarioRepository.listarUsuarios();
  }

  // Buscar por ID
  static async buscar(id) {
    return await UsuarioRepository.buscarUsuario(id);
  }

  // Cadastrar
  static async cadastrar(dados) {
    // Hash de senha
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const novoUsuario = {
      ...dados,
      senha: senhaHash
    };

    return await UsuarioRepository.cadastrarUsuario(novoUsuario);
  }

  // Atualizar
  static async atualizar(id, dados) {

    // Se senha enviada → hash
    if (dados.senha && dados.senha.trim() !== "") {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    } else {
      delete dados.senha; // evita sobrescrever com vazio
    }

    return await UsuarioRepository.atualizarUsuario(id, dados);
  }

  // Deletar
  static async deletar(id) {
    return await UsuarioRepository.deletarUsuario(id);
  }

  // Login → apenas busca usuário
  static async login(login) {
    return await UsuarioRepository.buscarPorLogin(login);
  }
}

export default UsuarioService;
