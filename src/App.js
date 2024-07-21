import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Table from './components/Table';
import SS2studentsresult from './components/SS2studentsresult';
import SS3studentsresult from './components/SS3studentsresult';
import SS1Studentsresult from './components/SS1studentsresult';
import Header from './components/Header';
import Allstudents from './components/Allstudents';
import SS1students from './components/SS1students';
import SS2students from './components/SS2students';
import SS3students from './components/SS3students';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Dashboard} />
        <Route path="/users" component={Table} />
        <Route path="/ss2studentsresult" component={SS2studentsresult} />
        <Route path="/ss3studentsresult" component={SS3studentsresult} />
        <Route path="/ss1studentsresult" component={SS1Studentsresult} />
        <Route path="/header" component={Header} />
        <Route path="/allstudents" component={Allstudents} />
        <Route path="/ss1students" component={SS1students} />
        <Route path="/ss2students" component={SS2students} />
        <Route path="/ss3students" component={SS3students} />





        





      </Switch>
    </Router>
  );
};

export default App;
