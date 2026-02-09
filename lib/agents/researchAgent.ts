import { model } from "../llm";

export async function researchAgent(plan: string) {
  const result = await model.generateContent(`
Enhance this travel plan with attractions and tips:

${plan}
  `);

  return result.response.text();
}
