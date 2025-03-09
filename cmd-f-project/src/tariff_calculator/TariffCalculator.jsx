import React, { useState } from 'react';
import { fetchAIResponse } from './GeminiAI'; // Import the AI service

const TariffCalculator = () => {
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [tariff, setTariff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const calculateTariff = async () => {
    if (!productDescription || !productPrice) {
      setError('Please enter both product description and price.');
      return;
    }

    setError(null); 
    setLoading(true);

    try {
      // Send the input data (product description and price) to the backend
      const aiData = await fetchAIResponse(productDescription, productPrice);

      if (aiData) {
        // Assume AI returns a tariff value in aiData
        setTariff(aiData.tariff);
      } else {
        setTariff('Error calculating tariff');
      }
    } catch (error) {
      setError('An error occurred while calculating the tariff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tariff-calculator">
      <h2>Tariff Calculator</h2>
      <div>
        <input
          type="text"
          value={productDescription}
          onChange={handleProductDescriptionChange}
          placeholder="Enter product description"
        />
        <input
          type="Number"
          value={productPrice}
          onChange={handleProductPriceChange}
          placeholder="Enter price of product"
        />
        <button onClick={calculateTariff} disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Tariff'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {tariff && (
        <div>
          <h3>Calculated Tariff: </h3>
          <p>{tariff}</p>
        </div>
      )}
    </div>
  );
};

export default TariffCalculator;
