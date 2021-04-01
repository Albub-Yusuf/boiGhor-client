import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../App';
import { Link } from 'react-router-dom';

const Book = (props) => 
{


    const [cartInfos, setCartInfos] = useContext(CartContext);
    const {_id, name, writer, price, imageURL} = props.book;


   

     const  loadBook =  (id) =>  {
        // console.log(id);
        
        setCartInfos(id);
      

        console.log(cartInfos);
       
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

            console.log(singleBook);

            setCartInfos(singleBook);
        })
    }


    return (
        <div>
            <div id="card" style={{width: '250px', height:'350px', border:'2px solid #333', margin: '10px', padding:'10px',textAlign:'center'}}>
                <div style={{width:'250px', height:'200px', textAlign:'center'}}>
                    <img src={imageURL} alt={name} style={{height:'100%'}}></img>
                </div>
               
                <div>
                    <h5>{name}</h5>
                    <p>{writer}</p>
                </div>
              
                <div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        
                     <h5><strong>{price}</strong>/-</h5>
                   
                    <Link to="/checkout"><Button  onClick={() => loadBook(_id)}>Add to Cart</Button></Link>
                    </div>
                    {/* <button onClick={() => deleteBook(_id)} >Delete</button>
                    <button onClick={() => loadBook(_id)} >Edit</button> */}

                    
                </div>

            </div>
        </div>
    );
};

export default Book;