import React from 'react'
import {browserHistory } from 'react-router'
import {Row,Col,Form,FormField,Button,FormInput,FormIconField,Glyph} from 'elemental'
import Ajax from '../shared_components/Ajax'

const sidRegex = /^([0-9]){8}$/;
const csidRegex = /^[a-z][0-9][a-z][0-9]$/;

export default React.createClass({
  getInitialState: function() {
    return { github: 'Error: not logged in' };
  },
  handleSubmit: function (event) {
    event.preventDefault();
    var sid = event.target.elements[1].value;
    var csid = event.target.elements[2].value;
    
    if (sidRegex.test(sid) && csidRegex.test(csid)) {
      Ajax.register(sid, csid,
        function success(response) {
          console.log("Register.js| Success: " + response);
          var fields = response.split('~');
          var redirect = fields[0];
              
          if (redirect == "success") {
            //TODO: need something here to "unlock" the student portal.
            console.log("Register.js| Successful registration. Redirecting to portal..");
            browserHistory.push("/");
          }
          else {
            console.log("Register.js| Invalid entry.");
            alert("Invalid entry. Please try again.");
          }
        }.bind(this),
        function error(xhr, status, err) {
          console.log("Register.js| Error: Invalid info.");
          alert("Invalid entry. Please try again.");
        }.bind(this)
      );
    }
    else {
      console.log("Register.js| Error: Invalid input.");
      alert("Invalid entry. Please try again.");
      return;
    }
  },
  componentDidMount: function () {
    if (!!localStorage.user) {
      this.setState({ github: localStorage.user });
    }
  },
  render: function () {
    return (
      <div className="module">
        <h3>Register Account</h3>
        <p>Please confirm your student info below to continue.</p><br/><br/>
        <Form onSubmit={this.handleSubmit} className="form" type="horizontal">
          <FormIconField label="UBC Student Number" iconPosition="left" iconKey="mortar-board">
            <FormInput placeholder="eg. 12345678"/>
          </FormIconField>
          <FormIconField label="Computer Science ID" iconPosition="left" iconKey="keyboard">
            <FormInput placeholder="eg. a1b2"/>
          </FormIconField>
          <FormField offsetAbsentLabel>
            <Button submit>Register with GitHub</Button>
          </FormField>
        </Form>
      </div>
    )}
})