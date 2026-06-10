import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.getrehired.app',
  appName: 'GetReHired',
  webDir: 'out',
  // Allow the webview to follow the Polar checkout redirect chain and the
  // deployed site (payment success page) without bouncing to the system browser.
  server: {
    allowNavigation: ['*.polar.sh', 'polar.sh', 'getrehired.vercel.app'],
  },
}

export default config
