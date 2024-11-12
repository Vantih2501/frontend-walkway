import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

export function compressJWT(token: string) {
  const [header, payload, signature] = token.split('.');

  const compressedPayload = compressToEncodedURIComponent(payload);

  return `${header}.${compressedPayload}.${signature}`;
}

export function decompressJWT(compressedToken?: string) {
  if (!compressedToken) return;

  const [header, compressedPayload, signature] = compressedToken.split('.');

  const originalPayload = decompressFromEncodedURIComponent(compressedPayload);

  return `${header}.${originalPayload}.${signature}`;
}