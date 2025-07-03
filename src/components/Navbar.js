import React from "react";
import './Navbar.css';
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <>
        <div className="Navbar">
        <div className="Logo">
        <p> Logo </p>
        </div>
        <div className="nav1">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/addproduct">Add Product</Link></li>
                <li>About</li>
            </ul>
        </div>
        <div className="nav1">
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li>Signup</li>
            </ul>
        </div>
        </div>        
        </>
    ) ;
}

export default Navbar ;