// DTO para criar usuário
export function validarCreateUserDTO(data) {
  const erros = [];

  if (!data.login || typeof data.login !== "string") {
    erros.push("O campo 'login' é obrigatório e deve ser uma string.");
  }

  if (!data.nome || typeof data.nome !== "string") {
    erros.push("O campo 'nome' é obrigatório e deve ser uma string.");
  }

  if (!data.email || typeof data.email !== "string") {
    erros.push("O campo 'email' é obrigatório e deve ser uma string.");
  }

  if (!data.senha || typeof data.senha !== "string") {
    erros.push("O campo 'senha' é obrigatório e deve ser uma string.");
  }

  // opcional
  if (data.role && typeof data.role !== "string") {
    erros.push("O campo 'role' deve ser uma string.");
  }

  return erros;
}
