// 🏴‍☠️ Electron Preload Script
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  // Dialog APIs
  openFileDialog: () => ipcRenderer.invoke('dialog:openFile'),
  saveFileDialog: () => ipcRenderer.invoke('dialog:saveFile'),
  
  // Wallet RPC APIs
  startWalletRpc: (config: any) => ipcRenderer.invoke('wallet:start-rpc', config),
  stopWalletRpc: () => ipcRenderer.invoke('wallet:stop-rpc'),
  
  // App APIs
  getVersion: () => ipcRenderer.invoke('app:get-version'),
  getPath: (name: string) => ipcRenderer.invoke('app:get-path', name),
})
