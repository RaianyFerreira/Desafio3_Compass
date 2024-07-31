import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import Shop from "./components/shop/Shop";
import Login from "./components/signup/login/Login";
import Cart from "./components/cart/Cart";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PagProduct from "./components/singleProducts/PagProduct";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<PagProduct />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
