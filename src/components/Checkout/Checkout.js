import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, CartContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container } from 'react-bootstrap';

const Checkout = () => {
    const [cartInfos, setCartInfos] = useContext(CartContext);
    const {id, name, writer, price, imageURL} = cartInfos;

    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
    const userName = loggedInUser.name;
   

    const proceedCheckout = () => {
        const newOrder = {
            user: userName,
            email: loggedInUser.email,
            book:name,
            writer: writer,
            price: price,
            image: imageURL,
            quantity: 1,
            orderTime: new Date()

        }

        const url = `http://localhost:5000/addOrder`;

        console.log(newOrder);
////////////////


fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(newOrder)
  })
  .then(res => res.json())
  .then(data => {
    if(data){
      // processOrder();
      alert('your order placed successfully')
    }
  })


        

   ////////////

    }



    return (
        <Container>
            <br></br>
             <h2>Checkout</h2>
             <br></br>
            <div style={{width:'90%', margin:'30px', padding:'10px', boxShadow:'10px 10px 20px #ccc', borderBottom:'2px solid #333', borderRadius:'5px'}}>
           
           

            <div>
    <Table responsive="sm">
    <thead>
      <tr>
        <th>Description</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{name}</td>
        <td>&nbsp; &nbsp;&nbsp;1</td>
        <td>{price}/- </td>
      </tr>
      <tr>
        <td><strong>Total</strong></td>
        <td>&nbsp;</td>
        <td>{price}/-</td>
      </tr>
    </tbody>
  </Table>
            </div>

        </div>
        <div  style={{width:'90%', display:'flex',justifyContent:'right'}}>
            <Button onClick={proceedCheckout}>Checkout</Button>
        </div>
        </Container>
    );
};

export default Checkout;