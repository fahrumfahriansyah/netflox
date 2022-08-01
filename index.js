const express = require('express')
const app = express()
require('./mongoose/connect')
const { contact } = require('./data/data.js')
const { check, body, validationResult } = require('express-validator');

//!set up
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


//!web utama

app.get('/', (req, res) => {
    res.render('index', {
        judul: 'netflox'
    })

})
//!daftar
app.get('/daftar', (req, res) => {
    res.render('index', {
        judul: 'daftar'
    })
})
//!post daftar
app.post('/daftar', [body('email').custom(async (value) => {
    console.log(value);
    const sama = await contact.findOne({ email: value })
    console.log(sama);
    if (sama) {
        throw new Error('nama email sudah dipakai')
    }
    return true
}),
check('email', "email ini salah").isEmail()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render("index", {
            judul: "daftar",
            error: errors.array()
        })
    } else {
        console.log(req.body);
        contact.insertMany([req.body])
        return res.redirect('/')
    }
})
//!tutup
//!post login
app.post('/', [body('email').custom(async (value) => {
    console.log(value);
    const sama = await contact.findOne({ email: value })
    console.log(sama);
    if (sama) {
        return true
    }
    throw new Error('nama email anda salah')
}), body('password').custom(async (value) => {
    console.log(value);
    const sama = await contact.findOne({ password: value })
    console.log(sama);
    if (sama) {
        return true
    }
    throw new Error('password anda salah')
}),
check('email', "email ini salah").isEmail()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render("index", {
            judul: "netflox",
            error: errors.array()
        })
    } else {
        console.log(req.body);
        return res.redirect('/movie')
    }
})
//!
app.get('/movie', (req, res) => {
    res.send('asdasdasasdasda')
})
app.use('/', (req, res) => {
    res.send('salah')
})


    .listen(3000, (req, res) => {
        console.log('open in browser');
    })