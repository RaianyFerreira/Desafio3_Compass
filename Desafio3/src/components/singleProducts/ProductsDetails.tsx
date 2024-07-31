import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArrowRight from '/img/arrow_right.svg';
import Stars from '/img/stars.png';
import FacebookIcon from '/img/facebook.png';
import LinkedInIcon from '/img/linkedin.png';
import TwitterIcon from '/img/twitter.png';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                setProduct(response.data);
                if (response.data.sizes.length > 0) setSize(response.data.sizes[0]);
                if (response.data.colors.length > 0) setColor(response.data.colors[0].hex);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        fetchProduct();

        window.scrollTo(0, 0);

    }, [id]);

    function addQuantity() {
        if (product && quantity < 99) {
            setQuantity(quantity + 1);
        }
    }

    function removeQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const totalPrice = (product.salePrice * quantity).toFixed(2);

    return (
        <section>
            <div className="bg-[#F9F1E7] p-6 md:mb-[50px] flex justify-between items-center mt-[40px] font-sans">
                <p className="flex items-center gap-4 text-[#9f9f9f] font-normal text-base md:ml-[65px]">
                    Home <img src={ArrowRight} alt=">" /> Shop <img src={ArrowRight} alt=">" /> | <h3 className="font-normal text-black">{product.title}</h3>
                </p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-20 container">
                <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
                    <div className="flex flex-col gap-4 md:mr-4 md:ml-[85px]">
                        {product.images.gallery.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                className="w-[150px] h-[115px] object-cover cursor-pointer border border-[#ddd]"
                                onClick={() => setProduct(prev => ({ ...prev, images: { ...prev.images, mainImage: image } }))}
                            />
                        ))}
                    </div>
                    <div className="w-[700px] h-[700px]">
                        <img src={product.images.mainImage} alt={product.title} />
                    </div>
                </div>
                <div className="">
                    <h1 className="text-4xl font-normal text-black mb-[15px]">{product.title}</h1>
                    <span className="text-2xl text-[#9f9f9f] font-medium">$ {totalPrice}</span>
                    <div className="flex items-center">
                        <div className="flex items-center mb-[14px]">
                            <img src={Stars} alt="5 Stars" className="w-[110px] h-5 mt-[10px]" />
                            <p className="text-[15px] text-[#9f9f9f] font-normal ml-2 mt-[14px]" >|</p>
                            <p className="text-[15px] text-[#9f9f9f] font-normal ml-2 mt-[14px]"> 7 Customer Reviews</p>
                        </div>
                        <hr className="h-8 border-gray-300 mx-4" />
                    </div>
                    <p className="text-sm font-normal text-black mb-6">{product.description.short}</p>
                    <h2 className="text-sm text-[#9f9f9f] font-normal mb-3">Size</h2>
                    <ul className="flex gap-4 mb-4">
                        {product.sizes.map((s, index) => (
                            <li
                                key={index}
                                className={`bg-[#B88E2F] rounded-lg text-black text-sm font-normal w-8 h-8 flex items-center justify-center cursor-pointer transition-transform duration-300 ${size === s ? ' text-white scale-125' : 'bg-[#F9F1E7] scale-90'}`}
                                onClick={() => setSize(s)}
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-sm text-[#9f9f9f] font-normal mb-3">Color</h2>
                    <ul className="flex gap-4 mb-8">
                        {product.colors.map((c, index) => (
                            <li
                                key={index}
                                onClick={() => setColor(c.hex)}
                                style={{ backgroundColor: c.hex }}
                                className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-300 ${color === c.hex ? 'scale-125' : 'scale-90'}`}
                            ></li>
                        ))}
                    </ul>
                    <div className="flex items-center mb-16">
                        <button onClick={removeQuantity} className="w-12 h-12 border-t border-b border-l text-lg border-[#9f9f9f] flex items-center justify-center text-black">
                            <span>-</span>
                        </button>
                        <span className="text-xl w-[60px] h-[48px] text-center border-t border-b border-[#9f9f9f] flex items-center justify-center">{quantity}</span>
                        <button onClick={addQuantity} className="w-12 h-12 border-t border-b border-r text-lg border-[#9f9f9f] flex items-center justify-center text-black">
                            <span>+</span>
                        </button>
                        <button className="ml-4 w-52 h-[48px] text-lg border border-black text-black bg-transparent hover:bg-[#B88E2F] hover:text-white hover:border-none transition duration-300">
                            Add To Cart
                        </button>
                    </div>
                    <div className="border-t border-[#9f9f9f] pt-10 space-y-[18px]">
                        <p className="text-base text-[#9f9f9f] font-normal">SKU <span className="ml-[55px]">:</span> <span className="ml-[10px]">{product.sku}</span></p>
                        <p className="text-base text-[#9f9f9f] font-normal">Category <span className="ml-[10px]">:</span> <span className="ml-[10px]">{product.category}</span></p>
                        <p className="text-base text-[#9f9f9f] font-normal">Tags <span className="ml-[47px]">:</span> <span className="ml-[10px]">{product.tags.join(', ')}</span></p>
                    </div>
                    <div className="mt-[18px]">
                        <h3 className="text-base text-[#9f9f9f] font-normal mb-3 flex items-center gap-2">
                            Share <span className="ml-[36px] mr-[8px]">:</span>
                            <a href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                                <img src={FacebookIcon} alt="Share on Facebook" className="w-6 h-6 cursor-pointer" />
                            </a>
                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                                <img src={LinkedInIcon} alt="Share on LinkedIn" className="w-6 h-6 cursor-pointer" />
                            </a>
                            <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                                <img src={TwitterIcon} alt="Share on Twitter" className="w-6 h-6 cursor-pointer" />
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
            <hr className="h-8 border-gray-300 mx-full mt-[50px]" ></hr>
        </section>
    );
};

export default ProductDetails;
