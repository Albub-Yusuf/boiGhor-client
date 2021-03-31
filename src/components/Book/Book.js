import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../App';
import { Link } from 'react-router-dom';

const Book = (props) => 
{


    const [cartInfos, setCartInfos] = useContext(CartContext);
    const {_id, name, writer, price, imageURL} = props.book;


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

     const  loadBook =  (id) =>  {
        // console.log(id);
        
        setCartInfos(id);
      

        console.log(cartInfos);
       
        fetch(`http://localhost:5000/book/${id}`)
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