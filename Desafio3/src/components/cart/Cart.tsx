import React from 'react';
import CartProducts from "./CartProducts";
import HeroCart from "./HeroCart";
import Infos from "../global/Infos";

const Cart: React.FC = () => {
    return (
        <>
            <HeroCart />
            <CartProducts />
            <Infos />
        </>
    );
};

export default Cart;
