const express = require('express');
const cors = require('cors');
// const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true })
// useCreateIndex: true 

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establised successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


// //heroku code for deployment
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, 'build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'build', 'index.html'));
//     });
// }
// else {
//     app.get('/', (req, res) => {
//         res.send("Api running");
//     });
// }


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});