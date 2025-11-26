import * as carRepository from "../repositorios/carRepository.js";

// garante inicialização do DB
await carRepository.initDB();

class CarService {
  
  static async listar() {
    return await carRepository.listarCar();
  }

  static async buscar(id) {
    const car = await carRepository.buscarCar(id);

    if (!car) {
      const err = new Error("Carro não encontrado");
      err.statusCode = 404;
      throw err;
    }

    return car;
  }

  static async cadastrar(data) {
    const { marca, modelo, ano, cor, preco, chassi } = data;

    //  Verificar se já existe um carro com o mesmo chassi
    const carroComMesmoChassi = await carRepository.buscarPorChassi(chassi);

    if (carroComMesmoChassi) {
      const err = new Error("Já existe um carro cadastrado com este chassi.");
      err.statusCode = 400;
      throw err;
    }

    //  Verificar se existe outro carro exatamente igual (exceto o chassi)
    const carrosIguais = await carRepository.buscarCarrosIguais({
      marca, modelo, ano, cor, preco
    });

    let quantidadeDisponivel = carrosIguais.length;

    //  Cadastrar o novo carro
    const novoCarro = await carRepository.cadastrarCar(data);

    return {
      mensagem: "Carro cadastrado com sucesso",
      carro: novoCarro,
      quantidadeDisponivel: quantidadeDisponivel + 1, 
      detalhe: quantidadeDisponivel > 0
        ? `Existem ${quantidadeDisponivel + 1} unidades deste mesmo modelo disponíveis.`
        : "Somente uma unidade disponível."
    };
  }


  static async atualizar(id, dados) {
    const campos = Object.keys(dados);
    const apenasImagem = (campos.length === 1 && campos[0] === "imagem");

    const atualizado = await carRepository.atualizarCar(id, dados);

    if (!atualizado) {
      const err = new Error("Carro não encontrado");
      err.statusCode = 404;
      throw err;
    }

    return { atualizado, apenasImagem };
  }

  static async deletar(id) {
    const ok = await carRepository.deletarCar(id);

    if (!ok) {
      const err = new Error("Carro não encontrado");
      err.statusCode = 404;
      throw err;
    }

    return ok;
  }

  static async listarPagina() {
    return await carRepository.listarCar();
  }

  static async detalhes(id) {
    const carro = await carRepository.buscarCar(id);

    if (!carro) {
      const err = new Error("Carro não encontrado");
      err.statusCode = 404;
      throw err;
    }

    return carro;
  }

  // Buscar carro por chassi
  static async buscarPorChassi(chassi) {
    return await carRepository.buscarPorChassi(chassi);
  }
}

export default CarService;
