import { NextResponse } from "next/server";
import { runHolidayAgents } from "@/lib/agents";

export async function POST(req: Request) {
  const body = await req.json();

  const itinerary = await runHolidayAgents({
    destination: body.destination,
    days: body.days,
    interests: body.interests,
    budget: body.budget,
  });

  return NextResponse.json({ itinerary });
}
