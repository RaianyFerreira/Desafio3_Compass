import React from 'react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Cart;
