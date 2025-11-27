export function validarCreateCarDTO(data) {
  const erros = [];

  // Campos obrigatórios
  if (!data.modelo || typeof data.modelo !== "string") {
    erros.push("O campo 'modelo' é obrigatório e deve ser uma string.");
  }

  if (!data.marca || typeof data.marca !== "string") {
    erros.push("O campo 'marca' é obrigatório e deve ser uma string.");
  }

  if (data.ano === undefined || typeof data.ano !== "number") {
    erros.push("O campo 'ano' é obrigatório e deve ser um número.");
  }

  if (data.preco === undefined || typeof data.preco !== "number") {
    erros.push("O campo 'preco' é obrigatório e deve ser um número.");
  }

  // Campos opcionais
  if (data.cor && typeof data.cor !== "string") {
    erros.push("O campo 'cor' deve ser uma string.");
  }

  if (data.chassi && typeof data.chassi !== "string") {
    erros.push("O campo 'chassi' deve ser uma string.");
  }

  return erros;
}
