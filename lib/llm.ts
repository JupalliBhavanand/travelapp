import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export const model = genAI.getGenerativeModel({
  model: "Gemini 2.5 Flash",
});
