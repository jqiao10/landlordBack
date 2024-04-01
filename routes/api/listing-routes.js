const express = require('express');
const router = express.Router();
// const ListingController = require('../controllers/listingController');
// const passport = require('passport');
// const Listing = require ('../models/listing');
// const { route } = require('./reservation');

// router.get('/', passport.authenticate("jwt", { session: false }), ListingController.getListings);
// router.get('/' ,ListingController.getAllListings);
// router.post('/' , ListingController.postListings);
// module.exports = router;


const{
    getAllListing,
    getListingById,
    updateListing,
    createListing,
    deleteListing

} = require('../controllers/listingController');
router
  .route('/')
  .get(getAllListing)
  .post(createListing);


router
  .route('/:id')
  .get(getListingById)
  .put(updateListing)
  .delete(deleteListing);

  module.exports = router;