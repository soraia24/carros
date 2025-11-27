import UsuarioService from "../services/usuarioService.js"
import { validarCreateUserDTO, } from "../dtos/user.dto.js";
import { validarLoginDTO } from "../dtos/login.dto.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//  LISTAR TODOS 
export async function todosUsuarios(req, res, next) {
  try {
    const usuarios = await UsuarioService.listar();
    res.status(200).json(usuarios);
  } catch (err) {
    next(err);
  }
}

//  BUSCAR POR ID 
export async function buscar(req, res, next) {
  try {
    const usuario = await UsuarioService.buscar(req.params.id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
}

//  CADASTRAR USUÁRIO 
export async function novoUsuario(req, res, next) {
  try {
    // 1) VALIDAR DTO 
    const erros = validarCreateUserDTO(req.body);
    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const { login } = req.body;

    // SE NÃO FOR ADMIN, FORÇA ROLE USER
    if (!req.usuario || req.usuario.role !== "admin") {
      req.body.role = "user";
    }

    // LOGIN DUPLICADO 
    const existente = await UsuarioService.login(login);
    if (existente) {
      return res.status(400).json({ erro: "Login já cadastrado" });
    }

    //  CRIAR 
    const novo = await UsuarioService.cadastrar(req.body);

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: novo,
    });

  } catch (err) {
    next(err);
  }
}

//  LOGIN 
export async function login(req, res, next) {
  try {
    //  VALIDAR DTO 
    const erros = validarLoginDTO(req.body);
    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const { login, senha } = req.body;

    const usuario = await UsuarioService.login(login);
    if (!usuario) {
      return res.status(401).json({ erro: "Usuário ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        login: usuario.login,
        role: usuario.role,
      },
      process.env.JWT_SECRET || "Segurança",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token,
    });

  } catch (err) {
    next(err);
  }
}

// ---------------------- ATUALIZAR ----------------------
export async function atualizar(req, res, next) {
  try {
    const atualizado = await UsuarioService.atualizar(req.params.id, req.body);

    if (!atualizado) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.status(200).json(atualizado);
  } catch (err) {
    next(err);
  }
}

// ---------------------- DELETAR ----------------------
export async function deletar(req, res, next) {
  try {
    const excluido = await UsuarioService.deletar(req.params.id);

    if (!excluido) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.status(200).json({ mensagem: "Usuário removido com sucesso" });
  } catch (err) {
    next(err);
  }
}
