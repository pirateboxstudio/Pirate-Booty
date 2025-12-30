// 🏴‍☠️ Welcome/Setup Page
import { useState } from 'react'
import { useWalletStore } from '../store/walletStore'
import WalletRpcClient from '../services/walletRpc'
import { Anchor } from 'lucide-react'

export default function Welcome() {
  const { openWallet, setRpcClient, setPrimaryAddress } = useWalletStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenWallet = async () => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would prompt for wallet file and password
      const walletPath = '/home/user/.piratebooty/wallet/my-wallet'
      const password = 'test-password'
      const daemonAddress = '127.0.0.1:18081'

      // Start wallet RPC via Electron
      if (window.electron) {
        const result = await window.electron.startWalletRpc({
          walletPath,
          password,
          daemonAddress,
        })

        if (!result.success) {
          throw new Error(result.error || 'Failed to start wallet')
        }
      }

      // Connect to wallet RPC
      const rpcClient = new WalletRpcClient('127.0.0.1', 18083)
      
      // Test connection
      const isHealthy = await rpcClient.healthCheck()
      if (!isHealthy) {
        throw new Error('Wallet RPC not responding')
      }

      // Get primary address
      const address = await rpcClient.getAddress(0)
      
      // Get initial balance
      const balance = await rpcClient.getBalance(0)

      // Update store
      setRpcClient(rpcClient)
      setPrimaryAddress(address)
      openWallet(walletPath)
      useWalletStore.setState({ balance })

      // Start periodic refresh
      setInterval(async () => {
        try {
          const newBalance = await rpcClient.getBalance(0)
          useWalletStore.setState({ balance: newBalance })
        } catch (err) {
          console.error('Failed to refresh balance:', err)
        }
      }, 30000) // Every 30 seconds

    } catch (err: any) {
      setError(`⚠️ ${err.message}`)
      console.error('Wallet open error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-4">🏴‍☠️</div>
          <h1 className="text-5xl font-bold text-gold mb-2">Pirate Booty</h1>
          <p className="text-xl text-gray-400">Black Pearl Edition</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
            <Anchor className="w-4 h-4" />
            <span>v1.0.0</span>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-ocean rounded-xl p-8 border border-ocean-light mb-6">
          <h2 className="text-2xl font-bold text-gold mb-4">
            ⚓ Welcome Aboard, Captain!
          </h2>
          <p className="text-gray-300 mb-6">
            Pirate Booty is a privacy-focused cryptocurrency that keeps your treasure
            hidden from landlubbers. With stealth addresses and ring signatures,
            your booty stays private on the high seas.
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-treasure">✓</span>
              <span>Privacy-preserving by default</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-treasure">✓</span>
              <span>ASIC-resistant Pirate Hash algorithm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-treasure">✓</span>
              <span>Fair distribution and tail emission</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleOpenWallet}
            disabled={loading}
            className="bg-gold hover:bg-gold-light text-navy-950 font-bold p-6 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
          >
            <div className="text-3xl mb-2">📂</div>
            <div>Open Wallet</div>
          </button>
          
          <button
            disabled
            className="bg-ocean hover:bg-ocean-light border border-ocean-light p-6 rounded-lg transition-all hover:scale-105 opacity-50"
          >
            <div className="text-3xl mb-2">✨</div>
            <div>Create New</div>
          </button>
          
          <button
            disabled
            className="bg-ocean hover:bg-ocean-light border border-ocean-light p-6 rounded-lg transition-all hover:scale-105 opacity-50"
          >
            <div className="text-3xl mb-2">🔄</div>
            <div>Restore</div>
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-navy-900 border border-ocean-light rounded-lg p-4 text-center">
            <div className="animate-spin text-4xl mb-2">⚓</div>
            <div className="text-gray-300">Setting sail...</div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>🏴‍☠️ The seas belong to the miners!</p>
          <p className="mt-2">
            <a href="https://piratebooty.io" className="text-gold hover:text-gold-light">
              piratebooty.io
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
