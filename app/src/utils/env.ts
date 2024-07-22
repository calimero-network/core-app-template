export function getApplicationId(): string {
  return import.meta.env['VITE_APPLICATION_ID'] ?? 'invalid-app-id';
}

export function getRpcPath(): string {
  return import.meta.env['VITE_RPC_PATH'] ?? 'invalid-rpc-path';
}

export function getContextId(): string {
  return import.meta.env['VITE_CONTEXT_ID'] ?? 'invalid-context-id';
}
