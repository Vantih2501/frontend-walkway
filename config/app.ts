export const config = {
  baseUrl:
    (typeof window !== "undefined"
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : "") ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3222",
  sandboxUrl:
    (typeof window !== "undefined"
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : "") ||
    process.env.NEXT_PUBLIC_SANDBOX_URL ||
    "https://app.sandbox.midtrans.com/snap/snap.js",
  clientKey:
    (typeof window !== "undefined"
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : "") ||
    process.env.NEXT_PUBLIC_SANDBOX_URL ||
    "SB-Mid-client-c93k2WL1hKL036pT",
  serverKey:
    (typeof window !== "undefined"
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : "") ||
    process.env.NEXT_PUBLIC_SANDBOX_URL ||
    "SB-Mid-server-leBX9RrZWrWjmdQYcS_dnMcn",
};