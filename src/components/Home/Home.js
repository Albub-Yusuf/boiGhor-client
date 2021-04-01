import React, { useEffect, useState } from 'react';
import Book from '../Book/Book';

const Home = () => {

    const [books, setBooks] = useState([]);

    useEffect(()=>{

        fetch('https://mighty-fjord-75782.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setBooks(data));

    },[])

    return (
        <div>
            <h3>Home Page</h3>
            <div style={{display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
                {
                    books.map(book => <Book key={book._id} book={book}></Book>)
                }
            </div>
        </div>
    );
};

export default Home;