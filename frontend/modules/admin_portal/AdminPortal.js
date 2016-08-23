import React from 'react'
import NavLink from '../NavLink'
import { Row, Col, Form, FormField, FormInput, Button, Checkbox, Glyph } from 'elemental'
import Logout from '../shared_components/Logout'
import AdminTeams from './AdminTeams'
import AdminDeliverables from './AdminDeliverables'
var util = require('util');

export default React.createClass({
  getInitialState: function() {
    return {
      adminObject: '',
      studentObject: '',
      gradesObject: '',
      deliverablesObject: '',
      
    };
  },
  getDeliverables: function () {
    console.log("AdminDeliverables.js| Requesting deliverables");
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
        console.log("AdminDeliverables.js| Retrieved "+response.length+" deliverables");
        this.setState({ deliverablesObject: response }, function () {
          console.log("AdminDeliverables.js| deliverablesObject set: "+JSON.stringify(this.state.deliverablesObject[1]));
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("AdminDeliverables.js| Error retrieving deliverables!");
      }.bind(this)
    });  
  },
  componentDidMount: function () {
    this.getDeliverables();
  },
  render: function () {
    var that = this;
    //Read more about passing props to this.props.children:
    //http://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    var childrenWithProps = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        "students": that.state.studentsObject,
        "grades": that.state.gradesObject,
        "deliverables": that.state.deliverablesObject
      });
    });
    
    return (
      <div>
        <div id="NavLinks">
          <Row>
            <Col sm="1/3">
              <NavLink to="/admin/teams" onlyActiveOnIndex={true}>Teams View</NavLink>
            </Col>
            <Col sm="1/3">
              <NavLink to="/admin/students">Students View</NavLink>
            </Col>
            <Col sm="1/3">
              <NavLink to="/admin/deliverables">Deliverables View</NavLink>
            </Col>
          </Row>
        </div>

        <Logout firstname={this.state.adminObject.firstname} sid={this.state.adminObject.role} user={localStorage.user}/><br/>

        {!!this.state.deliverablesObject && childrenWithProps}

        <br/>  
      </div>
    )}
})

//this.props.children