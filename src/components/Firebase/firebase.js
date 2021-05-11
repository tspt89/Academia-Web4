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

class Firebase {
    constructor(){
        app.initializeApp(config);

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
 
    user = uid => this.db.ref(`users/${uid}`);
    
    users = () => this.db.ref('users');
}

export default Firebase;