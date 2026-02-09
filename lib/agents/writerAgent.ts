import { model } from "../llm";

export async function writerAgent(plan: string) {
  const result = await model.generateContent(`
Rewrite this as a clean, day-by-day itinerary:

${plan}
  `);

  return result.response.text();
}
