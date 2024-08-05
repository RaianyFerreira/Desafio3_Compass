import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import Shop from "./components/shop/Shop";
import Cart from "./components/cart/Cart";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PagProduct from "./components/singleProducts/PagProduct";
import Checkout from "./components/checkout/Checkout";
function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<PagProduct />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
