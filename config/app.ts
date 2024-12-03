export const config = {
  apiUrl:
    (typeof window !== "undefined"
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : "") ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3222",
  baseUrl: "https://f209kkb4-3000.asse.devtunnels.ms",
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
