const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');

router.use('/users', userRouter);
router.use('/device', deviceRouter);
router.use('/types', typeRouter);
router.use('/brands', brandRouter);

module.exports = router;