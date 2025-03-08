import axios from 'axios';
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BASE_URL = import.meta.env.VITE_GEMINI_API_URL;

export const fetchAIResponse = async (inputData) => {
  try {
    const response = await axios.post(`${BASE_URL}/endpoint`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        query: inputData,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching AI data:', error);
    return null;
  }
};
