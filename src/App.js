import logo from './logo.svg';
import './App.css';
import React from "react";
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

function App() {
  return (
    <div>
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Book</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>

      
        <Switch>
          <Route path="/home">
              <Home></Home>
          </Route>
          <Route path="/add">
            <AddBook></AddBook>
          </Route>
          <Route path="/orders">
            <Orders></Orders>
          </Route>
          <Route path="/admin">
             <Admin></Admin>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
