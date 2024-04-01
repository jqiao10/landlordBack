// Require express router
const router = require('express').Router();

const {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addListing,
    deleteListing
  } = require('../../controllers/user-controller');

router.route('/signup').post(createUser);

router.route('/').get(getUserById);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

router.route('/:id/listing/:listingId').post(addListing);
router.route('/:id/listing/:listingId').delete(deleteListing);

module.exports = router; 