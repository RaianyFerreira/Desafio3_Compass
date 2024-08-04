import React, { FormEvent, useState } from 'react'

const FormContact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [popup, setPopup] = useState(false)

    const sendMessage = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setPopup(true)
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
        setTimeout(() => {
            setPopup(false)
        }, 3000)
    }

    return (
        <div className="relative">
            {popup && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg">
                    Message sent successfully
                </div>
            )}
            <form className="space-y-6">
                <label htmlFor="name" className="block font-medium text-lg mb-6">Your name *</label>
                <input
                    type="text"
                    id='name'
                    name='name'
                    placeholder='Abc'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="resize-none border border-gray-400 text-gray-400 max-w-xl w-full h-20 rounded-lg text-lg pl-8 mb-9 transition duration-300 focus:outline-none focus:shadow-md focus:border-yellow-500 hover:outline-none hover:shadow-md hover:border-yellow-500"
                />

                <label htmlFor="email" className="block font-medium text-lg mb-6">Email address *</label>
                <input
                    type="text"
                    id='email'
                    name='email'
                    placeholder='Abc@def.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="resize-none border border-gray-400 text-gray-400 max-w-xl w-full h-20 rounded-lg text-lg pl-8 mb-9 transition duration-300 focus:outline-none focus:shadow-md focus:border-yellow-500 hover:outline-none hover:shadow-md hover:border-yellow-500"
                />

                <label htmlFor="subject" className="block font-medium text-lg mb-6">Subject</label>
                <input
                    type="text"
                    id='subject'
                    name='subject'
                    placeholder='This is an optional'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="resize-none border border-gray-400 text-gray-400 max-w-xl w-full h-20 rounded-lg text-lg pl-8 mb-9 transition duration-300 focus:outline-none focus:shadow-md focus:border-yellow-500 hover:outline-none hover:shadow-md hover:border-yellow-500"
                />

                <label htmlFor="message" className="block font-medium text-lg mb-6">Message *</label>
                <textarea
                    name="message"
                    id="message"
                    placeholder='Hi! i’d like to ask about'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="resize-none border border-gray-400 text-gray-400 max-w-xl w-full h-32 rounded-lg text-lg pl-8 pt-6 mb-12 transition duration-300 focus:outline-none focus:shadow-md focus:border-yellow-500 hover:outline-none hover:shadow-md hover:border-yellow-500"
                />

                <button
                    className="bg-yellow-500 text-white max-w-xs w-full h-14 font-medium text-lg rounded-md border-2 border-transparent transition duration-300 hover:bg-white hover:text-yellow-500 hover:border-yellow-500 hover:font-semibold"
                    type='submit'
                    onClick={sendMessage}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default FormContact
