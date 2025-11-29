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
    const existente = await UsuarioRepository.buscarPorLogin(dados.login);

    if (existente) {
      const err = new Error("Usuário já cadastrado");
      err.status = 400;
      throw err;
    }

    // Criptografa a senha
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

  // Login
  static async login(login, senha) {
    const usuario = await UsuarioRepository.buscarPorLogin(login);
    console.log("Usuário encontrado:", usuario);
    console.log("Senha no banco:", usuario.senha);
    console.log("Senha recebida:", senha);
    console.log("login recebida:", login);

    if (!usuario) {
      const err = new Error("Login inválido");
      err.status = 400;
      throw err;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      const err = new Error("Senha incorreta");
      err.status = 400;
      throw err;
    }

    return usuario; // o controller cria o token
  }
}

export default UsuarioService;
