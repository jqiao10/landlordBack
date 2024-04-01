const mongoose = require('mongoose');

// Listing Schema
const ListingSchema = new mongoose.Schema({
    title: String,
    type:String,
    basicInformation: {
        livingroom: Number,
        Kitchen: Number,
        Bathroom: Number,
        Bedroom: Number,
        Guests: Number
    },
    features: [String],
    amenities: [String],
    safety: [String],
    description: String,
    cleaning: String,
    imageSrc:String,
    propertyImg: [String],
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
        postal: String,
        instruction: String
    },
    weekdayPrice: Number,
    weekendPrice: Number,
    startDate: Date,
    endDate: Date,
    propertyLicense: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Listing', ListingSchema);
