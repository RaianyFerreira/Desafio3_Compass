// Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniCart from './MiniCart';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <header className="bg-white mt-[35px] mb-0 relative">
            <section className="flex justify-between items-center px-4 md:px-0 container mx-auto">
                <Link to="/" className="flex items-center pl-4 md:pl-[0px] pr-4 md:pr-[0px] mr-[150px] md:mr-0">
                    <img src="/img/logo_furniro.png" alt="Furniro" className="w-[170px] md:w-[150px]" />
                </Link>
                <button className="md:hidden order-last relative" onClick={() => setIsOpen(!isOpen)}>
                    <img src="/img/menu_hamburguer.svg" alt="Menu" className="w-[30px] ml-[30px] md:ml-0" />
                </button>
                <ul className={`font-sans font-semibold md:flex md:flex-row md:gap-[75px] md:relative md:w-auto md:bg-transparent md:shadow-none absolute top-full right-0 w-[200px] bg-white shadow-md transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 hidden md:translate-y-0 md:opacity-100'}`}>
                    <li><Link to="/" className="block px-4 py-2 text-black text-lg hover:underline md:p-0">Home</Link></li>
                    <li><Link to="/shop" className="block px-4 py-2 text-black text-lg hover:underline md:p-0">Shop</Link></li>
                    <li><Link to="/about" className="block px-4 py-2 text-black text-lg hover:underline md:p-0">About</Link></li>
                    <li><Link to="/contact" className="block px-4 py-2 text-black text-lg hover:underline md:p-0">Contact</Link></li>
                </ul>
                <ul className="flex items-center gap-[20px] md:gap-[45px] transition-opacity duration-300 md:ml-[70px]">
                    <li><Link to="/signup"><img src="/img/icon_logarConta.png" alt="Conta deslogada" className="w-[25px] cursor-pointer transition-transform duration-300 hover:scale-110" /></Link></li>
                    <li><img src="/img/icon_carrinho.png" alt="Carrinho de compras" className="w-[25px] cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => setIsCartOpen(!isCartOpen)} /></li>
                </ul>
            </section>
            {isCartOpen && <MiniCart />}
        </header>
    );
};

export default Header;
