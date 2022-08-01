const mongoose = require('mongoose');
//! konfigurasi data
const contact = mongoose.model('datauser', {

    email: {
        type: String
    }, password: {
        type: String,
        required: true
    }
})
module.exports = { contact }