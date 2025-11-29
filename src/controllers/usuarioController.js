import UsuarioService from "../services/usuarioService.js";
import {
  validarCreateUserDTO,
} from "../dtos/user.dto.js";
import { validarLoginDTO } from "../dtos/login.dto.js";

import jwt from "jsonwebtoken";

// ---------------------- LISTAR ----------------------
export async function todosUsuarios(req, res, next) {
  try {
    const usuarios = await UsuarioService.listar();
    res.status(200).json(usuarios);
  } catch (err) {
    next(err);
  }
}

// ---------------------- BUSCAR ----------------------
export async function buscar(req, res, next) {
  try {
    const usuario = await UsuarioService.buscar(req.params.id);
    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
}

// ---------------------- CADASTRAR ----------------------
export async function novoUsuario(req, res, next) {
  try {
    // 1) Validar DTO
    const erros = validarCreateUserDTO(req.body);
    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    // Força role "user" caso não seja admin
    if (!req.usuario || req.usuario.role !== "admin") {
      req.body.role = "user";
    }

    // 2) Criar usuário (service já valida login duplicado)
    const novo = await UsuarioService.cadastrar(req.body);

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: novo,
    });

  } catch (err) {
    next(err);
  }
}

// ---------------------- LOGIN ----------------------
export async function login(req, res, next) {
  try {
    const erros = validarLoginDTO(req.body);
    if (erros.length > 0) {
      return res.status(400).json({ erros });
    }

    const { login, senha } = req.body;

    const usuario = await UsuarioService.login(login, senha);

    const token = jwt.sign(
      {
        id: usuario._id,     // <-- CORRIGIDO
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
    res.status(200).json(atualizado);
  } catch (err) {
    next(err);
  }
}

// ---------------------- DELETAR ----------------------
export async function deletar(req, res, next) {
  try {
    await UsuarioService.deletar(req.params.id);

    res.status(200).json({ mensagem: "Usuário removido com sucesso" });
  } catch (err) {
    next(err);
  }
}
