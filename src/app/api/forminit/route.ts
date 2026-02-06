// src/app/api/forminit/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formId, fields } = body;
    
    if (!formId || !fields) {
      return NextResponse.json(
        { error: "Missing form ID or fields" },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    Object.entries(fields).forEach(([key, value]) => {
      if (value) {
        formData.append(key, String(value));
      }
    });

    const response = await fetch(`https://forminit.com/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      redirect: 'manual',
    });

    if (response.status === 200 || response.status === 302 || response.status === 303) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Submission failed" },
      { status: response.status }
    );

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}