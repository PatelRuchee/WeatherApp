const mongoose = require('mongoose');

var weatherSchema = new mongoose.Schema({
    City:{
        type: String,
        required: 'city cannot be empty',
    },

    CurrentTemp:{
        type: Number,
        required: 'temperature cannot be empty',
    },

    Longitude:{
        type: Number,
        required: 'longitude cannot be empty',
    },

    Latitude:{
        type: Number,
        required: 'latitude cannot be empty',
    },
    
    Overview:{
        type: String,
        required: 'overview cannot be empty',
    },

    Description:{
        type: String,
        required: 'description cannot be empty',
    },

    Feellike:{
        type: Number,
        required: 'feellike cannot be empty',
    },

    MinTemp:{
        type: Number,
        required: 'Min Temp cannot be empty',
    },

    MaxTemp:{
        type: Number,
        required: 'Max Temp cannot be empty',
    },

    Humidity:{
        type: Number,
        required: 'Humidity cannot be empty',
    },

    Pressure:{
        type: Number,
        required: 'Pressure cannot be empty',
    },

    WindSpeed:{
        type: Number,
        required: 'Wind speed cannot be empty',
    },

    WindGust:{
        type: Number,
        required: 'Wind gust cannot be empty',
    }
});

var weather = mongoose.model('Weather', weatherSchema);
module.exports = weather;




// $("#feellike").show();
// $("#mintemperature").show();
// $("#maxtemperature").show();
// $("#humidity").show();
// $("#pressure").show();
// $("#windspeed").show();
// $("#windgust").show();