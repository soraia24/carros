import * as filmeModel from '../models/filmeModel.js';

// garante inicialização do DB
await filmeModel.initDB();

class filmeController {
static async listar(req, res, next) {
  try {
    const filmes = await filmeModel.listarFilmes();
    res.status(200).json(filmes);
  } catch (err) {
    next(err); 
   }
}

static async buscar(req, res, next) {
  try {
    const filme = await filmeModel.buscarFilme(req.params.id);
    if (!filme) {
      const err = new Error('Filme não encontrado');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json(filme);
  } catch (err) {
    next(err);  }
}

static async cadastrar(req, res, next) {
  try {
    const { titulo, diretor, ano, sinopse } = req.body;

    
    
    // Cadastra novo filme
    const novo = await filmeModel.cadastrarFilme(req.body);
    res.status(201).json({ mensagem: 'Filme cadastrado com sucesso', novo });
  } catch (error) {
    next(error)  }
}


static async atualizar(req, res, next) {
  try {
    const atualizado = await filmeModel.atualizarFilme(req.params.id, req.body);

    if (!atualizado) {
     const err=  new Error( 'Filme não encontrado');
     err.statusCode=404;
     throw err;
    }
    res.status(200).json(atualizado);

  } catch (err) {
    next(err);
  }
}

static async deletar(req, res, next) {
  try {
    const ok = await filmeModel.deletarFilme(req.params.id);

    if (!ok){
      const err= new Error( 'Filme não encontrado' );
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ mensagem: 'Filme removido com sucesso' });
  } catch (err) {
next(err);  
}
}
}

export default filmeController

 
