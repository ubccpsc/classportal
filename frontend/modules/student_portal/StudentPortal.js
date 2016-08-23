import React from 'react'
import Deliverables from './Deliverables'
import Grades from './Grades'
import Info from './Info'
import Logout from './Logout'
import CreateTeam from '../shared_components/CreateTeam'
import DisplayTeam from './DisplayTeam'
import NavLink from '../NavLink'
import { Row, Col, Form, FormField, FormInput, Button, Checkbox, Glyph } from 'elemental'

export default React.createClass({
  getInitialState: function() {
    return {
      studentObject: '',
      deliverablesObject: '',
      gradesObject: ''
    };
  },
  //TODO: DON'T RETURN ALL INFO on student. Make public and private keys in students.json  
  getStudent: function () {  
    console.log("StudentPortal.js| Requesting student");
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4321/api/getStudent',
      headers: {
        "user": localStorage.user,
        "token": localStorage.token,
        "admin": localStorage.admin
      },
      data: {},
      dataType: "json",
      cache: false,
      success: function (response) {
        console.log("StudentPortal.js| Retrieved student: \n" + JSON.stringify(response));
        this.setState({ studentObject: response }, function () {
          this.getDeliverables();
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("StudentPortal.js| Error retrieving student file!", status, err.toString());
      }.bind(this)
    });
  },
  getDeliverables: function () {
    console.log("StudentPortal.js| Requesting deliverables");
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4321/api/getDeliverables',
      headers: {
        "user": localStorage.user,
        "token": localStorage.token,
        "admin": localStorage.admin
      },
      data: {},
      dataType: "json",
      success: function (response) {
        console.log("StudentPortal.js| Retrieved "+response.length+" deliverables");
        this.setState({ deliverablesObject: response }, function () {
          this.getGrades();
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("StudentPortal.js| Error retrieving deliverables!");
      }.bind(this)
    });
  },
  getGrades: function () {
    console.log("StudentPortal.js| Requesting grades");
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4321/api/getGrades',
      headers: {
        "user": localStorage.user,
        "token": localStorage.token,
        "admin": localStorage.admin
      },
      data: {
        "sid": this.state.studentObject.sid
      },
      dataType: "json",
      success: function (response) {
        console.log("StudentPortal.js| Retrieved grades: " + response);
        this.setState({ gradesObject: response });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("StudentPortal.js| Error getting grades!");
      }.bind(this)
    });
  },
  getClasslist: function () {
    return [{ "label": "asdf" }, { "label": "qwerty" }];
  },
  componentDidMount: function () {
    this.getStudent();
  },
  render: function () {
    return (
      <div>
        <div className="module">
          <h3>Welcome, {this.state.studentObject.firstname}!</h3><br/>
          <Logout sid={this.state.studentObject.sid} user={localStorage.user}/><br/>
        </div>
        
        { !!this.state.studentObject.team ?
          (<DisplayTeam teamNumber={this.state.studentObject.team}/>) : (<CreateTeam classList={this.getClasslist()} />) }

        <Deliverables deliverables={this.state.deliverablesObject}/>
        
        <Grades grades={this.state.gradesObject} deliverables={this.state.deliverablesObject}/><br/>

      </div>
    )}
})