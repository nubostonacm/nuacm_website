import { createForminitProxy } from "forminit/next";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.FORMINIT_API_KEY;
console.log("FORMINIT_API_KEY:", apiKey ? "set" : "NOT SET");

if (!apiKey) throw new Error("FORMINIT_API_KEY is not set");

const forminitProxy = createForminitProxy({ apiKey });

export async function POST(req: NextRequest) {
  try {
    const proxyResponse = await forminitProxy.POST(req);
    const rawText = await proxyResponse.clone().text();

    console.log("=== Forminit raw response ===");
    console.log("Status:", proxyResponse.status);
    console.log("Headers:", Object.fromEntries(proxyResponse.headers.entries()));
    console.log("Body:", rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { error: "Forminit did not return JSON", status: proxyResponse.status, raw: rawText };
    }

    return NextResponse.json(data, { status: proxyResponse.status });
  } catch (err: any) {
    console.error("Forminit POST error:", err);
    return NextResponse.json({ error: err.message || "Forminit request failed" }, { status: 500 });
  }
}