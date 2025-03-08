import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BASE_URL = import.meta.env.VITE_GEMINI_API_URL;

export const fetchAIResponse = async() => {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash'});

        const prompt = `
            Calculate the estimated tariff for importing shampoo from the USA to Canada, valued at $5.
            Please consider potential tariffs, sales taxes, and any other fees based on these countries and product type.
        `;

        const result = await model.generateContent(prompt);

        const responseText = result.response.text();

        return responseText;
    } catch (error) {
        console.error('Error fetching AI data: ', error);
        return null;
    }
};

fetchAIResponse()
  .then(response => {
    console.log('AI Response:', response);
  })
  .catch(error => {
    console.error(error);
  });