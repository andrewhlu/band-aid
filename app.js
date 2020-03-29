const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
// const axios = require('axios');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime');
const cors = require('cors')({ origin: true });

// Firebase Admin SDK Setup
const serviceAccount = process.env.FIREBASE_SERVICE_ACCT || require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCT ? JSON.parse(serviceAccount) : serviceAccount),
    storageBucket: "band-aid-music.appspot.com"
});

const storageBucket = admin.storage().bucket();

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
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/upload', upload.single('audio'), (req, res, next) => {
    // req.file contains the file
    console.log(req.file);

    // req.body will hold the text fields, if there were any
    req.body = JSON.parse(JSON.stringify(req.body));
    if(req.body.hasOwnProperty("key")) {
        let key = req.body.key.toUpperCase();
        console.log(key);

        // Upload file to the directory specified by the key
        let options = {
            destination: key + "/" + req.file.filename
        };

        storageBucket.upload(req.file.path, options, (err, file) => {
            if(err) {
                console.log(error);
                res.json({ success: false });
            }
            else {
                // File was successfully uploaded!
                res.json({ success: true });
            }
        });
    }
    else {
        // No key was provided, return an error
        res.json({ error: "No key was provided." });
    }
});

app.post('/merge', (req, res) => {
    // req.body will hold the text fields, if there were any
    if(req.body.hasOwnProperty("key")) {
        let key = req.body.key.toUpperCase();
        console.log(key);

        let options = {
            directory: key
        };

        storageBucket.getFiles(options, (err, files) => {
            if(err) {
                console.log(err);
                res.json({ success: false, error: err });
            }
            else {
                // We now have an array of file objects in 'files'. Download each one.
                // First, create an array of booleans to keep track of file download progress for each one
                let downloadProgress = new Array(files.length).fill(false);

                for(let i = 0; i < files.length; i++) {
                    let options = {
                        destination: "tmp/" + files[i].id
                    };

                    files[i].download(options, (err, contents) => {
                        if(err) {
                            console.log(err);
                            res.json({ success: false, error: err });
                        }
                        else {
                            downloadProgress[i] = true;
                            console.log(i);
                            console.log(downloadProgress);
                        }
                    });
                }

                let checker = arr => arr.every(Boolean);

                let downloadCheck = setInterval(() => {
                    if(checker(downloadProgress)) {
                        clearInterval(downloadCheck);
                        console.log("Files are downloaded!");

                        // Use ffmpeg to merge files. See: https://stackoverflow.com/questions/14498539/how-to-overlay-downmix-two-audio-files-using-ffmpeg
                        let command = ffmpeg();
                        for (let i = 0; i < files.length; i++) {
                            console.log("tmp/" + files[i].id);
                            command.input("tmp/" + files[i].id);
                        }
                        command.addInputOption("-filter_complex amix=inputs=" + files.length + ":duration=longest");
                        command.output("tmp/output.wav");
                        // command.output('tmp/output.' + mime.getExtension(files[0].metadata.contentType));
                        command.on('error', (err) => {
                            console.log('An error occurred: ' + err.message);
                        });
                        command.on('end', () => {
                            console.log('Processing finished!');

                            // Upload file to the directory specified by the key
                            let options = {
                                destination: key + "/output.wav"
                            };

                            storageBucket.upload("tmp/output.wav", options, (err, file) => {
                                if(err) {
                                    console.log(error);
                                    res.json({ success: false, error: err });
                                }
                                else {
                                    console.log("File was uploaded!");

                                    // Get a download link and set expiration time to tomorrow
                                    let today = new Date();

                                    let options = {
                                        action: 'read',
                                        expires: today.getTime() + 86400000
                                    };

                                    file.getSignedUrl(options, (err, url) => {
                                        if(err) {
                                            console.log(err);
                                            res.json({ success: false, error: err });
                                        }
                                        else {
                                            console.log(url);
                                            res.json({ success: true, url: url });
                                        }
                                    });
                                }
                            });
                        });
                        command.run();
                    }
                }, 100);
            }
        });
    }
    else {
        // No key was provided, return an error
        res.json({ error: "No key was provided." });
    }
});

app.listen(port, () => {
    console.log("App is listening on port " + port + "!");
});