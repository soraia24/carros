import * as usuarioModel from "../models/usuarioModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export async function todosUsuarios(req, res, next) {
  try {
    const usuarios = await usuarioModel.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    next(err);
  }
}

export async function buscar(req, res, next) {
  try {
    const usuario = await usuarioModel.buscarUsuarios(req.params.id);
    if (!usuario) {
      const error = new Error('Usuário não Encontrado');
      error.status = 404;
      throw error;
    }
    res.status(200).json(usuario);
  } catch (err) {
      next(err);  
    }
}

export async function novoUsuario(req, res, next) {
  try {

    const dadosValidados = validarNovoUsuario(req.body, req.usuario);


    //  Se não há token (visitante) ou se é usuário comum, força role 'user'
    if (!req.usuario || req.usuario.role !== 'admin') {
      req.body.role = 'user';
    }

    //  Verifica se já existe login igual
    const existente = await usuarioModel.buscarPorLogin(login);
    if (existente) {
      const error = new Error('Login já cadastrado');
      error.status = 400;
      throw error;   
    }
    

    // Cadastra o novo usuário normalmente
    const novo = await usuarioModel.cadastrarUsuarios(dadosValidados);
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', novo });
  } catch (err) {
      next(err)  
    }
}


export async function login(req, res, next) {
  try {
    const { login, senha } = req.body;

    const usuario = await usuarioModel.buscarPorLogin(login);
    if (!usuario) {
      const error= new Error( 'Usuário ou senha inválidos' );
      error.status = 401;
      throw error;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      const error = new Error('Usuário ou senha inválidos');
      error.status = 401;
      throw error;    
    }


    const token = jwt.sign(
      { id: usuario.id, login: usuario.login, role: usuario.role  },
      'Segurança',
      { expiresIn: '1h' } // token válido por 1 hora
    );

    res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    
  } catch (err) {
    next(err);
  }
}

export async function atualizar(req, res, next){
  try{
      const atualizado = await usuarioModel.atualizarUsuarios(req.params.id, req.body);
        if (!atualizado) {
          const error = new Error('Usuário não encontrado');
          error.status = 404;
          throw error;       
        }
      res.status(200).json(atualizado);
    } catch (err) {
        next(err)    
      }
}
export async function deletar(req, res, next) {
  try {
    const excluido = await usuarioModel.deletarUsuarios(req.params.id);
      if (!excluido) {
        const error = new Error('Usuário não encontrado');
        error.status = 404;
        throw error;     
      }
    res.status(200).json({ mensagem: 'Usuaro removido com sucesso' });
  } catch (err) {
      next(err)  
    }
}