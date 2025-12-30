// 🏴‍☠️ Receive Page
import { useState, useEffect } from 'react'
import { useWalletStore } from '../store/walletStore'
import { Copy, Check } from 'lucide-react'
import QRCode from 'react-qr-code'

export default function Receive() {
  const { primaryAddress, addresses, rpcClient } = useWalletStore()
  const [copied, setCopied] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  useEffect(() => {
    if (primaryAddress) {
      setSelectedAddress(primaryAddress)
    }
  }, [primaryAddress])

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateSubaddress = async () => {
    if (!rpcClient) return
    
    const label = prompt('Enter a label for this subaddress:')
    if (label) {
      try {
        await rpcClient.createAddress(0, label)
        // Refresh addresses
        const newAddresses = await rpcClient.getAddresses(0)
        useWalletStore.setState({ addresses: newAddresses })
      } catch (error: any) {
        alert(`Failed to create subaddress: ${error.message}`)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gold flex items-center gap-2">
          💰 Receive Pirate Booty
        </h1>
        <p className="text-gray-400 mt-1">Share your treasure chest address</p>
      </div>

      {/* Main Address Card */}
      <div className="bg-ocean rounded-xl p-6 border border-ocean-light">
        <div className="text-sm font-medium text-gray-300 mb-3">
          Your Address (Main Treasure Chest)
        </div>
        
        <div className="flex gap-6">
          {/* QR Code */}
          <div className="bg-white p-4 rounded-lg">
            <QRCode 
              value={selectedAddress || ''} 
              size={200}
              level="M"
            />
          </div>

          {/* Address Details */}
          <div className="flex-1 space-y-4">
            <div className="bg-navy-900 rounded-lg p-4 border border-ocean-light">
              <div className="font-mono text-sm break-all text-gray-300 mb-3">
                {selectedAddress || 'Loading...'}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => selectedAddress && handleCopy(selectedAddress)}
                  className="flex-1 px-4 py-2 bg-gold hover:bg-gold-light text-navy-950 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Address'}
                </button>
                <button
                  className="px-4 py-2 bg-ocean-light hover:bg-ocean rounded-lg border border-ocean-light"
                >
                  Share
                </button>
              </div>
            </div>

            <div className="bg-navy-900 rounded-lg p-4 border border-ocean-light">
              <div className="text-sm text-gray-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Privacy:</span>
                  <span className="text-treasure font-medium">🔒 Stealth Address</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Network:</span>
                  <span className="text-gold font-medium">Mainnet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subaddresses */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-200">Subaddresses</h2>
          <button
            onClick={handleCreateSubaddress}
            className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-950 font-medium rounded-lg transition-colors"
          >
            + Create New Subaddress
          </button>
        </div>

        <div className="bg-ocean rounded-lg border border-ocean-light divide-y divide-ocean-light">
          {addresses.length > 1 ? (
            addresses.slice(1).map((addr) => (
              <div
                key={addr.address}
                className="p-4 hover:bg-ocean-light transition-colors cursor-pointer"
                onClick={() => setSelectedAddress(addr.address)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-200 mb-1">
                      {addr.label || `Subaddress ${addr.address_index}`}
                    </div>
                    <div className="font-mono text-xs text-gray-400">
                      {addr.address.substring(0, 20)}...{addr.address.substring(addr.address.length - 20)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(addr.address)
                      }}
                      className="px-3 py-1 bg-navy-900 hover:bg-navy-800 rounded border border-ocean-light"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <span className={`px-3 py-1 rounded text-xs ${
                      addr.used ? 'bg-treasure/20 text-treasure' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {addr.used ? 'Used' : 'Unused'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400">
              <div className="text-4xl mb-2">📍</div>
              <p>No subaddresses yet</p>
              <p className="text-sm mt-1">Create subaddresses for better privacy</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-navy-900 rounded-lg p-4 border border-ocean-light">
        <div className="text-sm font-medium text-gray-300 mb-2">💡 Subaddresses for Privacy:</div>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Use different subaddresses for different purposes</li>
          <li>• Each subaddress provides additional privacy</li>
          <li>• All subaddresses share the same balance</li>
          <li>• Label your subaddresses to stay organized</li>
        </ul>
      </div>
    </div>
  )
}
