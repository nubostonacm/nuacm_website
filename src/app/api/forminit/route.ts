import { createForminitProxy } from "forminit/next";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

const forminitProxy = createForminitProxy({ apiKey });

export async function POST(req: NextRequest) {
  try {
    const proxyResponse = await forminitProxy.POST(req);

    const data = await proxyResponse.json();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Forminit POST error:", err);

    return NextResponse.json(
      { error: err.message || "Forminit request failed" },
      { status: 500 }
    );
  }
}