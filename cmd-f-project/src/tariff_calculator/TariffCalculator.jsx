import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import dollar from "../assets/dollar.png";
import './../css/chatbot.css';

const TariffCalculator = () => {
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [messages, setMessages] = useState([]);

    const handleProductChange = (e) => setProduct(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);

    const formatMarkdownToHTML = (text) => marked(text);

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
        <div className="tariff-container">          
            <div className="tariff-box">
                <div className="tariff-title">
                    <h1>Tariff Calculator</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

                <div className="messages-box">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'user' ? 'message-user' : 'message-bot'}>
                            <strong>{msg.sender === 'user' ? 'You' : 'Gemini'}:</strong>
                            <div className="message-text">
                                {msg.isFormatted ? (
                                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                ) : (
                                    <p>{msg.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="input-group">
                    <div className="input-field">
                        <label htmlFor="product">Product</label>
                        <input
                            id="product"
                            type="text"
                            value={product}
                            onChange={handleProductChange}
                            placeholder="Enter product"
                        />
                    </div>

                    <img src={dollar} alt="dollar" className="dollar-icon" />

                    <div className="input-field">
                        <label htmlFor="price">Price</label>
                        <div className="price-input">
                            <input
                                id="price"
                                type="number"
                                value={price}
                                onChange={handlePriceChange}
                                placeholder="Enter price"
                            />
                        </div>
                    </div>

                    <button onClick={handleSendInfo} className="submit-button">
                        Ask Gemini!
                    </button>
                </div>
        </div>
    );
};

export default TariffCalculator;
