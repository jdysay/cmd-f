import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();

// Use the environment variable PORT, or default to 5050 if not provided
const port = process.env.PORT || 5050;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
}));
app.use(express.json()); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getTariffFromAI(product, price) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `If I bought ${product} from the US right now for $${price} please calculate the estimated tariffs that would be imposed if I brought it back to Canada right now. Please tell me an approximation of how much in Canadian dollar I will be paying in tarrifs`;

    try {
        const result = await model.generateContent(prompt);
        
        const aiText = result.response.candidates[0].content.parts[0].text;
        
        console.log("Full AI Response:", JSON.stringify(result, null, 2));

        return aiText;
    } catch (error) {
        console.error("Error fetching tariff from AI:", error);
        return null;
    }
}

app.post('/calculate-tariff', async (req, res) => {
  const { product, price } = req.body;

  if (!product || !price) {
    return res.status(400).json({ message: 'Product and price are required' });
  }

  const aiResponse = await getTariffFromAI(product, price);

  if (aiResponse === null) {
    return res.status(500).json({ message: 'Failed to fetch tariff from AI' });
  }

  res.json({
    aiResponse
  });
});

// Use '0.0.0.0' to allow the app to accept connections from any external IP, 
// and bind it to the port specified by the environment variable or fallback port
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
