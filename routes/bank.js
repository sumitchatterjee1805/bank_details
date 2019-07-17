'use strict';
const Bank_Branch = require('../models/Bank_Branch');
const express = require('express');
const routes = express.Router({ mergeParams: true });

routes.get('/', async (req, res) => {
    if (req.params.ifsc && req.query.limit && req.query.offset) {
        try {
            const response = await Bank_Branch.getDetailsForIfsc(req.params.ifsc, req.query.limit, req.query.offset);
            res.status(200).json({
                result: response
            });
        }
        catch (err){
            console.log(err);
            res.status(500).json({
                message: 'Something went wrong. Please try again after some time.'
            });
        }
    }
    else
        res.status(400).json({
            message: 'Parameters missing'
        });
});
module.exports = routes;