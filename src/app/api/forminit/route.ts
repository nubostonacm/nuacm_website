import { createForminitProxy } from "forminit/next";
import { NextRequest, NextResponse } from "next/server";

console.log("FORMINIT_API_KEY:", process.env.FORMINIT_API_KEY);

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

const forminitProxy = createForminitProxy({ apiKey });

export async function POST(req: NextRequest) {
  const response = await forminitProxy.POST(req); // Forminit adds X-API-KEY automatically
  return response; // NextResponse
}
