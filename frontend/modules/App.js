import React from 'react'
import NavLink from './NavLink'
import LoginPage from './login_components/LoginPage'
import LogoutBar from './studentportal_components/LogoutBar'
import StudentPortal from './studentportal_components/StudentPortal'
import { Row, Col, Button, Alert, Spinner } from 'elemental' 

export default React.createClass({
  getInitialState: function () {
    //TODO: decide which variables to be storing here.
    //figure out how to keep only 1 copy of all variables needed in this app.
    return {
      loggedIn: '',
      username: ''
    };
  },
  componentDidMount: function () {
    //TODO: learn React event system so i don't have to keep looping the below code.
    console.log("App.js| Checking login.."); 
    if (!!localStorage.servertoken) {
      this.setState({ loggedIn: true }, function () {
        console.log("App.js| Logged in as: "+localStorage.username);
      });
    } else {
      console.log("App.js| Not logged in. localStorage: " + JSON.stringify(localStorage));
    }
  },
  render: function () {
    return (
      <div id="App">
        <div id="Title">
          <h1>Course Portal</h1>
        </div>
        {this.props.children}
      </div>
    )}
})

/*
<div id="NavLinks">
          <Row>
            <Col sm="1/2">
              <NavLink to="/" onlyActiveOnIndex={true}>Portal</NavLink>
            </Col>
            <Col sm="1/2">
              <NavLink to="/link">Update Info</NavLink>
            </Col>
          </Row>
        </div>
        */