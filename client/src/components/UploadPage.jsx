import React from 'react';


function UploadPage() {
    return (
        <div className="UploadPage">
            <h1>Upload Audio</h1>
            <form action="/upload" method="post" encType="multipart/form-data">
                <label htmlFor="audio">Select Files:</label>
                <input type="file" accept="audio/*" name="audio" id="audio" required />
                <label htmlFor="key">Enter Room Code:</label>
                <input type="text" name="key" id="key" placeholder="ABCD" required></input>
                <input type="submit" />
            </form>

            <h1>Merge Audio</h1>
            <form action="/merge" method="post">
                <label htmlFor="key">Enter Room Code:</label>
                <input type="text" name="key" id="key" placeholder="ABCD" required></input>
                <input type="submit" />
            </form>
        </div>
    );
}

export default UploadPage;
