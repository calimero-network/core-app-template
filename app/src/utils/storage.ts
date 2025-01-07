import { getAccessToken } from '@calimero-network/calimero-client';

export const APP_URL = 'app-url';
export const CONTEXT_IDENTITY = 'context-identity';
export const CONTEXT_ID = 'context-id';
export const APPLICATION_ID = 'application-id';

export const getStorageAppEndpointKey = (): string | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let storageRecord: string | null = localStorage.getItem(APP_URL);
      if (storageRecord) {
        let url: string = JSON.parse(storageRecord);
        if (url && url.length > 0) {
          return url;
        }
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const getStorageExecutorPublicKey = (): String | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let contextIdentity: string = JSON.parse(
        localStorage.getItem(CONTEXT_IDENTITY) ?? '',
      );
      return contextIdentity;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const setStorageAppEndpointKey = (url: string) => {
  localStorage.setItem(APP_URL, JSON.stringify(url));
};

export const clearStorageAppEndpoint = () => {
  localStorage.removeItem(APP_URL);
};

export const getStorageContextId = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storageContextId = localStorage.getItem(CONTEXT_ID);
    if (storageContextId) {
      return JSON.parse(storageContextId);
    }
  }
  return null;
};

export const setStorageContextId = (contextId: string) => {
  localStorage.setItem(CONTEXT_ID, JSON.stringify(contextId));
};

export const clearAppEndpoint = () => {
  localStorage.removeItem(APP_URL);
};

export const clearApplicationId = () => {
  localStorage.removeItem(APPLICATION_ID);
};

export const getApplicationId = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storageApplicationId = localStorage.getItem(APPLICATION_ID);
    if (storageApplicationId) {
      return JSON.parse(storageApplicationId);
    }
  }
  return null;
};

export const setStorageApplicationId = (applicationId: string) => {
  localStorage.setItem(APPLICATION_ID, JSON.stringify(applicationId));
};

export interface JsonWebToken {
  context_id: string;
  token_type: string;
  exp: number;
  sub: string;
  executor_public_key: string;
}

export const getJWTObject = (): JsonWebToken | null => {
  const token = getAccessToken();
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }
  const payload = JSON.parse(atob(parts[1]));
  return payload;
};

export const getJWT = (): string | null => {
  return getAccessToken();
};
