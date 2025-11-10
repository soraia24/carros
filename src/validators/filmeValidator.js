import * as filmeModel from '../models/filmeModel.js';

export default function validarFilme(req, res, next){
    const { titulo, diretor, ano, sinopse } = req.body;

    if(!/^\d{4}$/.test(ano)){
      const err = new Error('Digite um ano válido com exatamente 4 dígitos (exemplo: 2025).')
      err.statusCode = 400;
      throw err;
    }

    // verificar se todos os campos obrigatorios foram preenchidos
    if (!titulo || !diretor || !ano || !sinopse) {
        const err = new Error('Preencha todos os campos obrigatórios');
        err.statusCode = 400;
        throw err;  
    }
    const existente = filmeModel.buscarPorTitulo(titulo);
     if (existente) {
     const err= new Error('Filme já cadastrado');
    err.statusCode = 400;
     throw err; //logar na parte do service
    }

    next();
}