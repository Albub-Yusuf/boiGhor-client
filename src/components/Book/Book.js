import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../App';
import { Link } from 'react-router-dom';
import './Book.css';

const Book = (props) => 
{


    const [cartInfos, setCartInfos] = useContext(CartContext);
    const {_id, name, writer, price, imageURL} = props.book;


   

     const  loadBook =  (id) =>  {
        
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
            <div id="card" style={{width: '300px', height:'400px', boxShadow:'10px 10px 20px lightgrey', border:'.5px solid #fff9db', borderRadius:'5px', margin: '10px', padding:'10px',textAlign:'center'}}>
                <div style={{width:'99%', height:'250px', textAlign:'center', margin:'0 auto', borderRadius:'5px'}}>
                    <img src={imageURL} alt={name} style={{height:'92%', margin:'5px auto'}}></img>
                </div>
               
                <div>
                    <h5>{name}</h5>
                    <p>{writer}</p>
                </div>
              
                <div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        
                     <h5><strong>{price}</strong>/-</h5>
                   
                    <Link to="/checkout"><Button  className="btn-add-to-cart" onClick={() => loadBook(_id)}>Add to Cart</Button></Link>
                    </div>
                   

                    
                </div>

            </div>
        </div>
    );
};

export default Book;