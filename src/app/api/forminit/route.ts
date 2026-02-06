import { createForminitProxy } from "forminit/next";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

const forminitProxy = createForminitProxy({ apiKey });

export async function POST(req: NextRequest) {
  try {
    // Proxy the request
    const proxyResponse = await forminitProxy.POST(req);

    // Always read raw text for debugging
    const raw = await proxyResponse.text();

    console.log("=== Forminit Proxy Debug ===");
    console.log("Status:", proxyResponse.status);
    console.log("Headers:", Object.fromEntries(proxyResponse.headers.entries()));
    console.log("Body:", raw);

    // Return JSON no matter what
    let json: any;
    try {
      json = JSON.parse(raw);
    } catch {
      json = { error: "Non-JSON response received", raw };
    }

    return NextResponse.json(json, { status: proxyResponse.status });
  } catch (err: any) {
    console.error("Forminit POST error:", err);
    return NextResponse.json(
      { error: err.message || "Forminit request failed" },
      { status: 500 }
    );
  }
}