import React, { useEffect, useState } from 'react';
import Book from '../Book/Book';
import Navbar from '../Navbar/Navbar';
import { Button, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {

    const [books, setBooks] = useState([]);
    const [spinner, setSpinner] = useState(null);

    useEffect(() => {

        setSpinner(1);
        fetch('https://mighty-fjord-75782.herokuapp.com/books')
            .then(res => res.json())
            .then(data => {

                setBooks(data);
                setSpinner(null);
            }



            );

    }, [])

    return (
        <div>
            <Navbar></Navbar>

            <Container>

                <div className="home-container-wrapper">
                    <input className="inputStyle" id="search" type="text" placeholder="search" />
                    <Button id="search-btn" className="btn-add-to-cart">Search</Button>
                </div>


                <div id="book-wrapper-container">
                    {
                        books.map(book => <Book key={book._id} book={book}></Book>)
                    }

                    {
                        spinner &&

                        <Spinner style={{ margin: '200px auto' }} animation="border" role="status" variant="warning">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                </div>
            </Container>
        </div>
    );
};

export default Home;