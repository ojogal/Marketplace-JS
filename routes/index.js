import Router from 'express';

const router = new Router();

router.use('/user');
router.use('/type');
router.use('/brand');
router.use('/device');

export default router