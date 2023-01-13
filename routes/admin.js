const express = require('express');
const router = express.Router();


const lastPrint = require('../models/LastPrint');
const { ensureAuthenticated, ensureRole } = require('../config/auth');
const {Role} = require('../models/User');



router.get('/', ensureAuthenticated, ensureRole(Role.SUPADMIN), (req, res) => {

    try {
        const { page = 1, limit = 30} = req.query
        lastPrint
            .find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ invNumber: -1 })
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    res.send(500).status;
                } else {
                    res.render('admin',
                        {
                            formdata: data,
                            user: req.user 
                        })
                    // console.log('ngamkah brooo')
                }
            })
    } catch (e) {
        console.log(e.message)
    }
});



module.exports = router; 