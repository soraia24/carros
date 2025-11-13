import * as CarModel from '../models/CarModel.js';

// garante inicialização do DB
await CarModel.initDB();

class CarController {
static async listar(req, res, next) {
  try {
    const cars = await CarModel.listarCar();
    res.status(200).json(cars);
  } catch (err) {
    next(err); 
   }
}

static async buscar(req, res, next) {
  try {
    const car = await CarModel.buscarCar(req.params.id);
    if (!car) {
      const err = new Error('Carro não encontrado');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json(car);
  } catch (err) {
    next(err);  }
}

static async cadastrar(req, res, next) {
  try {
    
    // Cadastra novo carro
    const NovoCar = await CarModel.cadastrarCar(req.body);
    res.status(201).json({ mensagem: 'Carro cadastrado com sucesso', NovoCar });
  } catch (error) {
    next(error)  }
}


static async atualizar(req, res, next) {
  try {
    const campos = Object.keys(req.body);

    // Verifica se é uma atualização apenas da imagem
    const apenasImagem = (campos.length === 1 && campos[0] === "imagem");

    const atualizado = await CarModel.atualizarCar(req.params.id, req.body);

    if (!atualizado) {
      const err = new Error("Carro não encontrado");
      err.statusCode = 404;
      throw err;
    }

    // Mensagem personalizada
    if (apenasImagem) {
      return res.status(200).json({ mensagem: "Imagem salva com sucesso ✅", carro: atualizado });
    }

    res.status(200).json({ mensagem: "Carro atualizado com sucesso 🚗", carro: atualizado });

  } catch (err) {
    next(err);
  }
}

static async deletar(req, res, next) {
  try {
    const ok = await CarModel.deletarCar(req.params.id);

    if (!ok){
      const err= new Error( 'Carro não encontrado' );
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ mensagem: 'Carro removido com sucesso' });
  } catch (err) {
        next(err);  
        } 
}
static async exibirPagina(req, res, next) {
  try {
    const cars = await CarModel.listarCar();
    res.render("carros", { carros: cars });
  } catch (err) {
    next(err);
  }
}

static async verDetalhes(req, res, next) {
  try {
    const id = req.params.id;
    const carro = await CarModel.buscarCar(id);

    if (!carro) {
      const err = new Error("Carro não encontrado");
      err.statusCode = 404;
      throw err;
    }

    res.render("carroDetalhes", { carro });
  } catch (err) {
    next(err);
  }
}

}

export default CarController;

 
