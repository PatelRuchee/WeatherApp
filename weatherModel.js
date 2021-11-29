const mongoose = require('mongoose');

var weatherSchema = new mongoose.Schema({
    city:{
        type: String,
        required: 'city cannot be empty',
    },

    cityCurrentTemp:{
        type: Number,
        required: 'temperature cannot be empty',
    }
});

var weather = mongoose.model('Weather', weatherSchema);
module.exports = weather;