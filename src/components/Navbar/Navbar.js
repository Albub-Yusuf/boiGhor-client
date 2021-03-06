import React, { useContext } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../App';
import { useState } from 'react';


const Navbar = () => {
    //set AuthContext
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

    const [locations, setLocations] = useState(false);

    //navbar collapse toggle
    const handleNavToggle = () => {

        if (locations == false) {

            setLocations(true);

        }

        if (locations == true) {

            setLocations(false);

        }

    }

    return (
        <div className="nav-outer-wrapper">
                <Container>
            <div className="nav-wrapper">
                <div className="logo">
                    <h3>BoiGhor</h3>
                </div>

                <div className="nav-link">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        {/* <li><Link to="/add">Add Book</Link></li> */}
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                        <li id="conditionalProfile">{loggedInUser.email ? <img src={loggedInUser.image}  alt={loggedInUser.name} style={{width: '40px', height:'40px', borderRadius:'50%'}}/> : <Link to="/login"><button className="login-btn">Login</button></Link>}</li>
                        <li><FontAwesomeIcon className="ham-menu" icon={faBars} onClick={handleNavToggle}></FontAwesomeIcon></li>
                    </ul>
                </div>

            </div>

            {/* Collapsed navigation */}
            {
                locations && <div id="hidden-ui" style={{ display: 'flex', background: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <p><Link to="/home" onClick={handleNavToggle}><strong>Home</strong></Link></p>
                        {/* <p><Link to="/add" onClick={handleNavToggle}><strong>Add Book</strong></Link></p> */}
                        <p><Link to="/orders" onClick={handleNavToggle}><strong>Orders</strong></Link></p>
                        <p><Link to="/admin" onClick={handleNavToggle}><strong>Admin</strong></Link></p>
                        <p>{loggedInUser.email ? <img src={loggedInUser.image}  style={{width: '40px', height:'40px', borderRadius:'50%'}} alt={loggedInUser.name}/> : <Link to="/login" onClick={handleNavToggle}><button className="login-btn">Login</button></Link>}</p>
                    </div>
                </div>

            }

        </Container>
        </div>
        
    );
};

export default Navbar;