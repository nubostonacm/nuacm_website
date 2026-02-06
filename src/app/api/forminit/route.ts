// src/app/api/forminit/route.ts
import { createForminitProxy } from 'forminit/next';
import { NextRequest } from 'next/server';

const apiKey = process.env.FORMINIT_API_KEY;

if (!apiKey) {
  throw new Error("FORMINIT_API_KEY is not set");
}

const proxy = createForminitProxy({
  apiKey,
});

