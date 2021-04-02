import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container, Spinner } from 'react-bootstrap';
import SideNav from '../SideNav/SideNav';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HiddenNav from '../HiddenNav/HiddenNav';


const Admin = () => {


    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [deleteSpinner, setDeleteSpinner] = useState(null);


    const url = `https://mighty-fjord-75782.herokuapp.com/books`;

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => setBooks(data));

    }, [])

    const deleteBook = (id) => {


        const url = `https://mighty-fjord-75782.herokuapp.com/delete/${id}`;


        setDeleteSpinner(1);
        // DELETE request using fetch with error handling
        fetch(url, { method: 'DELETE' })
            .then(async response => {
                const data = await response.json();

                setDeleteSpinner(null);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                if (response.ok) {

                    alert('Book deleted successfully!!!');

                    setDeleteSpinner(null);
                }
            })
            .catch(error => {
                //setErrorMessage(error);
                console.error('There was an error!', error);
                setDeleteSpinner(null);

            });


    }


    return (

        <div>
            <div className="Adminwrapper">

                {/* SideNav */}
                <div className="side-nav-section"><SideNav></SideNav></div>
                <div className="content">

                    {/* Hidden Nav */}
                    <div className="hiddenNavAdmin">
                        <HiddenNav></HiddenNav>
                    </div>

                    {/* Top panel */}
                    <div className="topPanel">
                        <h3>Manage Book</h3>
                        {
                            deleteSpinner &&

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Spinner style={{ margin: '0px auto', textAlign: 'center' }} animation="grow" role="status" variant="warning">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                <span style={{ color: 'red' }}>Deleting...</span>
                            </div>

                        }
                    </div>

                    <div className="mainPanel">


                        <Container fluid>
              
                            <h2>Book List</h2>
                            
                            <div className="table-wrapper">
                                <div>
                                    <Table responsive="sm">
                                        <thead>
                                            <tr>
                                                <th>Books</th>
                                                <th>Author</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                books.map(book => <tr key={book._id}>

                                                    <td>{book.name}</td>
                                                    <td>{book.writer}</td>
                                                    <td>{book.price}/-</td>
                                                    <td>
                                                        <span><FontAwesomeIcon icon={faEdit} />  &nbsp;</span> 
                                                         <span style={{ cursor: 'pointer' }} onClick={() => deleteBook(book._id)}><FontAwesomeIcon icon={faTrash} /> &nbsp;</span> &nbsp;&nbsp;
                                                    </td>

                                                </tr>)
                                            }

                                        </tbody>
                                    </Table>
                                </div>

                            </div>

                        </Container>


                    </div>
                </div>
            </div>
        </div>







    );
};

export default Admin;