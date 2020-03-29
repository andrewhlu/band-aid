import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css';
import UploadPage from "./components/UploadPage";
import TestPage from "./components/TestPage";
import Conductor from "./components/conductor/Conductor";
import Student from "./components/student/Student";

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
          <Route path="/conductor" component={Conductor} />
          <Route path="/student" component={Student} />
          <Route exact path="/testpage" component={TestPage} />
          <Route exact path="/" component={UploadPage} />
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
