const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');
// const debugRoutes = require('./debugRoutes');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
// router.use('/debug', debugRoutes);

module.exports = router;
