import React from 'react';
import RequestRecordingForm from './RequestRecordingForm';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Error404 from "../Error404";
import CreateRoom from "./CreateRoom";
import firebase from "firebase";
import Record from "./Record";
function Conductor(props) {
  // var firebaseConfig = {
  //   apiKey: "AIzaSyAs_ffWjHjzmPXeL_CkYKo5YkgZJbV3NSk",
  //   authDomain: "band-aid-music.firebaseapp.com",
  //   databaseURL: "https://band-aid-music.firebaseio.com",
  //   projectId: "band-aid-music",
  //   storageBucket: "band-aid-music.appspot.com",
  //   messagingSenderId: "336491551539",
  //   appId: "1:336491551539:web:37a2c759fec6e42c9cfc46"
  // };
  console.log("props in Conductor: ", props);
  return (

    <div className="Conductor">
      <h1>Conductor page</h1>
      <Router>

        <Switch>
          <Route exact path="/conductor"
                 render={() => <CreateRoom {...props} />}
          />
          <Route exact path="/conductor/start-recording"
                 render={() => <Record {...props} />}
          />
          <Route exact path="/conductor/request"
                 render={() => <RequestRecordingForm {...props} />}
          />
          <Route component={Error404} />
        </Switch>
      </Router>

    </div>
  );
}

export default Conductor;
