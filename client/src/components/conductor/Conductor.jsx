import React from 'react';
import RequestRecordingForm from './RequestRecordingForm';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Error404 from "../Error404";
import CreateRoom from "./CreateRoom";
function Conductor() {

  return (
    <div className="Conductor">
      <h1>Conductor page</h1>
      <Router>

        <Switch>
          <Route exact path="/conductor" component={CreateRoom}/>
          <Route exact path="/conductor/request" component={RequestRecordingForm}/>
          <Route component={Error404} />
        </Switch>
      </Router>

    </div>
  );
}

export default Conductor;
