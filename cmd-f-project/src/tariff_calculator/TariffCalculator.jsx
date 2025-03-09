import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';


const TariffCalculator = () => {
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [messages, setMessages] = useState([]);

    const handleProductChange = (e) => {
        setProduct(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const formatMarkdownToHTML = (text) => {
        return marked(text);  // Convert markdown to HTML
    };

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
            
            // Convert markdown response to HTML
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
        <div className="flex flex-col items-center p-4 space-y-4 bg-gray-100 rounded-lg shadow-lg">
            <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${
                                msg.sender === 'user' ? 'items-end' : 'items-start'
                            }`}
                        >
                            <strong className="font-semibold text-lg text-gray-800">
                                {msg.sender === 'user' ? 'You' : 'Bot'}:
                            </strong>
                            <div>
                                {msg.isFormatted ? (
                                    <div
                                        className="text-gray-700 text-sm"
                                        dangerouslySetInnerHTML={{ __html: msg.text }}
                                    />
                                ) : (
                                    <p className="text-gray-700 text-sm">{msg.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center space-y-2 w-full max-w-lg">
                <input
                    type="text"
                    value={product}
                    onChange={handleProductChange}
                    placeholder="Enter product"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="Enter price"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendInfo}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Calculate Tariff
                </button>
            </div>
        </div>
    );
};

export default TariffCalculator;
