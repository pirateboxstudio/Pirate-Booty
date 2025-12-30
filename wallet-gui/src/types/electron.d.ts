// Type definitions for Electron API
export interface ElectronAPI {
  openFileDialog: () => Promise<string>
  saveFileDialog: () => Promise<string>
  startWalletRpc: (config: {
    walletPath: string
    password: string
    daemonAddress: string
  }) => Promise<{ success: boolean; port?: number; error?: string }>
  stopWalletRpc: () => Promise<{ success: boolean }>
  getVersion: () => Promise<string>
  getPath: (name: string) => Promise<string>
}

declare global {
  interface Window {
    electron: ElectronAPI
  }
}
