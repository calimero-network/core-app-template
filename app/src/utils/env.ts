export function getApplicationId(): string {
  return import.meta.env['VITE_APPLICATION_ID'] ?? '';
}

export function getRpcPath(): string {
  return import.meta.env['VITE_RPC_PATH'] ?? '';
}

export function getEnvContextId(): string {
  return import.meta.env['VITE_CONTEXT_ID'] ?? '';
}
