const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

//PORT assign
const PORT = process.env.PORT || 3000;
const message = `Server is running on PORT:${PORT}`;

//Init app
const app = express();

//Middleware
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Setting routes
app.use(require('./routes/assignment'));

app.get('/test', (req, res) => res.send(message));

app.all('*', (req, res) => res.send(`Access denied`));

//System Listen
mongoose
    .connect('mongodb://localhost/e-matrix', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`${message}\nConnted with mongoDB.`)))
    .catch(() => console.log(`Unable to connect with db.`))

