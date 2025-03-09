import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 5050;

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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
