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
    
    // Clone the response so we can read it
    const clonedResponse = proxyResponse.clone();
    const text = await clonedResponse.text();
    
    console.log("Forminit Response Status:", proxyResponse.status);
    console.log("Forminit Response Body:", text);
    
    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON:", text);
      return NextResponse.json(
        { error: "Invalid response from Forminit", details: text },
        { status: 500 }
      );
    }
    
    // Return the parsed response with proper headers
    return NextResponse.json(responseData, {
      status: proxyResponse.status,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (err: any) {
    console.error("Forminit proxy error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to submit form" },
      { status: 500 }
    );
  }
}