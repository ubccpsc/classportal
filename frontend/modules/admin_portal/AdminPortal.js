import React from 'react'
import NavLink from '../NavLink'
import { Row, Col, Form, FormField, FormInput, Button, Checkbox, Glyph } from 'elemental'
import Logout from '../student_portal/Logout'
import AdminTeams from './AdminTeams'
import AdminDeliverables from './AdminDeliverables'

export default React.createClass({
  getInitialState: function() {
    return {
      studentObject: '',
      deliverablesObject: '',
      gradesObject: ''
    };
  },
  componentDidMount: function () {
    //this.getDeliverables();
  },
  render: function () {
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

        <div className="module">
          <h3>Welcome, {localStorage.admin}!</h3><br/>
          <Logout sid="Admin-TA" username={localStorage.admin}/><br/>
        </div>

        {this.props.children}

        <br/>  
      </div>
    )}
})