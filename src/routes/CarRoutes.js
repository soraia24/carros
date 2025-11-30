import express from 'express';
import CarController from '../controllers/CarController.js';
import { autenticarToken } from '../middleware/authMiddleware.js';
import { verificarAdmin } from '../middleware/verificarAdmin.js';
import  validarCar  from '../validators/CarValidator.js';

const router = express.Router();

// rota para exibir página com lista de carros
router.get('/views', CarController.exibirPagina);

router.get('/', CarController.listar);
router.get('/:id', autenticarToken, verificarAdmin, CarController.buscar);
router.post('/cadastrar', validarCar, autenticarToken, verificarAdmin, CarController.cadastrar);
router.put('/:id',autenticarToken, validarCar, verificarAdmin, CarController.atualizar);
router.delete('/:id',autenticarToken, verificarAdmin, CarController.deletar);

//rota para visualizar detalhes no navegador
router.get("/:id/view", CarController.verDetalhes);

export default router;
