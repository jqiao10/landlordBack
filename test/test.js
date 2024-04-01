/**
 * Test suite for the getAllListings method in the ListingController.
 * It ensures that the method returns all listings successfully.
 * @author Mingyuan Xie
 */

const Listing = require('../models/listing');
const User = require('../models/user');
const ListingController = require('../controllers/listingController');
const AuthController = require('../controllers/authController');

describe('getAllListings', () => {
    it('should return all listings', async () => {
        const mockQuery = {
            exec: jest.fn().mockResolvedValue([{ _id: '65f701ade3705ee3ea087b38' }])
        };
        Listing.find = jest.fn().mockReturnValue(mockQuery);

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await ListingController.getAllListings(null, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: [{ _id: '65f701ade3705ee3ea087b38' }] });
    });
});

/**
 * Test suite for the getUsers method in the AuthController.
 * It ensures that the method returns all user successfully.
 * @author Mingyuan Xie
 */

describe('getUser', () => {
    it('should return specific users', async () => {
        const mockQuery = {
            exec: jest.fn().mockResolvedValue([{ user: '65f8562c2b04018ecfd595b8' }])
        };
        User.find = jest.fn().mockReturnValue(mockQuery);

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await AuthController.getUser(null, mockRes);

        // Assertions
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: [{ _id: '65f8562c2b04018ecfd595b8' }] });
    });
});
