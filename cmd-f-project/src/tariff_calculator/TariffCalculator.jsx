import React, { useState } from 'react';
import { fetchAIResponse } from './GeminiAI'; // import the AI service

const TariffCalculator = () => {
  const [inputData, setInputData] = useState('');
  const [tariff, setTariff] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const calculateTariff = async () => {
    setLoading(true);
    const aiData = await fetchAIResponse();
    
    if (aiData) {
      setTariff(aiData.tariff);
    } else {
      setTariff('Error calculating tariff');
    }
    setLoading(false);
  };

  return (
    <div className="tariff-calculator">
      <h2>Tariff Calculator</h2>
      <div>
        <input 
          type="text" 
          value={inputData} 
          onChange={handleInputChange} 
          placeholder="Enter product description" 
        />
        <input 
          type="text" 
          value={inputData} 
          onChange={handleInputChange} 
          placeholder="Enter price of product" 
        />
        <button onClick={calculateTariff} disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Tariff'}
        </button>
      </div>

      {tariff && (
        <div>
          <h3>Calculated Tariff: {tariff}</h3>
        </div>
      )}
    </div>
  );
};

export default TariffCalculator;
