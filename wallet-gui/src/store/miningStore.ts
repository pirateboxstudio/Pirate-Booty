// 🏴‍☠️ Mining State Management
import { create } from 'zustand'
import DaemonRpcClient, { MiningStatus, PirateHashInfo } from '../services/daemonRpc'

interface MiningStats {
  totalBlocksFound: number
  lastBlockFound: number | null
  totalHashesComputed: number
  averageHashRate: number
  uptimeSeconds: number
}

interface MiningState {
  // Mining status
  isMining: boolean
  hashRate: number
  threads: number
  miningAddress: string
  algorithm: string
  
  // Background mining
  backgroundMiningEnabled: boolean
  idleThreshold: number
  minIdleSeconds: number
  ignoreBattery: boolean
  
  // Statistics
  stats: MiningStats
  
  // Algorithm info
  algorithmInfo: PirateHashInfo | null
  
  // Network
  difficulty: number
  blockReward: number
  blockTarget: number
  
  // Daemon RPC
  daemonClient: DaemonRpcClient | null
  
  // Actions
  setDaemonClient: (client: DaemonRpcClient) => void
  updateMiningStatus: (status: MiningStatus) => void
  setMiningAddress: (address: string) => void
  setThreads: (threads: number) => void
  setBackgroundMining: (enabled: boolean) => void
  setIdleThreshold: (threshold: number) => void
  setMinIdleSeconds: (seconds: number) => void
  setIgnoreBattery: (ignore: boolean) => void
  setAlgorithmInfo: (info: PirateHashInfo) => void
  incrementBlocksFound: () => void
  updateStats: (hashRate: number) => void
  resetStats: () => void
}

export const useMiningStore = create<MiningState>((set, get) => ({
  // Initial state
  isMining: false,
  hashRate: 0,
  threads: 2,
  miningAddress: '',
  algorithm: 'Pirate Hash',
  
  backgroundMiningEnabled: false,
  idleThreshold: 5,
  minIdleSeconds: 30,
  ignoreBattery: false,
  
  stats: {
    totalBlocksFound: 0,
    lastBlockFound: null,
    totalHashesComputed: 0,
    averageHashRate: 0,
    uptimeSeconds: 0,
  },
  
  algorithmInfo: null,
  difficulty: 0,
  blockReward: 0,
  blockTarget: 60,
  daemonClient: null,
  
  // Actions
  setDaemonClient: (client) => set({ daemonClient: client }),
  
  updateMiningStatus: (status) => set({
    isMining: status.active,
    hashRate: status.speed,
    threads: status.threads_count,
    miningAddress: status.address,
    algorithm: status.pow_algorithm,
    backgroundMiningEnabled: status.is_background_mining_enabled,
    idleThreshold: status.bg_idle_threshold,
    minIdleSeconds: status.bg_min_idle_seconds,
    ignoreBattery: status.bg_ignore_battery,
    difficulty: status.difficulty,
    blockReward: status.block_reward / 1e12,
    blockTarget: status.block_target,
  }),
  
  setMiningAddress: (address) => set({ miningAddress: address }),
  
  setThreads: (threads) => set({ threads }),
  
  setBackgroundMining: (enabled) => set({ backgroundMiningEnabled: enabled }),
  
  setIdleThreshold: (threshold) => set({ idleThreshold: threshold }),
  
  setMinIdleSeconds: (seconds) => set({ minIdleSeconds: seconds }),
  
  setIgnoreBattery: (ignore) => set({ ignoreBattery: ignore }),
  
  setAlgorithmInfo: (info) => set({ algorithmInfo: info }),
  
  incrementBlocksFound: () => set((state) => ({
    stats: {
      ...state.stats,
      totalBlocksFound: state.stats.totalBlocksFound + 1,
      lastBlockFound: Date.now(),
    },
  })),
  
  updateStats: (hashRate) => {
    const state = get()
    const newUptime = state.stats.uptimeSeconds + 1
    const totalHashes = state.stats.totalHashesComputed + hashRate
    const avgHashRate = totalHashes / newUptime
    
    set({
      stats: {
        ...state.stats,
        totalHashesComputed: totalHashes,
        averageHashRate: avgHashRate,
        uptimeSeconds: newUptime,
      },
    })
  },
  
  resetStats: () => set({
    stats: {
      totalBlocksFound: 0,
      lastBlockFound: null,
      totalHashesComputed: 0,
      averageHashRate: 0,
      uptimeSeconds: 0,
    },
  }),
}))
