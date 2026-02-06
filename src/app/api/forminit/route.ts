import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Incoming request body:", body);

    // Extract form ID and fields from the request
    const { formId, ...fields } = body;

    // Make direct request to Forminit API
    const forminitResponse = await fetch(
      `https://api.forminit.com/api/v1/forms/${formId}/submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(fields),
      }
    );

    const responseText = await forminitResponse.text();
    console.log("Forminit raw response:", responseText);
    console.log("Forminit status:", forminitResponse.status);

    // Parse the response
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      // If it's not JSON, treat it as success if status is 2xx
      if (forminitResponse.ok) {
        responseData = { success: true };
      } else {
        return NextResponse.json(
          { error: "Invalid response from Forminit", details: responseText },
          { status: 500 }
        );
      }
    }

    // Return success response in the format Forminit client expects
    if (forminitResponse.ok) {
      return NextResponse.json({
        data: responseData,
        error: null,
      });
    } else {
      return NextResponse.json({
        data: null,
        error: { message: responseData.message || "Submission failed" },
      });
    }

  } catch (err: any) {
    console.error("Forminit proxy error:", err);
    return NextResponse.json(
      {
        data: null,
        error: { message: err.message || "Failed to submit form" },
      },
      { status: 500 }
    );
  }
}