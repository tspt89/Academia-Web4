import app from 'firebase/app';
import auth from 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyCls_dMxIaG6wlyOcTywgbmKx50mgTQYdE",
    authDomain: "webacademia-67494.firebaseapp.com",
    projectId: "webacademia-67494",
    storageBucket: "webacademia-67494.appspot.com",
    messagingSenderId: "843865031037",
    appId: "1:843865031037:web:4f5880861d3930f1778c14"
};

var fdb = app.initializeApp(config)

class Firebase {
    constructor(){
        
    
        this.auth = app.auth();
        this.db = app.database();
    }


    // *** AUTH API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
    

    removeUser(uid){
      this.db.ref().child(`users/${uid}`).remove();
    }
 
    user = uid => this.db.ref(`users/${uid}`);
    
    users = () => this.db.ref('users');

    addRole = (role, uid) => this.db.ref(`${role}/`).set({user: uid});
}

export default Firebase;
export const db = fdb.database().ref();