export function validarNovoUsuario(req, res, next) {
  try {
    const { login, nome, email, cel, senha } = req.body;

    // Verificar campos obrigatórios
    if (!login || !nome || !email || !cel || !senha) {
      const error = new Error('Preencha todos os campos obrigatórios');
      error.status = 400;
      throw error;
    }

    // Validar senha
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(senha)) {
      const error = new Error(
        'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números'
      );
      error.status = 400;
      throw error;
    }

    // Limpar e validar celular
    const celularLimpo = String(cel).replace(/\D/g, '');

    if (!/^\d{11}$/.test(celularLimpo)) {
      const error = new Error('O celular deve conter DDD + 9 dígitos (ex: 84999999999)');
      error.status = 400;
      throw error;
    }

    req.body.cel = celularLimpo; // atualiza o body

    next();
  } catch (error) {
    next(error); 
  }
}

export function validarLogin(req, res, next) {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      const error = new Error('Login e senha são obrigatórios');
      error.status = 400;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
}
