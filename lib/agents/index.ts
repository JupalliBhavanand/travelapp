import { plannerAgent } from "./plannerAgent";
import { researchAgent } from "./researchAgent";
import { budgetAgent } from "./budgetAgent";
import { writerAgent } from "./writerAgent";

export async function runHolidayAgents(input: {
  destination: string;
  days: number;
  interests: string;
  budget: number;
}) {
  const userPrompt = `
Destination: ${input.destination}
Days: ${input.days}
Interests: ${input.interests}
`;

  const plan = await plannerAgent(userPrompt);
  const research = await researchAgent(plan);
  const optimized = await budgetAgent(research, input.budget);
  const itinerary = await writerAgent(optimized);

  return itinerary;
}
