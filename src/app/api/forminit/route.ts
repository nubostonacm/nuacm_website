// src/app/api/forminit/route.ts
import { createForminitProxy } from 'forminit/next';
import { NextRequest } from 'next/server';

const proxy = createForminitProxy({
  apiKey: process.env.FORMINIT_API_KEY,
});

export async function POST(req: NextRequest) {
  return proxy.POST(req);
}

