import * as UsuarioRepository from "../repositorios/usuarioRepository.js";
import bcrypt from "bcryptjs";

class UsuarioService {
  
  // Listar
  static async listar() {
    return await UsuarioRepository.listarUsuarios();
  }

  // Buscar por ID
  static async buscar(id) {
    const usuario = await UsuarioRepository.buscarUsuario(id);
    if (!usuario) {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    }
    return usuario;
  }

  // Cadastrar
  static async cadastrar(dados) {
    const existente = await UsuarioRepository.buscarPorLogin(dados.login);

    if (existente) {
      const err = new Error("Login já está em uso");
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
    const usuario = await UsuarioRepository.buscarUsuario(id);
    if (!usuario) {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    }

    // Se veio senha nova → hash
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    return await UsuarioRepository.atualizarUsuario(id, dados);
  }

  // Deletar
  static async deletar(id) {
    const deletado = await UsuarioRepository.deletarUsuario(id);

    if (!deletado) {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    }

    return true;
  }

  // Login
  static async login(login, senha) {
    const usuario = await UsuarioRepository.buscarPorLogin(login);

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
