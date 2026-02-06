import { createForminitProxy } from "forminit/next";

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

const proxy = createForminitProxy({ apiKey }) as unknown as (req: Request) => Promise<any>;

export async function POST(req: Request) {
  // Parse the body first
  const body = await req.json();

  // Forward a new Request with the same method, headers, and parsed body
  const forminitReq = new Request(req.url, {
    method: req.method,
    headers: req.headers,
    body: JSON.stringify(body),
  });

  // Call the proxy
  const result = await proxy(forminitReq);

  // Always return a proper JSON Response
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}