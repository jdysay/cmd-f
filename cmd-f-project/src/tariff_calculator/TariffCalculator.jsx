import React, { useState } from 'react';
import axios from 'axios';

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

          setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'bot', text: aiText }
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
        <div className="tariff-calculator-container">
            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender}`}
                    >
                        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={product}
                    onChange={handleProductChange}
                    placeholder="Enter product"
                />
                <input
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="Enter price"
                />
                <button onClick={handleSendInfo}>Calculate Tariff</button>
            </div>
        </div>
    );
};

export default TariffCalculator;
