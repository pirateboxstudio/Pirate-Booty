// 🏴‍☠️ Header Component
import { useWalletStore, useNetworkStore } from '../store/walletStore'
import { Wifi, WifiOff, RefreshCw, Menu } from 'lucide-react'
import { useUIStore } from '../store/walletStore'

export default function Header() {
  const { balance, isSyncing, syncHeight, targetHeight } = useWalletStore()
  const { isConnected, connections } = useNetworkStore()
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)

  const syncProgress = targetHeight > 0 ? (syncHeight / targetHeight) * 100 : 0

  return (
    <header className="h-16 bg-ocean border-b border-ocean-light flex items-center justify-between px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-ocean-light rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Balance */}
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xs text-gray-400">Total Balance</div>
            <div className="text-lg font-bold text-gold flex items-center gap-2">
              {balance ? (
                <>
                  {balance.balance.toFixed(12)} PBT
                  {isSyncing && <RefreshCw className="w-4 h-4 animate-spin" />}
                </>
              ) : (
                <span className="text-gray-500">Loading...</span>
              )}
            </div>
          </div>
          {balance && balance.balance !== balance.unlocked_balance && (
            <div className="border-l border-ocean-light pl-4">
              <div className="text-xs text-gray-400">Unlocked</div>
              <div className="text-sm font-medium text-treasure">
                {balance.unlocked_balance.toFixed(12)} PBT
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Sync status */}
        {isSyncing && (
          <div className="text-sm text-gray-400">
            Syncing: {syncHeight.toLocaleString()} / {targetHeight.toLocaleString()}
            <div className="w-32 h-1 bg-navy-900 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Network status */}
        <div className="flex items-center gap-2 px-3 py-2 bg-navy-900 rounded-lg">
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-treasure" />
              <span className="text-sm">{connections} peers</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-400">Offline</span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
