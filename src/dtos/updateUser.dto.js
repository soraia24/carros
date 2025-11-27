export function validarUpdateUserDTO(data) {
  const erros = [];

  if (data.login && typeof data.login !== "string") {
    erros.push("O campo 'login' deve ser uma string.");
  }

  if (data.nome && typeof data.nome !== "string") {
    erros.push("O campo 'nome' deve ser uma string.");
  }

  if (data.email && typeof data.email !== "string") {
    erros.push("O campo 'email' deve ser uma string.");
  }

  if (data.cel && typeof data.cel !== "string") {
    erros.push("O campo 'cel' deve ser uma string.");
  }

  if (data.senha && typeof data.senha !== "string") {
    erros.push("O campo 'senha' deve ser uma string.");
  }

  if (data.role && typeof data.role !== "string") {
    erros.push("O campo 'role' deve ser uma string.");
  }

  return erros;
}
