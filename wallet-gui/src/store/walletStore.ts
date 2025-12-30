// 🏴‍☠️ Wallet State Management
import { create } from 'zustand'
import WalletRpcClient, { WalletBalance, WalletAddress, Transaction } from '../services/walletRpc'

interface WalletState {
  // Wallet info
  isOpen: boolean
  walletPath: string | null
  primaryAddress: string | null
  
  // Balance
  balance: WalletBalance | null
  
  // Addresses
  addresses: WalletAddress[]
  
  // Transactions
  transactions: Transaction[]
  
  // Sync status
  isSyncing: boolean
  syncHeight: number
  targetHeight: number
  
  // RPC client
  rpcClient: WalletRpcClient | null
  
  // Actions
  setRpcClient: (client: WalletRpcClient) => void
  openWallet: (path: string) => void
  closeWallet: () => void
  updateBalance: (balance: WalletBalance) => void
  updateAddresses: (addresses: WalletAddress[]) => void
  updateTransactions: (transactions: Transaction[]) => void
  updateSyncStatus: (height: number, targetHeight: number) => void
  setPrimaryAddress: (address: string) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  // Initial state
  isOpen: false,
  walletPath: null,
  primaryAddress: null,
  balance: null,
  addresses: [],
  transactions: [],
  isSyncing: false,
  syncHeight: 0,
  targetHeight: 0,
  rpcClient: null,
  
  // Actions
  setRpcClient: (client) => set({ rpcClient: client }),
  
  openWallet: (path) => set({ isOpen: true, walletPath: path }),
  
  closeWallet: () => set({
    isOpen: false,
    walletPath: null,
    primaryAddress: null,
    balance: null,
    addresses: [],
    transactions: [],
    syncHeight: 0,
    targetHeight: 0,
  }),
  
  updateBalance: (balance) => set({ balance }),
  
  updateAddresses: (addresses) => set({ addresses }),
  
  updateTransactions: (transactions) => set({ transactions }),
  
  updateSyncStatus: (syncHeight, targetHeight) => set({
    syncHeight,
    targetHeight,
    isSyncing: syncHeight < targetHeight,
  }),
  
  setPrimaryAddress: (address) => set({ primaryAddress: address }),
}))

// Network state
interface NetworkState {
  isConnected: boolean
  daemonAddress: string
  networkHeight: number
  difficulty: number
  hashRate: number
  connections: number
  
  setConnected: (connected: boolean) => void
  setDaemonAddress: (address: string) => void
  updateNetworkInfo: (info: {
    height: number
    difficulty: number
    hashRate: number
    connections: number
  }) => void
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: false,
  daemonAddress: '127.0.0.1:18081',
  networkHeight: 0,
  difficulty: 0,
  hashRate: 0,
  connections: 0,
  
  setConnected: (connected) => set({ isConnected: connected }),
  
  setDaemonAddress: (address) => set({ daemonAddress: address }),
  
  updateNetworkInfo: (info) => set({
    networkHeight: info.height,
    difficulty: info.difficulty,
    hashRate: info.hashRate,
    connections: info.connections,
  }),
}))

// UI state
interface UIState {
  currentView: string
  theme: 'dark' | 'light'
  showSidebar: boolean
  
  setCurrentView: (view: string) => void
  setTheme: (theme: 'dark' | 'light') => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  currentView: 'dashboard',
  theme: 'dark',
  showSidebar: true,
  
  setCurrentView: (view) => set({ currentView: view }),
  
  setTheme: (theme) => set({ theme }),
  
  toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
}))
