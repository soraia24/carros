import * as CarModel from '../models/CarModel.js';

export default async function validarCar(req, res, next){
  try {
    const { marca, modelo, ano, cor, preco } = req.body;
    if (req.method === 'PUT') {
      return next();
    }

    if(!marca || !modelo || !ano || !cor || !preco){
        const err = new Error('Preencha todos os campos obrigatórios: marca, modelo, ano, cor, preco.');
        err.statusCode = 400;
        throw err;
    }

    if(!/^\d{4}$/.test(ano)){
      const err = new Error('Digite um ano válido com exatamente 4 dígitos (exemplo: 2025).')
      err.statusCode = 400;
      throw err;
    }

    // Verifica se o carro já está cadastrado
    const existente = await CarModel.buscarPorMarca(marca);
     if (existente) {
     const err= new Error('Carro já cadastrado');
    err.statusCode = 400;
     throw err; //logar na parte do service
    }

    next();
} catch (error) {
    next(error);
    }
}