const mongoose = require('mongoose');
//! hal di lakukan untuk membuat connect kek dbs local kita
//!mongoodb/nama ip local kita/lalunama databse kita
mongoose.connect('mongodb://fahri:fahri@ac-afnh1u7-shard-00-00.nevzwht.mongodb.net:27017,ac-afnh1u7-shard-00-01.nevzwht.mongodb.net:27017,ac-afnh1u7-shard-00-02.nevzwht.mongodb.net:27017/mhs?ssl=true&replicaSet=atlas-ziqyfs-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
// mongoose.connect('mongodb://127.0.0.1:27017/mhs', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// });

// dataapi = new dataapi({
//     nama: 'naruto'
// })
// dataapi.save().then(success => { console.log(success); })