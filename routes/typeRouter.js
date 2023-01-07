import Router from 'express';
import TypeController from '../controllers/typeController.js';

const router = new Router();

router.get('/', TypeController.index);
router.post('/', TypeController.create);

export default router