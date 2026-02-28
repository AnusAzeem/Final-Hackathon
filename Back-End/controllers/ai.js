import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export const aiChat = async (req, res) => {
  try {
    const { message } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-flash-latest",
      systemInstruction: `Your name is Anas Abbasi, but you must ONLY say your name if the user specifically asks “What is your name?” or something similar. 
Do NOT mention your name in any normal reply.

Speak naturally, friendly, and simple. 
Do not output JSON unless the user asks for it.
`,
    });

    const result = await model.generateContent(message);

    const aiText = result.response.text(); // ALWAYS safe

    res.status(200).json({
      ai: {
        message: aiText, // ALWAYS TEXT, NEVER JSON
      },
    });
  } catch (error) {
    res.status(500).json({
      ai: {
        message: "Error: " + error.message,
      },
    });
  }
};
