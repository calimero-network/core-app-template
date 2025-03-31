import { getAccessToken } from "@calimero-network/calimero-client";

export interface AxiosHeader {
  [key: string]: string;
}

export function createJwtHeader(): AxiosHeader | null {
  const token: string | null = getAccessToken();

  if (!token) {
    return null;
  }

  const headers: AxiosHeader = {
    authorization: `Bearer ${token}`,
  };
  return headers;
}
