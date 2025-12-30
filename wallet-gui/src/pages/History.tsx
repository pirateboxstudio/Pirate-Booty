// 🏴‍☠️ Transaction History Page
import { useWalletStore } from '../store/walletStore'
import { formatDistanceToNow, format } from 'date-fns'
import { Search, Filter } from 'lucide-react'
import { useState } from 'react'

export default function History() {
  const { transactions } = useWalletStore()
  const [filter, setFilter] = useState<'all' | 'in' | 'out' | 'pending'>('all')
  const [search, setSearch] = useState('')

  const filteredTransactions = transactions.filter(tx => {
    if (filter !== 'all' && tx.type !== filter) return false
    if (search && !tx.txid.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gold flex items-center gap-2">
          📜 Transaction History (Ship's Log)
        </h1>
        <p className="text-gray-400 mt-1">View all your treasure movements</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by transaction ID..."
            className="w-full bg-ocean border border-ocean-light rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        
        <div className="flex gap-2 bg-ocean border border-ocean-light rounded-lg p-1">
          {[
            { value: 'all', label: 'All' },
            { value: 'in', label: 'Received' },
            { value: 'out', label: 'Sent' },
            { value: 'pending', label: 'Pending' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as any)}
              className={`px-4 py-1 rounded transition-colors ${
                filter === f.value
                  ? 'bg-gold text-navy-950 font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-ocean rounded-lg border border-ocean-light divide-y divide-ocean-light">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <div key={tx.txid} className="p-4 hover:bg-ocean-light transition-colors">
              <div className="flex items-start justify-between">
                {/* Left side */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    tx.type === 'in' ? 'bg-treasure/20 text-treasure' :
                    tx.type === 'out' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    <span className="text-2xl">
                      {tx.type === 'in' ? '⬇️' : tx.type === 'out' ? '⬆️' : '⏳'}
                    </span>
                  </div>
                  
                  <div>
                    <div className="font-medium text-gray-200 mb-1">
                      {tx.type === 'in' ? 'Received' : tx.type === 'out' ? 'Sent' : 'Pending'}
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>
                        {tx.timestamp 
                          ? format(tx.timestamp * 1000, 'MMM dd, yyyy HH:mm:ss')
                          : 'Pending'}
                      </div>
                      <div className="font-mono">
                        TX: {tx.txid.substring(0, 16)}...
                      </div>
                      {tx.height > 0 && (
                        <div>Height: {tx.height.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="text-right">
                  <div className={`text-xl font-bold mb-1 ${
                    tx.type === 'in' ? 'text-treasure' : 'text-gray-300'
                  }`}>
                    {tx.type === 'in' ? '+' : '-'}{tx.amount.toFixed(6)} PBT
                  </div>
                  {tx.fee > 0 && (
                    <div className="text-xs text-gray-400">
                      Fee: {tx.fee.toFixed(6)} PBT
                    </div>
                  )}
                  {tx.height > 0 ? (
                    <div className="text-xs text-treasure mt-2">
                      ✓ Confirmed
                    </div>
                  ) : (
                    <div className="text-xs text-yellow-400 mt-2">
                      ⏳ Pending
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">🏴‍☠️</div>
            <p className="text-lg">No transactions found</p>
            <p className="text-sm mt-1">
              {search ? 'Try a different search term' : 'Your ship\'s log is empty'}
            </p>
          </div>
        )}
      </div>

      {/* Export Options */}
      {filteredTransactions.length > 0 && (
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-ocean hover:bg-ocean-light rounded-lg border border-ocean-light">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-ocean hover:bg-ocean-light rounded-lg border border-ocean-light">
            Export JSON
          </button>
        </div>
      )}
    </div>
  )
}
