import { createForminitProxy } from "forminit/next";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

// This returns an object with a POST method
const forminitProxy = createForminitProxy({ apiKey });

// Re-export POST directly
export async function POST(req: NextRequest) {
  // Call the POST method from the proxy object
  const response = await forminitProxy.POST(req);

  // Next.js expects NextResponse or Response
  return response;
}