import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import Shop from "./components/shop/Shop";
import Signup from "./components/signup/Signup";
import Login from "./components/signup/login/Login";
import Favorites from "./components/favorites/Favorites";
import Cart from "./components/cart/Cart";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
