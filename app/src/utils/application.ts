export function getApplicationId(): string {
  return import.meta.env['VITE_APPLICATION_ID'] ?? 'myApp';
}
