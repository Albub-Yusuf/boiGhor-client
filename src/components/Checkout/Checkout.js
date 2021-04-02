import React, { useContext } from 'react';
import { AuthContext, CartContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container } from 'react-bootstrap';

import Navbar from '../Navbar/Navbar';
import './Checkout.css';


const Checkout = () => {
  const [cartInfos, setCartInfos] = useContext(CartContext);
  const { id, name, writer, price, imageURL } = cartInfos;

  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const userName = loggedInUser.name;


  const proceedCheckout = () => {
    const newOrder = {
      user: userName,
      email: loggedInUser.email,
      book: name,
      writer: writer,
      price: price,
      image: imageURL,
      quantity: 1,
      orderTime: new Date()

    }

    const url = `https://mighty-fjord-75782.herokuapp.com/addOrder`;



    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {

          alert('your order placed successfully')
        }
      })

  }


  return (

    <div>
      <Navbar></Navbar>
      <Container>
        <br></br>
        <h2>Checkout</h2>

        <div className="tableSecondaryStyle">

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
        <div className="checkout-btn">
          <Button onClick={proceedCheckout}>Checkout</Button>
        </div>
      </Container>
    </div>


  );
};

export default Checkout;