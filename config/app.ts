export const config = {
  apiUrl:
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
    "",
  clientKey:
    (typeof window !== "undefined"
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : "") ||
    process.env.NEXT_PUBLIC_CLIENT_URL ||
    "",
  serverKey:
    (typeof window !== "undefined"
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : "") ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "",
};