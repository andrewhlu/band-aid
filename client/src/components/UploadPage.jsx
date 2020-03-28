import React from 'react';


function UploadPage() {
    return (
        <div className="UploadPage">

            <head>
                <title>Test Audio Combine</title>
            </head>

            <h1>Test Audio Combination</h1>
            <form action="/test" method="post" encType="multipart/form-data">
                <label htmlFor="audios">Select Files:</label>
                <input type="file" accept="audio/*" name="audios" id="audios" multiple />
                <input type="submit" />
            </form>


        </div>
    );
}

export default UploadPage;
