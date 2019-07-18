'use strict';
const Bank_Branch = require('../models/Bank_Branch');
const express = require('express');
const routes = express.Router({ mergeParams: true });

routes.get('/', async (req, res) => {
    if (req.params.ifsc) {
        try {
            let limit = req.query.limit !== undefined ? req.query.limit : 1000;
            let offset = req.query.offset !== undefined ? req.query.offset : 0;

            const response = await Bank_Branch.getDetailsForIfsc(req.params.ifsc, limit, offset);
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
