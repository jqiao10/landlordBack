const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./listing-routes');

//routes?
router.use('/',userRoutes);
router.use('/', thoughtRoutes);

module.exports = router;