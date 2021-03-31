import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../App';
import './Login.css';
import { useHistory, useLocation } from 'react-router';



import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


const Login = () => {


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }


    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();

    const {from} = location.state || {from: {pathname: "/"}};


    const handleLogin = () => {
        console.log('clicked');


        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email, isLoggedIn: true };
                setLoggedInUser(signedInUser);
                history.replace(from);

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                const newData = {
                    hasError: errorMessage,
                }
                setLoggedInUser(newData);
            });

    }

    return (
        <div>
            {/* google Sign in button */}
            <div>
                &mdash;&mdash;&mdash;&mdash; Or &mdash;&mdash;&mdash;&mdash;
                <br /><br />
                <Button onClick={handleLogin}><FontAwesomeIcon icon={faGoogle} />    &nbsp;&nbsp;Continue with google</Button>
                <br /><br />
            </div>

        </div>
    );
};

export default Login;