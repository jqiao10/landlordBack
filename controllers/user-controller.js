const {Userlandlords} = require('../models');


const userLandlordController = {
  
    getUserById({params},res){
        Userlandlords.findOne({userid:params.id})
        .populate({
            path:'listing',
            select:'-_v'
        })
        .then(data=>{
            if(!data){
                res.status(404).json({message:"no such a user"})
                return;
            }
            res.json(data)
        })
        .catch(error=>{
            res.status(400).json(error)
        })
    },
    //create a user
    createUser({ body }, res){
        Userlandlords.create(body)
        .then(data=> res.json(data))
        .catch(error => res.status(400).json(error));
    },
    // update a user by choosing a id
    updateUser({ params, body }, res) {
        Userlandlords.findOneAndUpdate({ id: params.id }, body, { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(error => res.status(400).json(error));
    },
    // add listing
    addListing({ params }, res) {
        Userlandlords.findOneAndUpdate(
            { id: params.id }, 
            { $addToSet: { listing: params.listingId } }, 
            { new: true, runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(error => res.status(400).json(error));
    },

    // remove listing
    deleteListing({ params }, res) {
        Userlandlords.findOneAndUpdate({ id: params.id }, { $pull: { listing: params.listingId } }, { runValidators: true })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(data);
            })
            .catch(error => res.status(400).json(error));
    },

}

module.exports = userLandlordController;