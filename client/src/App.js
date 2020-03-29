import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css';
import UploadPage from "./components/UploadPage";
import TestPage from "./components/TestPage";
import Conductor from "./components/conductor/Conductor";
import Student from "./components/student/Student";
import firebase from "firebase";
import CreateRoom from "./components/conductor/CreateRoom";
var firebaseConfig = {
  apiKey: "AIzaSyAs_ffWjHjzmPXeL_CkYKo5YkgZJbV3NSk",
  authDomain: "band-aid-music.firebaseapp.com",
  databaseURL: "https://band-aid-music.firebaseio.com",
  projectId: "band-aid-music",
  storageBucket: "band-aid-music.appspot.com",
  messagingSenderId: "336491551539",
  appId: "1:336491551539:web:37a2c759fec6e42c9cfc46"
};
firebase.initializeApp(firebaseConfig);
function App() {

  return (
    <div className="App">
      <div className="w-75 p-3"
           style={{
             backgroundColor: '#eee',
             margin: '0 auto',
             height: '95vh'
           }}>
      <Router>
        <Switch>
          <Route path="/conductor"
                 render={() => {
                   return <Conductor firebase={firebase} />
                 }}/>
          <Route path="/student"
                 render={() => {
                    return <Student firebase={firebase} />
                 }}/>
          <Route exact path="/testpage" component={TestPage} />
          <Route exact path="/" component={UploadPage} />
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
