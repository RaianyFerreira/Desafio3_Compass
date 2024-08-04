// MiniCart.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '/img/fechar.png';
import RemoveIcon from '/img/x.png';

const MiniCart: React.FC = () => {
    const [cart, setCart] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState(true);

    React.useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(cartFromStorage);

        const totalValue = cartFromStorage.reduce((accum, item) => accum + item.quantity * item.salePrice, 0);
        setTotal(totalValue);
    }, []);

    React.useEffect(() => {
        const totalValue = cart.reduce((accum, item) => accum + item.quantity * item.salePrice, 0);
        setTotal(totalValue);
    }, [cart]);

    const handleRemoveProduct = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleCloseOverlay = () => {
        setIsOpen(false);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 right-0 w-[380px] h-full bg-white shadow-lg p-4 z-50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <button onClick={handleCloseOverlay}>
                    <img src={CloseIcon} alt="Close" className="w-4 h-4" />
                </button>
            </div>
            <hr className="h-[1px] border border-gray-200"></hr>
            <ul className="overflow-y-auto max-h-[470px] mt-[33px]">
                {cart.map(product => (
                    <li key={product.id} className="flex items-center mb-4">
                        <img src={product.images.mainImage} alt={product.title} className="w-[85px] h-[85px] object-cover mr-4 rounded-lg" />
                        <div className="flex-1">
                            <h3 className="text-gray-800 text-sm">{product.title}</h3>
                            <p className="text-gray-600 text-sm mt-[6px]"> <span className="text-lg mr-[6px]">{product.quantity}</span> x <span className="ml-[5px] text-[12px] text-[#B88E2F]">${product.salePrice}</span></p>
                        </div>
                        <button onClick={() => handleRemoveProduct(product.id)} className="transition-transform duration-300 hover:scale-110">
                            <img src={RemoveIcon} alt="Remove" className="w-5 h-5" />
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-[20px]">
                <p className="text-lg font-sans">Subtotal <span className="ml-[130px] text-[#B88E2F] font-semibold">${total.toFixed(2)} </span></p>
                <hr className="h-[1px] border border-gray-300 mt-[15px]"></hr>
                <div className="mt-3">
                    <Link to="/checkout" className=" mt-4 text-center bg-white text-black py-1 px-[20px] rounded-[40px] border border-black">
                        Cart
                    </Link>
                    <Link to="/cart" className=" mt-4 text-center bg-white text-black py-1 px-[20px] rounded-[40px] border border-black ml-[5px]">
                        Checkout
                    </Link>
                    <button className="mt-4 text-center bg-white text-black py-1 px-[20px] ml-[5px] rounded-[40px] border border-black">Comparison</button>
                </div>

            </div>
        </div>
    );
};

export default MiniCart;
