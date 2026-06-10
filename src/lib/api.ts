// Base URL for API calls.
//
// On the web this is empty, so calls stay same-origin ("/api/jobs").
// In the Capacitor mobile build the pages are bundled into the app and there
// is no local server, so NEXT_PUBLIC_API_BASE points at the deployed site
// (e.g. https://getrehired.vercel.app) and every API call goes there.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? ''

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`
}
