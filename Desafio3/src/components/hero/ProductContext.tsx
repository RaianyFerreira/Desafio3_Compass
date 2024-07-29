import React from 'react';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '/img/arrow_right.svg';
import Stars from '/img/stars.png';
import ProductItem from "../home/products/ProductItem";

const ProductDetails = () => {
    const [product, setProduct] = React.useState<ProductItem | null>(null);
    const [quantity, setQuantity] = React.useState(1);
    const [size, setSize] = React.useState('L');
    const [color, setColor] = React.useState('purple');
    const { selectedProductId, setSelectedProductId } = useProduct();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchProduct() {
            if (selectedProductId) {
                // Simulating an API call to fetch product data
                try {
                    const response = await fetch(`http://localhost:3000/products/${selectedProductId}`);
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        }
        fetchProduct();
    }, [selectedProductId]);

    function addQuantity() {
        if (product && product.stock && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    }

    function removeQuantity() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    function handleAddToCart() {
        if (product) {
            // Add to cart functionality
            console.log('Added to cart:', product);
        }
    }

    if (!product) return null;

    return (
        <section>
            <div className="bg-light-gray py-2 px-8 mb-8 mt-28">
                <p className="flex items-center gap-4 text-dark-gray font-normal text-base">
                    Home <img src={ArrowRight} alt=">" /> Shop <img src={ArrowRight} alt=">" /> | <h3 className="font-normal text-text-black">{product.name}</h3>
                </p>
            </div>
            <div className="flex justify-center items-start gap-20 container">
                <div className="w-full">
                    <img src={product.image.mainImage} alt={product.name} className="w-full" />
                </div>
                <div className="w-full">
                    <h1 className="text-2xl font-normal text-text-black">{product.name}</h1>
                    <span className="text-xl text-dark-gray font-medium mb-4">${product.price}</span>
                    <img className="block mb-4" src={Stars} alt="stars" />
                    <p className="text-sm font-normal text-text-black mb-6">{product.description.long}</p>
                    <h2 className="text-sm text-dark-gray font-normal mb-3">Size</h2>
                    <ul className="flex gap-4 mb-6">
                        <li
                            className={`bg-light-gray rounded-lg text-text-black font-normal w-8 h-8 flex justify-center items-center transition-transform cursor-pointer ${size === 'L' ? 'bg-brand-yellow text-white scale-125' : ''}`}
                            onClick={() => setSize('L')}
                        >
                            L
                        </li>
                        <li
                            className={`bg-light-gray rounded-lg text-text-black font-normal w-8 h-8 flex justify-center items-center transition-transform cursor-pointer ${size === 'XL' ? 'bg-brand-yellow text-white scale-125' : ''}`}
                            onClick={() => setSize('XL')}
                        >
                            XL
                        </li>
                        <li
                            className={`bg-light-gray rounded-lg text-text-black font-normal w-8 h-8 flex justify-center items-center transition-transform cursor-pointer ${size === 'XS' ? 'bg-brand-yellow text-white scale-125' : ''}`}
                            onClick={() => setSize('XS')}
                        >
                            XS
                        </li>
                    </ul>
                    <h2 className="text-sm text-dark-gray font-normal mb-3">Color</h2>
                    <ul className="flex gap-4 mb-8">
                        <li
                            onClick={() => setColor('purple')}
                            className={`bg-brand-purple rounded-full w-8 h-8 transition-transform cursor-pointer ${color === 'purple' ? 'scale-130' : ''}`}
                        ></li>
                        <li
                            onClick={() => setColor('black')}
                            className={`bg-brand-black rounded-full w-8 h-8 transition-transform cursor-pointer ${color === 'black' ? 'scale-130' : ''}`}
                        ></li>
                        <li
                            onClick={() => setColor('golden')}
                            className={`bg-brand-golden rounded-full w-8 h-8 transition-transform cursor-pointer ${color === 'golden' ? 'scale-130' : ''}`}
                        ></li>
                    </ul>
                    <div className="flex gap-4 mb-16">
                        <button className="w-32 h-16 text-base flex gap-4 bg-transparent justify-center items-center border border-dark-gray rounded-lg text-text-black">
                            <span onClick={removeQuantity} className="text-xl cursor-pointer transition-colors hover:bg-brand-yellow py-1 px-2 rounded-full">-</span>
                            {quantity}
                            <span onClick={addQuantity} className="text-xl cursor-pointer transition-colors hover:bg-brand-yellow py-1 px-2 rounded-full">+</span>
                        </button>
                        <button onClick={handleAddToCart} className="w-54 h-16 rounded-xl border border-text-black text-xl text-text-black font-normal bg-transparent transition-colors cursor-pointer hover:bg-brand-yellow hover:text-white">
                            Add To Cart
                        </button>
                    </div>
                    <div className="text-lg font-normal text-text-black mb-3">
                        Stock: {product.stock}
                    </div>
                    <div className="border-t border-dark-gray pt-10">
                        <p className="text-base text-dark-gray font-normal">SKU: {product.sku}</p>
                        <p className="text-base text-dark-gray font-normal">Category: {product.category}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;
