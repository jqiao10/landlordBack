const {Thought, User} = require('../models');

const listingController = {

    // Get a certain listing by ID
    getListingById({params}, res) {
        Listing.findOne({ id: params.id })
        .populate({path: 'reservation',select: '-__v'})
        .select('-__v')
        .then(data => {
            if(!data) {
            res.status(404).json({message: 'No reservation with this particular ID!'});
            return;
        }
        res.json(data)
        })
        .catch(error => {
            res.sendStatus(400);
        });
    },
       // Create a new listing
       createListing({params, body}, res) {
        Listing.create(body)
        .then(({id}) => {
            return User.findOneAndUpdate(
        { id: params.userId}, {$push: {listing: id}}, {new: true});
        })
        .then(data => {
            if(!data) {
                res.status(404).json({message: 'No listing with this particular ID!'});
                return;
            }
            res.json(data)
        })
        .catch(error => res.json(error)); 
    },

    updateListing({params, body}, res) {
        Listing.findOneAndUpdate({id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reservation', select: '-__v'})
        .select('-___v')
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No listing with this particular ID!'});
                return;
            }
                res.json(data);
        })
        .catch(error => res.json(error));
    },

    // Delete a current thought by ID
    deleteListing({params}, res) {
        Listing.findOneAndDelete({id: params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No listing with this particular ID!'});
                return;
            }
            res.json(data);
            })
            .catch(error => res.status(400).json(error));
    },

    // Add a new reservation
    addReservation({params, body}, res) {
        Thought.findOneAndUpdate({id: params.listingId}, {$push: {Reservation: body}}, {new: true, runValidators: true})
        .populate({path: 'reservation', select: '-__v'})
        .select('-__v')
        .then(data => {
        if (!data) {
            res.status(404).json({message: 'No reservation with this particular ID!'});
            return;
        }
        res.json(data);
        })
        .catch(error => res.status(400).json(error))

    },

    // Delete a reservation by ID
    deleteReservation({params}, res) {
        Listing.findOneAndUpdate({id: params.reservationId}, {$pull: {reservation: {reservationId: params.reservationId}}}, {new : true})
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No reservation with this particular ID!'});
                return;
            }
            res.json(data);
        })
        .catch(error => res.status(400).json(error));
    }

};


module.exports = listingController;