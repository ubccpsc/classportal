import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'
import { IndexLink } from 'react-router'
import { Row, Col, Button, Alert, Spinner } from 'elemental' 
import LoginBar from './LoginBar'

export default React.createClass({
  render() {
    return (
      <div id="App">
        
        <LoginBar/>

        <div id="Title">
          <h1>Course Portal</h1>
        </div>
        
        <div id="NavLinks">
            <Row>
              <Col sm="1/2">
                <NavLink to="/" onlyActiveOnIndex={true}>Portal</NavLink>
              </Col>
              <Col sm="1/2">
                <NavLink to="/update">Update Info</NavLink>
              </Col>
                
            </Row>
        </div>

        {this.props.children}
      </div>
    )}
})