// app/api/forminit/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("=== Forminit API Route Called ===");
  
  try {
    const body = await req.json();
    console.log("Received body:", body);
    
    const apiKey = process.env.FORMINIT_API_KEY;
    
    if (!apiKey) {
      console.error("API key missing!");
      return NextResponse.json(
        { data: null, error: { message: "API key not configured" } },
        { status: 500 }
      );
    }

    const { formId, fields } = body;
    
    if (!formId) {
      return NextResponse.json(
        { data: null, error: { message: "Form ID is required" } },
        { status: 400 }
      );
    }

    console.log("Form ID:", formId);
    console.log("Fields to submit:", fields);

    const forminitUrl = `https://api.forminit.com/api/v1/forms/${formId}/submissions`;
    console.log("Calling:", forminitUrl);

    const forminitResponse = await fetch(forminitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(fields),
    });

    console.log("Forminit response status:", forminitResponse.status);
    
    const responseText = await forminitResponse.text();
    console.log("Forminit response body:", responseText);

    if (forminitResponse.ok) {
      return NextResponse.json({
        data: { success: true },
        error: null,
      });
    } else {
      return NextResponse.json({
        data: null,
        error: { message: responseText || "Submission failed" },
      }, { status: forminitResponse.status });
    }

  } catch (err: any) {
    console.error("API Route Error:", err);
    
    return NextResponse.json(
      {
        data: null,
        error: { message: err.message },
      },
      { status: 500 }
    );
  }
}