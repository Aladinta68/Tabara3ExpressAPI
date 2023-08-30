const Usermodel = require('../models/usermodel');
const Wilayamodel = require('../models/wilayamodel');
const Blodmodel = require('../models/blodmodel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

//get all users
exports.getusers = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const users = await Usermodel.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: users.length, page, data: users });
});
// get users with filters
exports.getUsersWithFilters = asyncHandler(async (req, res, next) => {
    // Extract filter parameters from query string
    const { wilaya, blod, daira } = req.query;

    // Construct the filter object based on provided parameters
    const filter = {};
    if (wilaya) filter.wilaya = wilaya.toLowerCase();
    if (blod) filter.blod = blod.toLowerCase();
    if (daira) filter.daira = daira.toLowerCase();
    // Fetch users based on the constructed filter
    const users = await Usermodel.find(filter);
    if (users.length === 0) {
        return next(new ApiError(`No users found with the given filters`, 404));
    }
    res.status(200).json({ results: users.length, data: users });
});
//get one user by id
exports.getuser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await Usermodel.findById(id);
    if (!user) {
        return next(new ApiError(`no user for this id ${id}`, 404));
    }
    res.status(200).json({ data: user });
});
//create user
exports.createuser = asyncHandler(async (req, res) => {
    const {
        email,
        phonenumber,
        password,
        blod,
        wilaya,
        daira
    } = req.body;
    const user = await Usermodel.create({ blod, wilaya, daira, email, password, phonenumber });
    res.status(201).json({ data: user })

});
//update user
exports.updateuser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const {
        email,
        phonenumber,
        password,
        blod,
        wilaya,
        daira
    } = req.body;
    const user = await Usermodel.findOneAndUpdate(
        { _id: id },
        { email, phonenumber, password, blod, wilaya, daira },
        { new: true });
    if (!user) {
        return next(new ApiError(`no user for this id ${id}`, 404));
    }
    res.status(200).json({ data: user });

});

//delete user
exports.deleteuser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await Usermodel.findOneAndDelete(id);
    if (!user) {
        return next(new ApiError(`no user for this id ${id}`, 404));
    }
    res.status(204).send('user deleted');
});
//get all wilaya
exports.getwilayas = asyncHandler(async (req, res) => {
    const wilayas = await Wilayamodel.find({});
    res.status(200).json({ data: wilayas });
});
//get one wilaya by id
exports.getwilaya = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const wilaya = await Wilayamodel.findById(id);
    if (!wilaya) {
        return next(new ApiError(`no wilaya for this id ${id}`, 404));
    }
    res.status(200).json({ data: wilaya });
});
//get all blod
exports.getblods = asyncHandler(async (req, res) => {
    const blods = await Blodmodel.find({});
    res.status(200).json({ data: blods });
});