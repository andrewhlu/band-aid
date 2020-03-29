import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Error404 from "../Error404";
import RecordingPage from "./RecordingPage";
function Student() {

  return (
    <div className="Student">
      <h1>Student page</h1>
      <Router>

        <Switch>
          {/*<Route exact path="/student" component={CreateRoom}/>*/}
          <Route exact path="/student/recording" component={RecordingPage}/>
          <Route component={Error404} />
        </Switch>
      </Router>

    </div>
  );
}

export default Student;
