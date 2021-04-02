import React from 'react';
import { faEdit, faPlus, faThList, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './HiddenNav.css';


const HiddenNav = () => {
    return (
        <div className="hidden-wrapper">

            <div className="hidden-brand">
            <div  className="brandName">
               <h3><strong>BoiGhor</strong></h3>
           </div>
            </div>

           <div className="hidden-menus">
           <div  className="menus">
               <Link to="/admin"><p><FontAwesomeIcon icon={faThList} /> </p></Link>
           </div>
           
            <div  className="menus">
               <Link to="/add"><p> <FontAwesomeIcon icon={faPlus} /> </p></Link>
           </div>

           <div  className="menus">
               <Link to="/home"><p><FontAwesomeIcon icon={faHome} /> </p></Link>
           </div>
           
            <div className="menus">
               <p><FontAwesomeIcon icon={faEdit} /></p>
           </div>
           
           
           </div>

           
           <br></br>
        </div>
    );
};

export default HiddenNav;