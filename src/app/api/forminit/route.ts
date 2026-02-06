// src/app/api/forminit/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("=== Forminit API Route Hit ===");
  
  try {
    const body = await req.json();
    console.log("Body received:", JSON.stringify(body, null, 2));
    
    const apiKey = process.env.FORMINIT_API_KEY;
    
    if (!apiKey) {
      console.error("FORMINIT_API_KEY not found");
      return NextResponse.json(
        { data: null, error: { message: "API key not configured" } },
        { status: 500 }
      );
    }

    const { formId, fields } = body;
    
    if (!formId) {
      return NextResponse.json(
        { data: null, error: { message: "Form ID missing" } },
        { status: 400 }
      );
    }

    console.log("Calling Forminit API for form:", formId);

    const forminitUrl = `https://api.forminit.com/api/v1/forms/${formId}/submissions`;

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
    console.log("Forminit response text:", responseText);

    if (forminitResponse.ok) {
      let data = { success: true };
      
      if (responseText && responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.log("Response not JSON, treating as success");
        }
      }
      
      return NextResponse.json({ data, error: null });
    } else {
      return NextResponse.json(
        { data: null, error: { message: responseText || "Failed" } },
        { status: forminitResponse.status }
      );
    }

  } catch (err: any) {
    console.error("Route error:", err);
    return NextResponse.json(
      { data: null, error: { message: err.message } },
      { status: 500 }
    );
  }
}