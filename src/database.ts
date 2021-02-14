const mongoose = require('mongoose');
const URI = "mongodb://localhost/animeDB";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('the database is up and working'))
    .catch(err => console.log(err))

export { mongoose };