import React from 'react';
import Hero from "./Hero";
import BrowseTheRange from "./BrowseTheRange";
import Products from "./products/Products";
import Inspiration from "./Inspiration";
import ShareSetup from "./ShareSetup";

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <BrowseTheRange />
            <Products />
            <Inspiration />
            <ShareSetup />
        </>
    );
};

export default Home;
