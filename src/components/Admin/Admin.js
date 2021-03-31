import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container } from 'react-bootstrap';



const Admin = () => {


    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
const [books, setBooks] = useState([]);

const url = `http://localhost:5000/books`;

useEffect(() => {

fetch(url)
.then(res => res.json())
.then(data => setBooks(data));

},[])

    const deleteBook = (id, event) => {

        console.log(id);

        const  url = `http://localhost:5000/delete/${id}`;
        console.log(url);
        

         // DELETE request using fetch with error handling
         fetch(url, { method: 'DELETE' })
         .then(async response => {
             const data = await response.json();
 
             // check for error response
             if (!response.ok) {
                 // get error message from body or default to response status
                 const error = (data && data.message) || response.status;
                 return Promise.reject(error);
             }
 
             console.log('Delete successful');
             if (response.ok) {
                 console.log(event);
                
                // event.target.parentNode.style.display = 'none';
                //  document.getElementById("card").target.parentNode.style.display = 'none';
             }
         })
         .catch(error => {
             //setErrorMessage(error);
             console.error('There was an error!', error);
         });
    

    }


    return (
        <Container>
            <br></br>
            <h2>Orders</h2>
            <br></br>
            <div style={{ width: '90%', margin: '30px', padding: '10px', boxShadow: '10px 10px 20px #ccc', borderBottom: '2px solid #333', borderRadius: '5px' }}>



                <div>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Books</th>
                                <th>Actions</th>             
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map(book => <tr key={book._id}>



                                    <td>{book.name}</td>
                                    <td>
                                         <button>Edit</button> &nbsp;&nbsp;
                                         <button onClick={() => deleteBook(book._id)} >Delete</button>
                                    </td>


                                </tr>)
                            }

                        </tbody>
                    </Table>
                </div>

            </div>

        </Container>

    );
};

export default Admin;