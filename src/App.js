import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddBook from './components/AddBook/AddBook';
import Orders from './components/Orders/Orders';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

 export const AuthContext = createContext();
 export const CartContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({

    name: '',
    email: '',
    isLoggedIn: '',
    isRegistered: '',
    hasError: '',

  });

  const [cartInfos, setCartInfos] = useState({

    id: ''
  })

  return (
    <div>
      <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
         <CartContext.Provider value={[cartInfos, setCartInfos]}>
            <Router>
                <Navbar></Navbar>     
                  <Switch>
                    <Route path="/login">
                    <Login></Login>
                    </Route>
                    <Route path="/home">
                        <Home></Home>
                    </Route>
                    <Route path="/add">
                      <AddBook></AddBook>
                    </Route>
                    
                    <PrivateRoute path="/orders">
                    <Orders></Orders>
                    </PrivateRoute>
                  

                    <PrivateRoute path="/checkout">
                    <Checkout></Checkout>
                    </PrivateRoute>

                    <PrivateRoute path="/admin">
                    <Admin></Admin>
                    </PrivateRoute>
                    
                    <Route exact path="/">
                      <Home></Home>
                    </Route>
              
                  </Switch>
          
            </Router>
         </CartContext.Provider>
    </AuthContext.Provider>

    </div>
  );
}

export default App;
