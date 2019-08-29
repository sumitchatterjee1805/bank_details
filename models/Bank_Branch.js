'use strict';
const db = require('../db');

exports.getDetailsForIfsc = async function (ifsc, limit, offset) {
    const query = "SELECT * FROM public.bank_details where ifsc = $1 limit $2 offset $3;";

    try {
        const result = await db.query(query, [ifsc, limit, offset]);
        return result;
    }
    catch (err) {
        return new Error(err);
    }
}

exports.getDetailsForBank = async function (bank, city, limit, offset) {
    const query = "SELECT * FROM public.bank_details where bank_name = $1 AND city = $2 limit $3 offset $4;";

    try {
        const result = await db.query(query, [bank, city, limit, offset]);
        return result;
    }
    catch (err) {
        return new Error(err);
    }
}