import React from 'react';
import ProductDetails from "./ProductsDetails";
import Description from "./Description";
import RelatedProduct from "./RelatedProduct";


const PagProduct: React.FC = () => {
    return (
        <>
            <ProductDetails />
            <Description />
            <RelatedProduct />
        </>
    );
};

export default PagProduct;
