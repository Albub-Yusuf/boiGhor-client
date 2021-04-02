import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../App';
import { Link } from 'react-router-dom';
import './Book.css';

const Book = (props) => {


    const [cartInfos, setCartInfos] = useContext(CartContext);
    const { _id, name, writer, price, imageURL } = props.book;




    const loadBook = (id) => {

        setCartInfos(id);

        fetch(`https://mighty-fjord-75782.herokuapp.com/book/${id}`)
            .then(res => res.json())
            .then(data => {

                const singleBook = {
                    id: data._id,
                    name: data.name,
                    writer: data.writer,
                    price: data.price,
                    imageURL: data.imageURL
                }

                setCartInfos(singleBook);
            })
    }


    return (
        <div>
            <div id="card">
                <div id="card-photo">
                    <img src={imageURL} alt={name} />
                </div>

                <div>
                    <h5>{name}</h5>
                    <p>{writer}</p>
                </div>

                <div>
                    <div id="card-content">

                        <h5><strong>{price}</strong>/-</h5>

                        <Link to="/checkout"><Button className="btn-add-to-cart" onClick={() => loadBook(_id)}>Buy Now</Button></Link>
                    </div>



                </div>

            </div>
        </div>
    );
};

export default Book;