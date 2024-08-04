import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductItem from '../home/products/ProductItem';
import { Product } from '../global/ProductContext';

const RelatedProducts = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function fetchRelatedProducts() {
            if (id) {
                try {
                    const { data: mainProduct } = await axios.get<Product>(`http://localhost:3000/products/${id}`);
                    const { data: relatedProducts } = await axios.get<Product[]>(`http://localhost:3000/products?category=${mainProduct.category}`);

                    const filteredProducts = relatedProducts.filter(product => product.id !== mainProduct.id);
                    setProducts(filteredProducts);
                } catch (error) {
                    console.error('Error fetching related products:', error);
                }
            }
        }

        fetchRelatedProducts();
    }, [id]);

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <section className=" my-[50px] font-sans">
            <h2 className="text-4xl font-bold mb-6 text-center ">Related Products</h2>
            <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-auto justify-center md:ml-[50px] md:mr-[50px] gap-6 justify-center">
                {products.slice(0, 4).map(product => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
                            <ProductItem
                                id={product.id}
                                name={product.title}
                                description={product.description}
                                price={product.salePrice}
                                normalPrice={product.normalPrice}
                                image={product.images}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default RelatedProducts;
