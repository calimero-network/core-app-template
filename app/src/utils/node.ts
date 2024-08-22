import {
  getAppEndpointKey,
  getContextId,
  setAppEndpointKey,
  setContextId,
} from './storage';

export function getNodeUrl(): string {
  let storageKey = getAppEndpointKey();

  if (!storageKey) {
    let envKey: string = import.meta.env['VITE_NODE_URL'] ?? '';
    setAppEndpointKey(envKey);
    return envKey;
  }

  return storageKey ?? '';
}

export function getStorageContextId(): string {
  let storageContextId = getContextId();

  if (!storageContextId) {
    let envKey: string = import.meta.env['VITE_NODE_CONTEXT_ID'] ?? '';
    setContextId(envKey);
    return envKey;
  }

  return storageContextId ?? '';
}

export function getNearEnvironment(): string {
  return import.meta.env['VITE_NEAR_ENVIRONMENT'] ?? 'testnet';
}
