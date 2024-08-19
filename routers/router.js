const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/', (req, res) => {
    const { area } = req.query;

    if (area <= 1) area_number = 1;
    else if (area >= 5) area_number = 5;
    else area_number = area;

    const graphData = {
        labels: ['10.00', '10.30', '11.00', '11.30', '12.00'],
        values: [12, 19, 25, 54, 23]
    };

    res.render('areaN', { area_number: area_number, data: graphData });
    //res.send('Welcome to the People Density API!');
});

// Route to get data from MongoDB
router.get('/data', dataController.getAllData);

// Route to get data by a specific date
router.get('/datas', dataController.getDataByDate);

module.exports = router;