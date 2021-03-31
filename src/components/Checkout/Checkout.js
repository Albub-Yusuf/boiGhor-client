import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container } from 'react-bootstrap';

const Checkout = () => {
    const [cartInfos, setCartInfos] = useContext(CartContext);
    const {id, name, writer, price, imageURL} = cartInfos;



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
            <Button>Checkout</Button>
        </div>
        </Container>
    );
};

export default Checkout;