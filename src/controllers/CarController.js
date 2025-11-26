import CarService from "../services/carService.js";
import { validarCreateCarDTO } from "../dtos/createCar.dto.js";
import { validarUpdateCarDTO } from "../dtos/updateCar.dto.js";

class CarController {

  static async listar(req, res, next) {
    try {
      const cars = await CarService.listar();
      res.status(200).json(cars);
    } catch (err) {
      next(err);
    }
  }

  static async buscar(req, res, next) {
    try {
      const car = await CarService.buscar(req.params.id);
      res.status(200).json(car);
    } catch (err) {
      next(err);
    }
  }

  static async cadastrar(req, res, next) {
    try {
      //  Validação DTO
      const erros = validarCreateCarDTO(req.body);
      if (erros.length > 0) {
        return res.status(400).json({ erros });
      }

      const NovoCar = await CarService.cadastrar(req.body);
      res.status(201).json({ mensagem: "Carro cadastrado com sucesso", NovoCar });

    } catch (error) {
      next(error);
    }
  }

  static async atualizar(req, res, next) {
    try {
      //  Validação DTO
      const erros = validarUpdateCarDTO(req.body);
      if (erros.length > 0) {
        return res.status(400).json({ erros });
      }

      const { atualizado, apenasImagem } = await CarService.atualizar(req.params.id, req.body);

      if (apenasImagem) {
        return res.status(200).json({
          mensagem: "Imagem salva com sucesso ✅",
          carro: atualizado
        });
      }

      res.status(200).json({
        mensagem: "Carro atualizado com sucesso 🚗",
        carro: atualizado
      });

    } catch (err) {
      next(err);
    }
  }

  static async deletar(req, res, next) {
    try {
      await CarService.deletar(req.params.id);
      res.status(200).json({ mensagem: "Carro removido com sucesso" });
    } catch (err) {
      next(err);
    }
  }

  static async exibirPagina(req, res, next) {
    try {
      const cars = await CarService.listarPagina();
      res.render("carros", { carros: cars });
    } catch (err) {
      next(err);
    }
  }

  static async verDetalhes(req, res, next) {
    try {
      const carro = await CarService.detalhes(req.params.id);
      res.render("carroDetalhes", { carro });
    } catch (err) {
      next(err);
    }
  }
}

export default CarController;
