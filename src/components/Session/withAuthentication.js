import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
 
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    
    constructor(props) {
        super(props);
   
        this.state = {
          authUser: null,
        };
      }

      componentWillUnmount() {
        this.listener();
      }

      componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
          authUser => {
            this.props.firebase
              .user(authUser.uid)
              .once('value')
              .then(snapshot => {
                const dbUser = snapshot.val();
                // default empty roles
                if (!dbUser.role) {
                  dbUser.role = {};
                }
                // merge auth and db user
                authUser = {
                  uid: authUser.uid,
                  email: authUser.email,
                  role: authUser.role,
                  ...dbUser,
                };
                this.setState({ authUser });
              });
          },
        );
      }

    render() {
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
              <Component {...this.props} />
            </AuthUserContext.Provider>
          );
    }
  }
 
  return withFirebase(WithAuthentication);
};
 
export default withAuthentication;