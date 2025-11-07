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
    const { login,  nome, email, cel, senha, role } = req.body;

    //  Se tentou criar admin mas não é admin logado
    if (role === 'admin' && (!req.usuario || req.usuario.role !== 'admin')) {
      const error = new Error('Apenas administradores podem criar outros administradores');
      error.status=403;
      throw error;
    }

    //  Se não há token (visitante) ou se é usuário comum, força role 'user'
    if (!req.usuario || req.usuario.role !== 'admin') {
      req.body.role = 'user';
    }

    // verificar se todos os campos obrigatorios foram preenchidos
    if (!login || !nome || !email || !cel || !senha) {
   const error = new Error( 'Preencha todos os campos obrigatórios' );
   error.status = 400;
   throw error;
  }
 //Senha: pelo menos 8 caracteres
  if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(senha)){
      const error = new Error('A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números');
      error.status = 400;
      throw error;  
    }
  
  //Celular: 2 dígitos de DDD + 9 dígitos (total 11 números)
  const celularLimpo = String(cel).replace(/\D/g, '');
  if(!/^\d{11}$/.test(celularLimpo)){
      const error = new Error('O celular deve conter DDD + 9 dígitos (ex: 84999999999)');
      error.status = 400;
      throw error;
    }
  req.body.cel = celularLimpo;

    //  Verifica se já existe login igual
    const existente = await usuarioModel.buscarPorLogin(login);
    if (existente) {
      const error = new Error('Login já cadastrado');
      error.status = 400;
      throw error;   
    }
    

    // Cadastra o novo usuário normalmente
    const novo = await usuarioModel.cadastrarUsuarios(req.body);
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