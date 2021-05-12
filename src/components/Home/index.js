import React from 'react';
import { withFirebase } from '../Firebase';

import { withAuthorization } from '../Session';
import { compose } from 'recompose';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;
 
export default compose(withAuthorization(condition),withFirebase)(HomePage);