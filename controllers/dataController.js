const Data = require('../models/dataModel');

exports.getAllData = async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Controller function to get data by date
exports.getDataByDate = async (req, res) => {
    try {
        const { dater } = req.query; // Get the 'dater' parameter from the query string

        // If 'dater' is provided, filter by date
        const query = {};
        if (dater) {
            query.dater = dater;
        }


        const data = await Data.find(query);
        //console.log(data.length);
        //console.log(data[145]);
        //res.json(data);

        // Extract the 'number_people' field from the data
        const numberPeopleData = data.map(item => item.number_people);

        // Render the EJS template with only the numberPeopleData
        res.render('numberPeople', { numberPeopleData });

    } catch (err) {
        res.status(500).send(err.message);
    }
};
