import React from 'react';
import TrashIcon from '/img/trash.png';
import {Link} from "react-router-dom";

const CartProducts = () => {
    const [cart, setCart] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState(0);

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

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity >= 1 && quantity <= 99) {
            const updatedCart = cart.map(item => item.id === id ? { ...item, quantity } : item);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handleRemoveProduct = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePlaceOrder = () => {
        console.log("Order placed with products:", cart);
    };

    const calculateSubtotal = () => {
        return cart.reduce((accum, item) => accum + item.quantity * item.salePrice, 0);
    };

    return (
        <section className="mt-16 flex flex-col container gap-4 mx-auto">
            <div className="flex justify-between gap-4">
                <div className="flex-1">
                    <div className="flex flex-row bg-[#F9F1E7] md:pl-[106px] font-sans mb-[30px]">
                        <h2 className="text-xl font-medium mb-4 w-1/4 mt-[13px]">Product</h2>
                        <h2 className="text-xl font-medium mb-4 w-1/4 ml-[35px] mt-[13px]">Price</h2>
                        <h2 className="text-xl font-medium mb-4 w-1/4 mr-[60px] mt-[13px]">Quantity</h2>
                        <h2 className="text-xl font-medium mb-4 w-1/4 mr-[8px] mt-[13px]">Subtotal</h2>
                    </div>
                    {cart.map((product) => (
                        <div key={product.id} className="flex items-center gap-2 mb-3 text-gray-600 font-sans">
                            <img src={product.images.mainImage} alt={product.title} className="w-20 h-20 object-cover mr-[15px] rounded-lg " />
                            <p className="w-1/4 mr-[50px] text-gray-400 ">{product.title}</p>
                            <span className="mr-[90px] text-gray-400">${product.salePrice}</span>
                            <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)} className="text-lg border px-2 py-1">-</button>
                            <span className="mx-2">{product.quantity}</span>
                            <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)} className="text-lg border px-2 py-1">+</button>
                            <p className="mb-3 w-1/4 ml-[120px] text-black font-sans">
                                {(product.salePrice * product.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </p>
                            <button onClick={() => handleRemoveProduct(product.id)}>
                                <img src={TrashIcon} alt="Remove" className="w-8 h-6 mr-[10px]" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="w-1/3 h-[350px] bg-[#F9F1E7] p-4 justify-center text-center mx-auto">
                    <h1 className="text-[28px] font-semibold mb-4 font-sans">Cart Totals</h1>
                    <div className="flex flex-row justify-between mb-4 ml-[70px] mr-[70px] mt-[40px] mb-[30px]">
                        <h2 className="text-lg font-medium">Subtotal</h2>
                        <p className="text-[18px] text-gray-400">
                            {calculateSubtotal().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between ml-[70px] mr-[70px] mb-[40px]">
                        <h2 className="text-lg font-medium">Total</h2>
                        <p className="text-[23px] text-[#B88E2F] font-semibold">
                            {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </p>
                    </div>
                    <Link to="/checkout" className="mt-4 text-black border border-black px-10 py-3 rounded-lg hover:bg-[#B88E2F] hover:border-[#B88E2F] hover:text-white">Checkout</Link>
                </div>
            </div>
        </section>
    );
};

export default CartProducts;
