const Data = require('../models/dataModel');

exports.getAllData = async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
