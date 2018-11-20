const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const personas = require('./routes/api/personas');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(db).then(() => console.log('Database connected'))
        .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Iaew!!!'));

//routes
app.use('/api/users', users);
app.use('/api/profile', profile)
app.use('/api/personas', personas);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
