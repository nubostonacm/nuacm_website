import { createForminitProxy } from "forminit/next";

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

const proxy = createForminitProxy({
  apiKey,
}) as unknown as (req: Request) => Promise<Response>;

export async function POST(req: Request): Promise<Response> {
  return proxy(req);
}