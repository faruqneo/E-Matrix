const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/e-matrix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => console.log(`Connted with mongoDB.`))
.catch(() => console.log(`Unable to connect with db.`))
