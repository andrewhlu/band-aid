import React, {useState, useEffect} from 'react';
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
function RecordingPage() {

  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          // this.setState({ isRecording: true });
          setIsRecording(true);
        }).catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {

        setBlobURL(URL.createObjectURL(blob));
        setIsRecording(false);
        // this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        // this.setState({ isBlocked: false });
        setIsBlocked(false);
      },
      () => {
        console.log('Permission Denied');
        // this.setState({ isBlocked: true })
        setIsBlocked(true);
      },
    );
  })

  return (
    <div className="RecordingPage">
      <h1>Recording page?</h1>
      <header className="App-header">
        <button onClick={start} disabled={isRecording}>Record</button>
        <button onClick={stop} disabled={!isRecording}>Stop</button>
        <audio src={blobURL} controls="controls" />
      </header>


    </div>
  );
}

export default RecordingPage;
