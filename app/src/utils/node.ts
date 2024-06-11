import { NetworkId } from '@near-wallet-selector/core';
import { getAppEndpointKey, setAppEndpointKey } from './storage';

export function getNodeUrl(): string {
  let storageKey = getAppEndpointKey();

  if (!storageKey) {
    let envKey: string = import.meta.env['VITE_NODE_URL'] ?? '';
    setAppEndpointKey(envKey);
    return envKey;
  }

  return storageKey ?? '';
}

export function getNearEnvironment(): NetworkId {
  return (
    (import.meta.env['VITE_NEAR_ENVIRONMENT'] as NetworkId) ??
    ('testnet' as NetworkId)
  );
}
