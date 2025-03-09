import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import dollar from "../assets/dollar.png";

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
        <div className="relative w-full min-h-screen bg-custom-peach flex flex-col items-center justify-center p-4 overflow-y-auto">
           
            <div className="w-full bg-custom-peach p-8 rounded-xl mt-10">
              <div className="w-[800px] h-[200px] p-4 bg-white border border-custom-peach-dark rounded-xl overflow-y-auto break-words mb-4 mt-20">
                <h1 className="text-lg text-custom-purple">Tariff Calculator</h1>
                <p>lorem ipsum</p>
              </div>
               
                {/* Messages Display */}
                <div className="w-[800px] h-[300px] p-4 bg-white border border-custom-peach-dark rounded-xl overflow-y-auto break-words">
              {messages.map((msg, index) => (
                  <div
                      key={index}
                      className={`flex flex-col ${
                          msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                  >
                      <strong className="font-semibold text-lg text-custom-purple">
                          {msg.sender === 'user' ? 'You' : 'Gemini'}:
                      </strong>
                      <div className="text-left text-custom-purple text-sm">
                          {msg.isFormatted ? (
                              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                          ) : (
                              <p>{msg.text}</p>
                          )}
                      </div>
                  </div>
              ))}
          </div>

                {/* Input Fields */}
                <div className="flex items-center">
                    <div className="flex flex-col w-[300px] m-10">
                      <label htmlFor="product" className="text-custom-purple font-large mb-2">
                          Product
                      </label>
                      <input
                          id="product"
                          type="text"
                          value={product}
                          onChange={handleProductChange}
                          placeholder="Enter product"
                          className="h-[40px] px-4 border-1 border-custom-peach-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-red"
                      />
                    </div>

                    <div className="flex flex-col w-[300px] m-10">
                      
                      <label htmlFor="price" className="text-custom-purple font-large mb-2">
                          Price
                      </label>
                      <div className="flex items-center space-x-2 mb-2">
                        <img 
                                  src={dollar}
                                  alt="dollar"
                                  className="relative w-4"
                          />
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={handlePriceChange}
                            placeholder="Enter price"
                            className="h-[40px] px-4 border-1 border-custom-peach-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-red"
                        />
                      </div>
                      
                  </div>
              </div>
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
