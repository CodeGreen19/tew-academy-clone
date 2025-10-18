export function errorMessage(message: string) {
  return { success: false, message };
}
export function successMessage(message: string) {
  return { success: true, message };
}
export function successStatus(success: boolean) {
  return { success };
}
