// 🏴‍☠️ Dashboard Page
import { useWalletStore, useNetworkStore } from '../store/walletStore'
import { Wallet, Send as SendIcon, Download, History as HistoryIcon, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

export default function Dashboard() {
  const { balance, transactions, primaryAddress } = useWalletStore()
  const { networkHeight, hashRate, difficulty } = useNetworkStore()
  const navigate = useNavigate()

  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gold flex items-center gap-2">
          🏴‍☠️ Your Treasure Chest
        </h1>
        <p className="text-gray-400 mt-1">Welcome aboard, Captain!</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-ocean to-ocean-dark rounded-xl p-6 border border-ocean-light shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">💰 Total Balance</div>
            <div className="text-4xl font-bold text-gold">
              {balance ? balance.balance.toFixed(6) : '0.000000'} <span className="text-2xl">PBT</span>
            </div>
          </div>
          <Wallet className="w-12 h-12 text-gold opacity-50" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ocean-light">
          <div>
            <div className="text-xs text-gray-400">Unlocked</div>
            <div className="text-lg font-semibold text-treasure">
              {balance ? balance.unlocked_balance.toFixed(6) : '0.000000'} PBT
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Locked</div>
            <div className="text-lg font-semibold text-gray-300">
              {balance ? (balance.balance - balance.unlocked_balance).toFixed(6) : '0.000000'} PBT
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-200 mb-3">⚓ Quick Actions</h2>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/send')}
            className="bg-ocean hover:bg-ocean-light p-6 rounded-lg border border-ocean-light transition-all hover:scale-105"
          >
            <SendIcon className="w-8 h-8 text-gold mx-auto mb-2" />
            <div className="text-sm font-medium">Send</div>
          </button>
          <button
            onClick={() => navigate('/receive')}
            className="bg-ocean hover:bg-ocean-light p-6 rounded-lg border border-ocean-light transition-all hover:scale-105"
          >
            <Download className="w-8 h-8 text-gold mx-auto mb-2" />
            <div className="text-sm font-medium">Receive</div>
          </button>
          <button
            onClick={() => navigate('/history')}
            className="bg-ocean hover:bg-ocean-light p-6 rounded-lg border border-ocean-light transition-all hover:scale-105"
          >
            <HistoryIcon className="w-8 h-8 text-gold mx-auto mb-2" />
            <div className="text-sm font-medium">History</div>
          </button>
          <button
            onClick={() => navigate('/mining')}
            className="bg-ocean hover:bg-ocean-light p-6 rounded-lg border border-ocean-light transition-all hover:scale-105"
          >
            <TrendingUp className="w-8 h-8 text-gold mx-auto mb-2" />
            <div className="text-sm font-medium">Mining</div>
          </button>
        </div>
      </div>

      {/* Network Status */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-ocean p-4 rounded-lg border border-ocean-light">
          <div className="text-xs text-gray-400 mb-1">Block Height</div>
          <div className="text-2xl font-bold text-gold">{networkHeight.toLocaleString()}</div>
        </div>
        <div className="bg-ocean p-4 rounded-lg border border-ocean-light">
          <div className="text-xs text-gray-400 mb-1">Network Hashrate</div>
          <div className="text-2xl font-bold text-gold">{(hashRate / 1000000).toFixed(2)} MH/s</div>
        </div>
        <div className="bg-ocean p-4 rounded-lg border border-ocean-light">
          <div className="text-xs text-gray-400 mb-1">Difficulty</div>
          <div className="text-2xl font-bold text-gold">{(difficulty / 1000000).toFixed(0)}M</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-200">📜 Recent Transactions</h2>
          <button
            onClick={() => navigate('/history')}
            className="text-sm text-gold hover:text-gold-light"
          >
            View All →
          </button>
        </div>
        
        <div className="bg-ocean rounded-lg border border-ocean-light overflow-hidden">
          {recentTransactions.length > 0 ? (
            <div className="divide-y divide-ocean-light">
              {recentTransactions.map((tx) => (
                <div key={tx.txid} className="p-4 hover:bg-ocean-light transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'in' ? 'bg-treasure/20 text-treasure' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {tx.type === 'in' ? '⬇️' : '⬆️'}
                      </div>
                      <div>
                        <div className="font-medium">
                          {tx.type === 'in' ? 'Received' : tx.type === 'out' ? 'Sent' : 'Pending'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {tx.timestamp ? formatDistanceToNow(tx.timestamp * 1000, { addSuffix: true }) : 'Pending'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${tx.type === 'in' ? 'text-treasure' : 'text-gray-300'}`}>
                        {tx.type === 'in' ? '+' : '-'}{tx.amount.toFixed(6)} PBT
                      </div>
                      {tx.fee > 0 && (
                        <div className="text-xs text-gray-400">Fee: {tx.fee.toFixed(6)} PBT</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <div className="text-4xl mb-2">🏴‍☠️</div>
              <p>No transactions yet</p>
              <p className="text-sm mt-1">Your treasure chest awaits booty!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
