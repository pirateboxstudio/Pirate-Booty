// 🏴‍☠️ Send Transaction Page
import { useState } from 'react'
import { useWalletStore } from '../store/walletStore'
import { Send as SendIcon, AlertCircle, CheckCircle } from 'lucide-react'

export default function Send() {
  const { balance, rpcClient } = useWalletStore()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [priority, setPriority] = useState<number>(1)
  const [paymentId, setPaymentId] = useState('')
  const [description, setDescription] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!rpcClient) {
      setError('⚠️ Wallet not connected')
      return
    }

    // Validate address
    const isValid = await rpcClient.validateAddress(recipient)
    if (!isValid) {
      setError('🏴‍☠️ Invalid treasure chest address')
      return
    }

    // Validate amount
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('⚠️ Invalid amount')
      return
    }

    if (balance && amountNum > balance.unlocked_balance) {
      setError('⚠️ Not enough booty in your chest')
      return
    }

    try {
      setSending(true)
      const result = await rpcClient.transfer(
        [{ address: recipient, amount: amountNum }],
        priority,
        10, // mixin
        true // get tx key
      )

      setSuccess(`🏴‍☠️ Booty sent successfully! Fair winds!\nTX: ${result.tx_hash.substring(0, 16)}...`)
      
      // Reset form
      setRecipient('')
      setAmount('')
      setPaymentId('')
      setDescription('')
    } catch (err: any) {
      setError(`⚠️ Failed to send: ${err.message}`)
    } finally {
      setSending(false)
    }
  }

  const handleSendAll = () => {
    if (balance) {
      setAmount(balance.unlocked_balance.toString())
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gold flex items-center gap-2">
          ⚓ Send Pirate Booty
        </h1>
        <p className="text-gray-400 mt-1">Send PBT to another treasure chest</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSend} className="bg-ocean rounded-xl p-6 border border-ocean-light space-y-6">
        {/* Recipient Address */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Recipient Address (Treasure Chest)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="4ABC..."
              className="flex-1 bg-navy-900 border border-ocean-light rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
            <button
              type="button"
              className="px-4 py-2 bg-ocean-light hover:bg-ocean rounded-lg border border-ocean-light"
            >
              📋 Paste
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-ocean-light hover:bg-ocean rounded-lg border border-ocean-light"
            >
              📖 Book
            </button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount (PBT)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.000000000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.000000000000"
              className="w-full bg-navy-900 border border-ocean-light rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
            <button
              type="button"
              onClick={handleSendAll}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm bg-gold text-navy-950 rounded hover:bg-gold-light"
            >
              Send All
            </button>
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Available: {balance ? balance.unlocked_balance.toFixed(12) : '0.000000000000'} PBT
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Priority
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 0, label: 'Slow', fee: '~0.000010' },
              { value: 1, label: 'Standard', fee: '~0.000050' },
              { value: 2, label: 'Fast', fee: '~0.000100' },
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={`p-3 rounded-lg border transition-all ${
                  priority === p.value
                    ? 'bg-gold text-navy-950 border-gold'
                    : 'bg-navy-900 border-ocean-light hover:border-gold'
                }`}
              >
                <div className="font-medium">{p.label}</div>
                <div className="text-xs mt-1">Fee: {p.fee} PBT</div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment ID (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Payment ID (optional)
          </label>
          <input
            type="text"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            placeholder="64-character hex string"
            className="w-full bg-navy-900 border border-ocean-light rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Description (Local) */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description (local only)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Payment for services"
            className="w-full bg-navy-900 border border-ocean-light rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 bg-treasure/20 border border-treasure rounded-lg text-treasure">
            <CheckCircle className="w-5 h-5" />
            <span className="whitespace-pre-line">{success}</span>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="bg-navy-900 rounded-lg p-4 border border-ocean-light">
          <div className="text-sm font-medium text-gray-300 mb-2">Privacy Notice:</div>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Ring size: 11 (automatic)</li>
            <li>• Stealth address: Enabled</li>
            <li>• RingCT: Enabled</li>
          </ul>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setRecipient('')
              setAmount('')
              setPaymentId('')
              setDescription('')
              setError(null)
              setSuccess(null)
            }}
            className="flex-1 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-lg border border-ocean-light transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={sending}
            className="flex-1 px-6 py-3 bg-gold hover:bg-gold-light text-navy-950 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sending ? (
              <>Sending...</>
            ) : (
              <>
                <SendIcon className="w-5 h-5" />
                🏴‍☠️ Send Booty
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
