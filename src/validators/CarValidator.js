export default function validarCar(req, res, next) {
  try {
    const { marca, modelo, ano, cor, preco, chassi } = req.body;

    // Para UPDATE (PUT), não obrigamos todos os campos
    if (req.method === "PUT") {
      return next();
    }

    // Para POST → tudo obrigatório
    const camposObrigatorios = { marca, modelo, ano, cor, preco, chassi };

    for (const [campo, valor] of Object.entries(camposObrigatorios)) {
      if (!valor) {
        const err = new Error(`O campo '${campo}' é obrigatório.`);
        err.statusCode = 400;
        throw err;
      }
    }

    // Ano com 4 dígitos
    if (!/^\d{4}$/.test(String(ano))) {
      const err = new Error("Digite um ano válido com exatamente 4 dígitos (exemplo: 2024).");
      err.statusCode = 400;
      throw err;
    }

    // Preço deve ser número positivo
    if (typeof preco !== "number" || preco <= 0) {
      const err = new Error("O campo 'preco' deve ser um número maior que zero.");
      err.statusCode = 400;
      throw err;
    }

    next();

  } catch (error) {
    next(error);
  }
}
