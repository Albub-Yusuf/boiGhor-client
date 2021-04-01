import React, { useContext } from 'react';
import './SideNav.css';
import { faEdit, faPlus, faThList, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';

const SideNav = () => {

    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

   
    return(
        
        <div className="sidebar">
           <div className="brandName">
               <h3><strong>BoiGhor</strong></h3>
           </div>
           <br></br>
           <div className="menus">
               <img src={loggedInUser.image} style={{width:'40px', height:'40px', borderRadius:'50%'}}/> &nbsp;&nbsp;<span>{loggedInUser.name}</span>
           </div>
            <br></br>
 
            <div className="menus">
               <Link to="/admin"><p><FontAwesomeIcon icon={faThList} /> Manage Books</p></Link>
           </div>
           <br></br>
            <div className="menus">
               <Link to="/add"><p> <FontAwesomeIcon icon={faPlus} />  Add Book</p></Link>
           </div>
           <br></br>
            <div className="menus">
               <p><FontAwesomeIcon icon={faEdit} /> Edit Book</p>
           </div>
           <br></br>
           <div className="menus">
               <Link to="/home"><p><FontAwesomeIcon icon={faHome} /> Online Shop</p></Link>
           </div>
           <br></br>
         </div>

    );
};

export default SideNav;