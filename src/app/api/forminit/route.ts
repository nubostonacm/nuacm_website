// src/app/api/forminit/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("=== Forminit API Route Called ===");
  
  try {
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body, null, 2));
    
    const { formId, fields } = body;
    
    if (!formId || !fields) {
      return NextResponse.json(
        { error: "Missing form ID or fields" },
        { status: 400 }
      );
    }

    console.log("Form ID:", formId);
    console.log("Fields:", JSON.stringify(fields, null, 2));

    // Create FormData exactly like a browser would
    const formData = new URLSearchParams();
    Object.entries(fields).forEach(([key, value]) => {
      if (value) {
        formData.append(key, String(value));
      }
    });

    console.log("FormData string:", formData.toString());

    const forminitUrl = `https://forminit.com/f/${formId}`;
    console.log("Posting to:", forminitUrl);

    // Submit WITHOUT any authorization headers - just like a regular form
    const response = await fetch(forminitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Mimic browser headers
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      body: formData.toString(),
      redirect: 'manual',
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log("Response body (first 300 chars):", responseText.substring(0, 300));

    // 200, 302, 303 are all success
    if (response.status === 200 || response.status === 302 || response.status === 303) {
      console.log("✅ SUCCESS - Form submitted");
      return NextResponse.json({ success: true });
    }

    // 401 means authentication issue - but public forms shouldn't need auth
    if (response.status === 401) {
      console.error("❌ 401 Unauthorized - form might require authentication or be private");
      return NextResponse.json(
        { error: "Form submission not authorized. Is your form public?" },
        { status: 401 }
      );
    }

    console.error("❌ Unexpected status:", response.status);
    return NextResponse.json(
      { error: `Unexpected response: ${response.status}` },
      { status: response.status }
    );

  } catch (err: any) {
    console.error("❌ API route error:", err);
    console.error("Error stack:", err.stack);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}