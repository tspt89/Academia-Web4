import React from 'react';
import { Nav } from 'react-bootstrap';
 
import { withFirebase } from '../Firebase';
 
const SignOutButton = ({ firebase }) => (
  <Nav.Link type="button" onClick={firebase.doSignOut}>
    Sign Out
  </Nav.Link>
);
 
export default withFirebase(SignOutButton);