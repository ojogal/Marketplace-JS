import Router from 'express';
import BrandController from '../controllers/brandController.js';

const router = new Router();

router.get('/', BrandController.index);
router.post('/', BrandController.create);

export default router