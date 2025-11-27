export function validarLoginDTO(data) {
  const erros = [];

  if (!data.login || typeof data.login !== "string") {
    erros.push("O campo 'login' é obrigatório e deve ser uma string.");
  }

  if (!data.senha || typeof data.senha !== "string") {
    erros.push("O campo 'senha' é obrigatório e deve ser uma string.");
  }

  return erros;
}
