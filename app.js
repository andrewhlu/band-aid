// const admin = require('firebase-admin');
const express = require('express');
const multer  = require('multer');
const ffmpeg = require('fluent-ffmpeg');
// const axios = require('axios');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime');
const cors = require('cors')({origin: true});
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;
const command = ffmpeg();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});
const upload = multer({ storage: storage });

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
    // res.json({files: req.files.length});

    fs.readdir("tmp", (err, items) => {
        console.log(items);
        res.json(items);
    });

    // req.body will hold the text fields, if there were any
});

app.get('/daniel', (req, res) => {
    res.json({message: "hello there, itsa me"});
});

app.listen(port, () => {
    console.log("App is listening on port " + port + "!");
});