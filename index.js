//!jika halaman movie tidak keluar coba save atau jalankan kembali


const express = require('express')
const app = express()
require('./mongoose/connect')
const { contact, dataapi } = require('./data/data.js')
const { check, body, validationResult } = require('express-validator');
const fetch = require('node-fetch')


if (dataapi.length >= 0) {
    dataapi.insertMany({ nama: 'batman' })
}
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

app.get('/movie', async (req, res) => {
    const datanya = await dataapi.findOne()
    const api = await fetch(`http://www.omdbapi.com/?apikey=d894b8b3&s=${datanya.nama}`).then(a => a.json()).then(a => a.Search).catch(a => {
        console.log('api ini eror')
    })
    res.render('index', {
        judul: 'movie',
        api
    })
    if (dataapi.length >= 0) {
        await dataapi.deleteOne({ nama: datanya.nama })
    }
})

//! post movie
app.post('/movie', [body('search').custom((value => {
    if (value) {
        return true
    }
    throw new Error('ini eror')
}))], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()
        console.log(error);
    } else {
        if (dataapi.length >= 2) {
            dataapi.insertMany({ nama: req.body.search })
        }
        res.redirect('/movie')
    }

})
dataapi.find().then(a => { console.log(a); })

// if (dataapi.length >= 0) {
//     dataapi.insertMany({ nama: 'batman' })
// }
app.use('/', (req, res) => {
    res.send('salah')
})



    .listen(3000, (req, res) => {
        console.log('open in browser');
    })