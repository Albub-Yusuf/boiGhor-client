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

import Navbar from '../Navbar/Navbar';


const Login = () => {


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }


    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();

    const {from} = location.state || {from: {pathname: "/"}};


    const handleLogin = () => {

    
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                const { displayName, email, photoURL } = result.user;
                const signedInUser = { name: displayName, email, isLoggedIn: true, image:photoURL };
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

            <Navbar></Navbar>
            <div style={{display:'flex', alignItems:'center', justifyContent: 'center',minHeight:'400px'}}>
              
            {/* google Sign in button */}
            <div className="loginBox" style={{boxShadow:'10px 10px 20px lightgrey', padding:'20px', width:'300px', textAlign:'center'}}>
                <h3>Login</h3>
               <br></br>
                <Button onClick={handleLogin}><FontAwesomeIcon icon={faGoogle} />   &nbsp;&nbsp;Login with google</Button>
                <br /><br />
            </div>

        </div>
        </div>
    );
};

export default Login;