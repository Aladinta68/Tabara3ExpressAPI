const express = require('express');
const asyncHandler = require('express-async-handler');
const { getusers, getUsersWithFilters, getuser, createuser, updateuser, deleteuser, getwilayas, getwilaya, getblods } = require('../controllers/tabara3controllers')

const router = express.Router();

router.route('/').get(asyncHandler(async (req, res) => {
    res.json('welcome to home api of tabara3');
}));
router.route('/user').get(getusers).post(createuser);
router.route('/userfiltered').get(getUsersWithFilters);
router.route('/user/:id').get(getuser).put(updateuser).delete(deleteuser);
router.route('/wilaya').get(getwilayas);
router.route('/wilaya/:id').get(getwilaya);
router.route('/blod').get(getblods);


module.exports = router;