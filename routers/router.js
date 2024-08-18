const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/', (req, res) => {
    const P0 = '10';
    const P10 = '50';
    const P30 = '56';
    const P60 = '25';
    const ad = "Help me! please"
    res.render('test', { P0, P10, P30, P60, ad });
    //res.send('Welcome to the People Density API!');
});

// Route to get data from MongoDB
router.get('/data', dataController.getAllData);

// Route to get data by a specific date
router.get('/datas', dataController.getDataByDate);

module.exports = router;