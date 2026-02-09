import { model } from "../llm";

export async function budgetAgent(plan: string, budget: number) {
  const result = await model.generateContent(`
Optimize this travel plan for a budget of $${budget}:

${plan}
  `);

  return result.response.text();
}
