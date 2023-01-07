import Router from 'express';
import DeviceController from '../controllers/deviceController.js';

const router = new Router();

router.get('/', DeviceController.index);
router.get('/:id', DeviceController.show);
router.post('/', DeviceController.create);

export default router