import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

const CheckoutPage: React.FC = () => {
    const [cart, setCart] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        zipcode: '',
        countryRegion: '',
        streetAddress: '',
        townCity: '',
        province: '',
        addonAddress: '',
        emailAddress: '',
    });
    const [formErrors, setFormErrors] = useState<any>({});
    const [showPopup, setShowPopup] = useState<string | null>(null);

    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(cartFromStorage);

        const totalValue = cartFromStorage.reduce((accum, item) => accum + item.quantity * item.salePrice, 0);
        setTotal(totalValue);
    }, []);

    useEffect(() => {
        const totalValue = cart.reduce((accum, item) => accum + item.quantity * item.salePrice, 0);
        setTotal(totalValue);
    }, [cart]);

    const validateForm = () => {
        const errors: any = {};

        if (!formData.firstname) errors.firstname = 'First name is required';
        if (!formData.lastname) errors.lastname = 'Last name is required';
        if (!formData.zipcode) errors.zipcode = 'Zip code is required';
        if (!formData.countryRegion) errors.countryRegion = 'Country/Region is required';
        if (!formData.streetAddress) errors.streetAddress = 'Street address is required';
        if (!formData.townCity) errors.townCity = 'Town/City is required';
        if (!formData.province) errors.province = 'Province is required';
        if (!formData.addonAddress) errors.addonAddress = 'Add-on address is required';
        if (!formData.emailAddress) errors.emailAddress = 'Email address is required';
        else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) errors.emailAddress = 'Invalid email address';

        return errors;
    };

    const handlePlaceOrder = (e: FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setShowPopup('success');
            setFormData({
                firstname: '',
                lastname: '',
                zipcode: '',
                countryRegion: '',
                streetAddress: '',
                townCity: '',
                province: '',
                addonAddress: '',
                emailAddress: '',
            });
            setCart([]);
            localStorage.removeItem('cart');
        } else {
            setShowPopup('error');
        }
    };

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });

        if (formErrors[id]) {
            const newErrors = { ...formErrors };
            delete newErrors[id];
            setFormErrors(newErrors);
        }
    };

    const calculateSubtotal = () => {
        return cart.reduce((accum, item) => accum + item.quantity * item.salePrice, 0);
    };

    return (
        <section className="mt-16 flex flex-col container gap-4 mx-auto">
            <form onSubmit={handlePlaceOrder}>
                <div className="flex flex-col md:flex-row md:gap-8">
                    <div className="md:w-1/2">
                        <h1 className="font-semibold text-[28px] mb-[30px]">Billing details</h1>
                        <div className="mb-4">
                            <div className="flex flex-col md:flex-row md:gap-[30px]">
                                <div className="mb-4">
                                    <label htmlFor="firstname" className="ml-[10px] md:ml-0 block text-sm font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        className={`border ${formErrors.firstname ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0 px-3 py-2 rounded-md text-left`}
                                        value={formData.firstname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lastname" className="ml-[10px] md:ml-0 block text-sm font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        className={`border ${formErrors.lastname ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0 px-3 py-2 rounded-md text-left`}
                                        value={formData.lastname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="companyName" className="ml-[10px] md:ml-0 block text-sm font-medium mb-2">Company Name (Optional)</label>
                            <input
                                type="text"
                                id="companyName"
                                className="border border-gray-400 w-[227px] md:w-[483px] py-3 rounded-md text-left ml-[10px] md:ml-0"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="zipcode" className="ml-[10px] md:ml-0 block text-sm font-medium mb-2">Zip code</label>
                            <input
                                type="text"
                                id="zipcode"
                                className={`border ${formErrors.zipcode ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0 w-[227px] md:w-[483px] py-3 rounded-md text-left`}
                                value={formData.zipcode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="countryRegion" className=" ml-[10px] md:ml-0 block text-sm font-medium mb-2">Country / Region</label>
                            <input
                                type="text"
                                id="countryRegion"
                                className={`border ${formErrors.countryRegion ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0 w-[227px] md:w-[483px] py-3 rounded-md text-left`}
                                value={formData.countryRegion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="streetAddress" className="ml-[10px] md:ml-0 block text-sm font-medium mb-2">Street Address</label>
                            <input
                                type="text"
                                id="streetAddress"
                                className={`border ${formErrors.streetAddress ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0  w-[227px] md:w-[483px] py-3 rounded-md text-left`}
                                value={formData.streetAddress}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="townCity" className="ml-[10px] md:ml-0 block text-sm font-medium mb-2">Town / City</label>
                            <input
                                type="text"
                                id="townCity"
                                className={`border ${formErrors.townCity ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0 w-[227px] md:w-[483px] py-3 rounded-md text-left`}
                                value={formData.townCity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="province" className=" ml-[10px] md:ml-0 block text-sm font-medium mb-2">Province</label>
                            <input
                                type="text"
                                id="province"
                                className={`border ${formErrors.province ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0  w-[227px] md:w-[483px] py-3 rounded-md text-left`}
                                value={formData.province}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="addonAddress" className="ml-[10px] md:ml-0 block text-sm font-medium mb-2">Add-on address</label>
                            <input
                                type="text"
                                id="addonAddress"
                                className={`border ${formErrors.addonAddress ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0 w-[227px] md:w-[483px] py-3 rounded-md text-left`}
                                value={formData.addonAddress}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="emailAddress" className="ml-[10px] md:ml-0 block text-sm font-medium mb-2">Email address</label>
                            <input
                                type="email"
                                id="emailAddress"
                                className={`border ${formErrors.emailAddress ? 'border-red-500' : 'border-gray-400'} ml-[10px] md:ml-0 w-[227px] md:w-[483px] py-3 rounded-md text-left`}
                                value={formData.emailAddress}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mt-10">
                            <input
                                type="text"
                                id="addinfo"
                                className="border border-gray-400 w-[227px] md:w-[483px] py-4 rounded-md pl-3 text-sm ml-[10px] md:ml-0"
                                placeholder="Additional information"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 ml-[10px] md:ml-0">
                        <div className="flex flex-col gap-4 mx-auto">
                            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                <div className="md:flex-1 max-w-[300px] md:max-w-2xl">
                                    <div className="flex flex-col md:flex-row mb-4 ml-[10px] md:ml-0">
                                        <h2 className="text-xl font-medium mr-[460px] font-semibold">Product</h2>
                                        <h2 className="text-xl font-medium font-semibold">Subtotal</h2>
                                    </div>
                                    {cart.map((product) => (
                                        <div key={product.id} className=" ml-[10px] md:ml-0 flex items-center justify-between mb-4 text-gray-600 text-[15px]">
                                            <p className="text-gray-400">{product.title} <span className="text-black"> x {product.quantity} </span></p>
                                            <p className="text-black pl-[20px]">
                                                {(product.salePrice * product.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="flex justify-between mb-4 ml-[10px] md:ml-0">
                                        <h2 className="text-lg font-medium mt-[10px]">Subtotal</h2>
                                        <p className="text-black mt-[5px]">
                                            {calculateSubtotal().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </p>
                                    </div>
                                    <div className="flex justify-between mb-8 ml-[10px] md:ml-0">
                                        <h2 className="text-lg font-medium mt-[7px]">Total</h2>
                                        <p className="text-2xl text-yellow-600 font-semibold">
                                            {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </p>
                                    </div>
                                    <hr className="h-[1px] border border-gray-300 mb-4" />
                                    <div className="space-y-4 ml-[10px] md:ml-0">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="option1"
                                                name="paymentMethod"
                                                value="Direct Bank Transfer"
                                                checked={selectedOption === 'Direct Bank Transfer'}
                                                onChange={handleOptionChange}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor="option1"
                                                className={`text-lg font-medium ${selectedOption === 'Direct Bank Transfer' ? 'text-black' : 'text-[#9F9F9F]'}`}
                                            >
                                                Direct Bank Transfer
                                            </label>
                                        </div>
                                        {selectedOption === 'Direct Bank Transfer' && (
                                            <p className="text-gray-500">
                                                Make your payment directly into our bank account. Please use
                                                your Order ID as the payment reference. Your order will not be
                                                shipped until the funds have cleared in our account.
                                            </p>
                                        )}
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="option3"
                                                name="paymentMethod"
                                                value="Cash On Delivery"
                                                checked={selectedOption === 'Cash On Delivery'}
                                                onChange={handleOptionChange}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor="option3"
                                                className={`text-lg font-medium ${selectedOption === 'Cash On Delivery' ? 'text-black' : 'text-[#9F9F9F]'}`}
                                            >
                                                Cash On Delivery
                                            </label>
                                        </div>
                                        {selectedOption === 'Cash On Delivery' && (
                                            <p className="text-gray-500">
                                                Pay in cash upon delivery.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="font-sans mt-[10px] mb-[15px] text-sm">
                                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our
                                <a
                                    href="https://policies.google.com/privacy?hl=en-US"
                                    className="font-semibold text-black hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    privacy policy.
                                </a>
                            </p>
                            <button
                                type="submit"
                                className="md:ml-[167px] w-full md:w-[300px] text-lg border border-black px-6 py-4 rounded-[15px] hover:bg-yellow-600 hover:border-yellow-600 hover:text-white transition"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {showPopup === 'error' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Erro</h2>
                        <p>Por favor, preencha todos os campos corretamente.</p>
                        <button
                            onClick={() => setShowPopup(null)}
                            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showPopup === 'success' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Sucesso</h2>
                        <p>Parabéns, sua compra foi efetuada!</p>
                        <button
                            onClick={() => setShowPopup(null)}
                            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CheckoutPage;
