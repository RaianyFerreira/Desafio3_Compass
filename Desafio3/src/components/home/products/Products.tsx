import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';

export type Product = {
    id: string;
    sku: string;
    title: string;
    description: {
        short: string;
        long: string;
    };
    normalPrice: number;
    salePrice: number;
    discountPercentage: number;
    new: boolean;
    images: {
        mainImage: string;
        gallery: string[];
    };
    rating: number;
}

const Products = () => {
    const navigate = useNavigate();

    function redirectShop() {
        navigate('/shop');
    }

    const [products, setProducts] = React.useState<Product[] | null>(null);

    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data = await response.json() as Product[];
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = products?.filter(product =>
        [21, 28, 29, 32, 38, 41, 45, 52].includes(Number(product.id))
    ).slice(0, 8);

    return (
        <section className="container md:mx-auto">
            <h2 className="text-[#333] text-[2rem] font-bold text-center mx-auto mt-[50px] md:mt-[80px] mb-[20px]">Our Products</h2>
            {filteredProducts ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-[95px] md:mx-auto">
                    {filteredProducts.map((product) => (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            name={product.title}
                            description={product.description.short}
                            price={product.salePrice}
                            normalPrice={product.normalPrice}
                            image={product.images.mainImage}
                        />
                    ))}
                </ul>
            ) : (
                ''
            )}
            <div className="flex justify-center mt-8 mb-[80px]">
                <button onClick={redirectShop} className="border border-[#B88E2F] bg-white text-[#B88E2F] font-bold py-3 px-[80px] hover:text-white hover:bg-[#B88E2F]">Show More</button>
            </div>
        </section>
    );
}

export default Products;
