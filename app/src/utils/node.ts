import { getEnvContextId } from './env';
import {
  getApplicationId,
  getStorageAppEndpointKey,
  getStorageContextId,
  setStorageAppEndpointKey,
  setStorageApplicationId,
  setStorageContextId,
} from './storage';

export function getNodeUrl(): string {
  let storageKey = getStorageAppEndpointKey();

  if (!storageKey) {
    let envKey: string = import.meta.env['VITE_NODE_URL'] ?? '';
    setStorageAppEndpointKey(envKey);
    return envKey;
  }

  return storageKey ?? '';
}

export function getContextId(): string {
  let storageContextId = getStorageContextId();

  if (!storageContextId) {
    let envKey: string = getEnvContextId();
    setStorageContextId(envKey);
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
    let envKey: string = process.env['NEXT_PUBLIC_APPLICATION_ID'] ?? '';
    setStorageApplicationId(envKey);
    return envKey;
  }

  return storageApplicationId ?? '';
}