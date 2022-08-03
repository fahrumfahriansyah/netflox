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
const dataapi = mongoose.model('dataSearch', {

    nama: {
        type: String
    }
})

module.exports = { contact, dataapi }