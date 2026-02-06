import { createForminitProxy } from "forminit/next";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

const forminitProxy = createForminitProxy({ apiKey });

export async function POST(req: NextRequest) {
  try {
    // Make the proxy request
    const proxyResponse = await forminitProxy.POST(req);

    // Read the raw text (in case it's HTML or non-JSON)
    const rawText = await proxyResponse.text();

    // Log everything for debugging
    console.log("=== Forminit raw response ===");
    console.log("Status:", proxyResponse.status);
    console.log("Headers:", Object.fromEntries(proxyResponse.headers.entries()));
    console.log("Body:", rawText);

    // Try to parse JSON safely
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = {
        error: "Forminit did not return JSON",
        status: proxyResponse.status,
        raw: rawText,
      };
    }

    // Always return JSON to frontend
    return NextResponse.json(data, { status: proxyResponse.status });
  } catch (err: any) {
    console.error("Forminit POST error:", err);
    return NextResponse.json(
      { error: err.message || "Forminit request failed" },
      { status: 500 }
    );
  }
}
