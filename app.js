const admin = require('firebase-admin');
const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
// const axios = require('axios');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime');
const cors = require('cors')({ origin: true });
const fs = require('fs');

// Firebase Admin SDK Setup
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "band-aid-music.appspot.com"
});

// Multer Setup. See: https://github.com/expressjs/multer/issues/170
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

// Express Setup
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/test', upload.array('audios', 20), (req, res, next) => {
    // req.files is array of audio files
    console.log(req.files);

    // Use ffmpeg to merge files. See: https://stackoverflow.com/questions/14498539/how-to-overlay-downmix-two-audio-files-using-ffmpeg
    let command = ffmpeg();
    for (var i = 0; i < req.files.length; i++) {
        command.input(req.files[i].path);
    }
    command.addInputOption("-filter_complex amix=inputs=" + req.files.length + ":duration=longest");
    command.output('tmp/output.' + mime.getExtension(req.files[0].mimetype));
    command.on('error', (err) => {
        console.log('An error occurred: ' + err.message);
    });
    command.on('end', () => {
        console.log('Processing finished!');

        fs.readdir("tmp", (err, items) => {
            console.log(items);
            res.json({ file: path.join(__dirname + "/tmp/output." + mime.getExtension(req.files[0].mimetype)) });
        });
    });
    command.run();

    // req.body will hold the text fields, if there were any
});

app.listen(port, () => {
    console.log("App is listening on port " + port + "!");
});