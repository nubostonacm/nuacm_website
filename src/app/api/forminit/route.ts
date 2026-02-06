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
    console.log("Forminit response headers:", Object.fromEntries(forminitResponse.headers.entries()));
    
    const responseText = await forminitResponse.text();
    console.log("Forminit response body:", responseText);
    console.log("Response length:", responseText.length);

    // Handle successful submission (even if response is empty)
    if (forminitResponse.ok) {
      // Parse JSON if response has content, otherwise return success
      let responseData = { success: true };
      
      if (responseText && responseText.trim().length > 0) {
        try {
          responseData = JSON.parse(responseText);
        } catch (parseError) {
          console.log("Response is not JSON, treating as success");
        }
      }
      
      return NextResponse.json({
        data: responseData,
        error: null,
      });
    } else {
      // Handle error responses
      let errorMessage = "Submission failed";
      
      if (responseText && responseText.trim().length > 0) {
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          errorMessage = responseText;
        }
      }
      
      return NextResponse.json({
        data: null,
        error: { message: errorMessage },
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