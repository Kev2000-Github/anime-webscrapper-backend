const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('the database is up and working'))
    .catch(err => console.log(err))

export { mongoose };