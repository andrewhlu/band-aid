import React, {useState, useEffect} from 'react';
// https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });


function RecordingPage(props) {
  const database = props.database;
  console.log("props: ", props);
  const [roomId, setRoomId] = useState(props.match.params.id);
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [roomDoesExist, setRoomDoesExist] = useState(true);


  useEffect(() => {
    const room_id = database.ref(roomId);

    room_id.once('value').then(dataSnapshot => {
      const thing = dataSnapshot.val()
      console.log("in roomEists.... thing: ", thing);
      setRoomDoesExist(thing !== null);
    });

    // console.log("room_id: ", room_id);
  });






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
  if (roomDoesExist) {
    database.ref(roomId+'/recording').on('value', snapshot => {
      var is_recording = snapshot.val();
      if (is_recording) {
        start();
      }
    })
  }
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
  // console.log("inside RecordingPage. The room id I think is: ", props.match.params.id);

  return (
    roomDoesExist ?
    <div className="RecordingPage">
      <h1>You are in room: <b>{roomId}</b></h1>
      <header className="App-header">
        <button onClick={start} disabled={isRecording}>Record</button>
        <button onClick={stop} disabled={!isRecording}>Stop</button>
        <audio src={blobURL} controls="controls" />
      </header>
    </div>
      :
      <div><h1>Sorry, but the room id <b>{roomId}</b> does not exist. Try a different one</h1></div>
  );
}

export default RecordingPage;
