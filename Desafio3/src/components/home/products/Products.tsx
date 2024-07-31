import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import { useProduct } from "../../hero/ProductContext";

export type Product = {
    id: number;
    title: string;
    tags: string[];
    sku: number;
    sizes: string[];
    description: {
        short: string;
        long: string;
    };
    images: {
        mainImage: string;
        gallery: string[];
    };
    salePrice: number;
    normalPrice: number;
    colors: {
        name: string;
        hex: string;
    }[];
};

const Products = () => {
    const navigate = useNavigate();
    const { setSelectedProductId } = useProduct();
    const [products, setProducts] = React.useState<Product[] | null>(null);

    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data = await response.json() as Product[];

                // Função para obter um array de IDs aleatórios
                function getRandomItems(array: Product[], count: number): Product[] {
                    const shuffled = array.sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, count);
                }

                // Selecionar 8 produtos aleatórios
                const randomProducts = getRandomItems(data, 8);
                setProducts(randomProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    function redirectShop() {
        navigate('/shop');
    }

    return (
        <section className="container md:mx-auto">
            <h2 className="text-[#333] text-[2rem] font-bold text-center mx-auto mt-[50px] md:mt-[80px] mb-[20px]">Our Products</h2>
            {products ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-[95px] md:mx-auto">
                    {products
                        .filter(product => product.images?.mainImage)
                        .map((product) => (
                            <ProductItem
                                key={product.id}
                                id={product.id}
                                name={product.title}
                                description={product.description}
                                image={product.images}
                                price={product.salePrice}
                                normalPrice={product.normalPrice}
                                onClick={() => navigate(`/product/${product.id}`)}
                            />
                        ))
                    }
                </ul>
            ) : (
                <p className="text-center">No products available</p>
            )}
            <div className="flex justify-center mt-8 mb-[80px]">
                <button
                    onClick={redirectShop}
                    className="border border-[#B88E2F] bg-white text-[#B88E2F] font-bold py-3 px-[80px] hover:text-white hover:bg-[#B88E2F]"
                >
                    Show More
                </button>
            </div>
        </section>
    );
};

export default Products;
