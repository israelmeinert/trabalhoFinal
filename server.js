const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const Temperature = require('./model/temperture');
const mongoose = require('mongoose');

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/final_homework");



const PORT = (process.ENV && process.ENV.PORT) || 3000;

app.get('/temperature', async (req, res) => {
    try {
        const temperatures = await Temperature.find({});
        res.json({temperatures});
    } catch (error) {
        res.send(500);
    }
    
});

app.post('/temperature', async (req, res) => {

    try {
        const { date, temperature } = req.body;
        const newdate = new Date();
        console.log(temperature);
        const newTemperature = new Temperature({date_received: newdate, temperature});
        const result = await newTemperature.save();
        res.send(201);
    } catch (error) {
        console.log(error);
        res.send(500);
    }
});

app.listen(PORT, () => {
    console.log('estou escutando na porta: '+ PORT);
});