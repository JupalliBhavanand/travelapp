import { model } from "../llm";

export async function plannerAgent(input: string) {
  const result = await model.generateContent(`
You are a travel planner AI.
Create a detailed travel plan.

${input}
  `);

  return result.response.text();
}
