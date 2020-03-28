// const admin = require('firebase-admin');
const express = require('express');
const multer  = require('multer');
// const axios = require('axios');
const path = require('path');
const cors = require('cors')({origin: true});

const app = express();
const port = process.env.PORT || 8080;
const upload = multer();

app.use(express.static(path.join(__dirname, 'static')));
app.use(cors);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/test', upload.array('audios', 2), (req, res, next) => {
    // req.files is array of audio files
    console.log(req.files);
    res.json({files: req.files.length});

    // req.body will hold the text fields, if there were any
});

app.listen(port, () => {
    console.log("App is listening on port " + port + "!");
});