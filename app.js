// const admin = require('firebase-admin');
const express = require('express');
const multer  = require('multer');
// const axios = require('axios');
const path = require('path');
const cors = require('cors')({origin: true});

const app = express();
const port = process.env.PORT || 5000;
const upload = multer();

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

// app.get('/react', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

app.post('/test', upload.array('audios', 2), (req, res, next) => {
    // req.files is array of audio files
    console.log(req.files);
    res.json({files: req.files.length});

    // req.body will hold the text fields, if there were any
});

app.get('/daniel', (req, res) => {
    res.json({message: "hello there, itsa me"});
});

app.listen(port, () => {
    console.log("App is listening on port " + port + "!");
});