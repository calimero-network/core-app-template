import {
  getAppEndpointKey,
  setAppEndpointKey,
  getContextId as getStorageContextId,
  setContextId,
  getApplicationId,
  setApplicationId,
  getJWTObject,
} from '@calimero-network/calimero-client';

export function getNodeUrl(): string {
  let storageKey = getAppEndpointKey();

  if (!storageKey) {
    let envKey: string = import.meta.env['VITE_NODE_URL'] ?? '';
    setAppEndpointKey(envKey);
    return envKey;
  }

  return storageKey ?? '';
}

export function getContextId(): string {
  let storageContextId = getStorageContextId();

  if (!storageContextId) {
    let jwtToken = getJWTObject();
    let envKey: string = jwtToken?.context_id ?? '';
    setContextId(envKey);
    return envKey;
  }

  return storageContextId ?? '';
}

export function getNearEnvironment(): string {
  return import.meta.env['VITE_NEAR_ENVIRONMENT'] ?? 'testnet';
}

export function getStorageApplicationId(): string {
  let storageApplicationId = getApplicationId();

  if (!storageApplicationId) {
    let envKey: string = import.meta.env['VITE_APPLICATION_ID'] ?? '';
    setApplicationId(envKey);
    return envKey;
  }

  return storageApplicationId ?? '';
}
