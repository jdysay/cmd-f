import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const fetchAIResponse = async(productDescriptionUser, productPriceUser) => {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash'});

        const productDescription = productDescriptionUser;
        const productPrice = productPriceUser;

        const prompt = `
            Calculate the estimated tariff for importing the following product:
            Item: ${productDescription}
            Price: $${productPrice}
            Please just calculate the estimate knowing that it may not be accurate.
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