export function validarUpdateCarDTO(data) {
  const erros = [];

  if (data.modelo && typeof data.modelo !== "string") {
    erros.push("O campo 'modelo' deve ser uma string.");
  }

  if (data.marca && typeof data.marca !== "string") {
    erros.push("O campo 'marca' deve ser uma string.");
  }

  if (data.ano && typeof data.ano !== "number") {
    erros.push("O campo 'ano' deve ser um número.");
  }

  if (data.preco && typeof data.preco !== "number") {
    erros.push("O campo 'preco' deve ser um número.");
  }

  if (data.cor && typeof data.cor !== "string") {
    erros.push("O campo 'cor' deve ser uma string.");
  }

  if (data.chassi && typeof data.chassi !== "number") {
    erros.push("O campo 'chassi' deve ser um número.");
  }

  return erros;
}
