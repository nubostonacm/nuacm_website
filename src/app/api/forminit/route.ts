import { createForminitProxy } from "forminit/next";

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

const proxy = createForminitProxy({
  apiKey,
}) as unknown as (req: Request) => Promise<unknown>;

export async function POST(req: Request): Promise<Response> {
  const result = await proxy(req);

  // Always wrap result as proper JSON response
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}