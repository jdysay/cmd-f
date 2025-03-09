import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';

const TariffCalculator = () => {
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [messages, setMessages] = useState([]);

    const handleProductChange = (e) => setProduct(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);

    const formatMarkdownToHTML = (text) => marked(text); // Convert markdown to HTML

    const handleSendInfo = async () => {
        if (!product || !price) {
            return alert('Please enter both a product and a price.');
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: `Product: ${product}, Price: ${price}` }
        ]);

        try {
            const response = await axios.post('http://localhost:5050/calculate-tariff', {
                product,
                price
            });

            const aiText = response.data.aiResponse;
            const formattedResponse = formatMarkdownToHTML(aiText);

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: formattedResponse, isFormatted: true }
            ]);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: 'Sorry, something went wrong!' }
            ]);
        }

        setProduct('');
        setPrice('');
    };

    return (
        <div className="flex flex-col items-start p-4 space-y-4 bg-custom-peach rounded-lg shadow-lg w-full max-w-lg">
            <div className="w-full p-4 bg-white rounded-lg shadow-md">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${
                                msg.sender === 'user' ? 'items-end' : 'items-start'
                            }`}
                        >
                            <strong className="font-semibold text-lg text-custom-purple">
                                {msg.sender === 'user' ? 'You' : 'Bot'}:
                            </strong>
                            <div className="text-left">
                                {msg.isFormatted ? (
                                    <div
                                        className="text-custom-purple text-sm"
                                        dangerouslySetInnerHTML={{ __html: msg.text }}
                                    />
                                ) : (
                                    <p className="text-custom-purple text-sm">{msg.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-start space-y-2 w-full text-custom-purple">
                <input
                    type="text"
                    value={product}
                    onChange={handleProductChange}
                    placeholder="Enter product"
                    className="w-full px-4 py-2 border-custom-peach-medium text-custom-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-red text-left"
                />
                <input
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border-custom-peach-medium rounded-lg text-custom-purple focus:outline-none focus:ring-2 focus:ring-custom-red text-left"
                />
                <button
                    onClick={handleSendInfo}
                    className="w-full py-2 bg-custom-red text-white rounded-lg hover:bg-custom-red-dark focus:outline-none focus:ring-2 focus:ring-custom-red"
                >
                    Ask Gemini!
                </button>
            </div>
        </div>
    );
};

export default TariffCalculator;
