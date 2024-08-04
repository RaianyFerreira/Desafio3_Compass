import React, { FormEvent, useState } from 'react';
import Location from '/img/address.png';
import Phone from '/img/phone.png';
import Clock from '/img/clock.png';

const FormContact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [popup, setPopup] = useState<null | 'success' | 'error'>(null);
    const [errors, setErrors] = useState<{ name?: string, email?: string, message?: string }>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors: { name?: string, email?: string, message?: string } = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!validateEmail(email)) newErrors.email = 'Invalid email format';
        if (!message) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendMessage = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            setPopup('error');
            setTimeout(() => setPopup(null), 3000);
            return;
        }
        setPopup('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => {
            setPopup(null);
        }, 3000);
    };

    return (
        <div className="relative">
            {popup === 'success' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Sucesso</h2>
                        <p>Parabéns, sua mensagem foi enviada!</p>
                        <button
                            onClick={() => setPopup(null)}
                            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {popup === 'error' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Erro</h2>
                        <p>Por favor, preencha todos os campos corretamente.</p>
                        <button
                            onClick={() => setPopup(null)}
                            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <form className="space-y-5">
                <label htmlFor="name" className="block font-medium text-lg">Your name </label>
                <input
                    type="text"
                    id='name'
                    name='name'
                    placeholder='Abc'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`resize-none border ${errors.name ? 'border-red-500' : 'border-gray-400'} text-gray-400 max-w-xl w-full h-[65px] rounded-lg text-lg pl-8 mb-9 transition duration-300 focus:outline-none focus:shadow-md hover:shadow-md`}
                />

                <label htmlFor="email" className="block font-medium text-lg mb-6">Email address </label>
                <input
                    type="email"
                    id='email'
                    name='email'
                    placeholder='Abc@def.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`resize-none border ${errors.email ? 'border-red-500' : 'border-gray-400'} text-gray-400 max-w-xl w-full h-[65px] rounded-lg text-lg pl-8 mb-9 transition duration-300 focus:outline-none focus:shadow-md hover:shadow-md`}
                />

                <label htmlFor="subject" className="block font-medium text-lg mb-6">Subject</label>
                <input
                    type="text"
                    id='subject'
                    name='subject'
                    placeholder='This is optional'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="resize-none border border-gray-400 text-gray-400 max-w-xl w-full h-[65px] rounded-lg text-lg pl-8 mb-9 transition duration-300 focus:outline-none focus:shadow-md hover:shadow-md"
                />

                <label htmlFor="message" className="block font-medium text-lg mb-6">Message </label>
                <textarea
                    name="message"
                    id="message"
                    placeholder='Hi! I’d like to ask about...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className={`resize-none border ${errors.message ? 'border-red-500' : 'border-gray-400'} text-gray-400 max-w-xl w-full h-[92px] rounded-lg text-lg pl-8 mb-9 transition duration-300 focus:outline-none focus:shadow-md hover:shadow-md`}
                />

                <button
                    className="bg-[#B88E2F] text-white max-w-xs w-[200px] h-[48px] font-medium text-lg rounded-md border-2 border-transparent transition duration-300 hover:font-semibold hover:shadow-lg focus:shadow-lg"
                    type='submit'
                    onClick={sendMessage}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

const Contact = () => {
    return (
        <main className="py-8 px-4">
            <div className="text-center mt-24 mb-2.5 px-4">
                <h1 className="text-[30px] font-semibold mb-3">Get In Touch With Us</h1>
                <p className="text-sm text-center text-gray-400 max-w-xl w-full mx-auto mb-[50px] px-4">For more information about our product & services, please feel free to drop us an email. Our staff will always be there to help you out. Do not hesitate!</p>
            </div>
            <section className="flex flex-col md:flex-row md:justify-evenly">
                <div className="space-y-4 md:space-y-0 md:mr-6">
                    <ul className="space-y-4 md:space-y-6">
                        <li className="flex items-start space-x-8 mb-10 mt-[10px] md:mb-6">
                            <img src={Location} alt="Location" className="w-5 h-6" />
                            <div>
                                <h2 className="text-xl font-medium ml-1.25 font-semibold">Address</h2>
                                <p className="max-w-xs">236 5th SE Avenue, New York NY10000, United States</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-8 mb-10 md:mb-6">
                            <img src={Phone} alt="Phone" className="w-6 h-7" />
                            <div>
                                <h2 className="text-xl font-medium font-semibold">Phone</h2>
                                <p className="max-w-xs">Mobile: +(84) 546-6789</p>
                                <p className="max-w-xs">Hotline: +(84) 456-6789</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-8 mb-10 md:mb-6">
                            <img src={Clock} alt="Clock" className="w-6 h-6" />
                            <div>
                                <h2 className="text-xl font-medium font-semibold">Working Time</h2>
                                <p className="max-w-xs">Monday-Friday: 9:00 - 22:00</p>
                                <p className="max-w-xs mb-[50px] md:mb-0">Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="max-w-lg w-full md:ml-6">
                    <FormContact />
                </div>
            </section>
        </main>
    );
};

export default Contact;
