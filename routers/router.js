const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataC');

router.get('/', (req, res) => {
    res.send('Welcome to the People Density API!');
});

// Route to get data from MongoDB
router.get('/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;