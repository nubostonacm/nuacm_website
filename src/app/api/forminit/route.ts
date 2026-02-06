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

    // Read the raw text to see exactly what Forminit returned
    const rawText = await proxyResponse.text();
    console.log("=== Forminit raw response ===");
    console.log("Status:", proxyResponse.status);
    console.log("Headers:", Object.fromEntries(proxyResponse.headers.entries()));
    console.log("Body:", rawText);

    // Try parsing JSON safely
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.warn("Response is not JSON");
      data = { error: "Forminit did not return JSON", raw: rawText };
    }

    return NextResponse.json(data, { status: proxyResponse.status });
  } catch (err: any) {
    console.error("Forminit POST error:", err);
    return NextResponse.json(
      { error: err.message || "Forminit request failed" },
      { status: 500 }
    );
  }
}
