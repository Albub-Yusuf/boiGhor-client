import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Container } from 'react-bootstrap';

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
        <Container>
            <br></br>
            <h2>Orders</h2>
            <br></br>
            <div style={{ width: '90%', margin: '30px', padding: '10px', boxShadow: '10px 10px 20px #ccc', borderBottom: '2px solid #333', borderRadius: '5px' }}>



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
    );
};

export default Orders;