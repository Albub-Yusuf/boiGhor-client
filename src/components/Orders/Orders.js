import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';

import Navbar from '../Navbar/Navbar';
import './Orders.css';



const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const url = `https://mighty-fjord-75782.herokuapp.com/orders/${loggedInUser.email}`;
    console.log(url);

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [])

    return (
        
 
        <div>
            <Navbar></Navbar>
            <Container>
            <br></br>
            <h2>Orders</h2>
            
            <div className="tableSecondaryStyle">

                <div>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Books</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                orders.map(order => <tr key={order._id}>

                                    <td>{order.book}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td>{order.orderTime}</td>

                                </tr>)
                            }

                        </tbody>
                    </Table>
                </div>

            </div>

        </Container>
        </div>

    );
};

export default Orders;