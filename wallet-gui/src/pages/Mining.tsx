// 🏴‍☠️ Mining Page
import { useState, useEffect } from 'react'
import { useWalletStore } from '../store/walletStore'
import { useMiningStore } from '../store/miningStore'
import DaemonRpcClient from '../services/daemonRpc'
import { Play, Square, AlertCircle, TrendingUp, Zap, Clock, Award, Info } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function Mining() {
  const { primaryAddress } = useWalletStore()
  const {
    isMining,
    hashRate,
    threads,
    miningAddress,
    backgroundMiningEnabled,
    idleThreshold,
    minIdleSeconds,
    ignoreBattery,
    stats,
    algorithmInfo,
    difficulty,
    blockReward,
    daemonClient,
    setDaemonClient,
    updateMiningStatus,
    setMiningAddress,
    setThreads,
    setBackgroundMining,
    setIdleThreshold,
    setMinIdleSeconds,
    setIgnoreBattery,
    setAlgorithmInfo,
    updateStats,
    resetStats,
  } = useMiningStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [maxThreads] = useState(navigator.hardwareConcurrency || 4)
  const [estimatedTimeToBlock, setEstimatedTimeToBlock] = useState<number | null>(null)

  // Initialize daemon client
  useEffect(() => {
    if (!daemonClient) {
      const client = new DaemonRpcClient('127.0.0.1', 18081)
      setDaemonClient(client)
    }
  }, [daemonClient, setDaemonClient])

  // Set primary address as mining address by default
  useEffect(() => {
    if (primaryAddress && !miningAddress) {
      setMiningAddress(primaryAddress)
    }
  }, [primaryAddress, miningAddress, setMiningAddress])

  // Fetch algorithm info on mount
  useEffect(() => {
    const fetchAlgorithmInfo = async () => {
      if (daemonClient && !algorithmInfo) {
        try {
          const info = await daemonClient.getPirateHashInfo()
          setAlgorithmInfo(info)
        } catch (err) {
          console.error('Failed to fetch algorithm info:', err)
        }
      }
    }
    fetchAlgorithmInfo()
  }, [daemonClient, algorithmInfo, setAlgorithmInfo])

  // Poll mining status
  useEffect(() => {
    if (!daemonClient) return

    const pollStatus = async () => {
      try {
        const status = await daemonClient.getMiningStatus()
        updateMiningStatus(status)
        
        // Update stats if mining
        if (status.active) {
          updateStats(status.speed)
        }
        
        // Calculate estimated time to block
        if (status.speed > 0 && status.difficulty > 0) {
          const secondsToBlock = status.difficulty / status.speed
          setEstimatedTimeToBlock(secondsToBlock)
        }
      } catch (err) {
        console.error('Failed to poll mining status:', err)
      }
    }

    // Initial poll
    pollStatus()

    // Poll every 5 seconds
    const interval = setInterval(pollStatus, 5000)
    return () => clearInterval(interval)
  }, [daemonClient, updateMiningStatus, updateStats])

  const handleStartMining = async () => {
    if (!daemonClient || !miningAddress) return

    setLoading(true)
    setError(null)

    try {
      const result = await daemonClient.startMining(
        miningAddress,
        threads,
        backgroundMiningEnabled,
        ignoreBattery
      )

      if (result.status === 'OK') {
        // Success - status will be updated by polling
        resetStats()
      } else {
        setError(result.status)
      }
    } catch (err: any) {
      setError(`⚠️ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleStopMining = async () => {
    if (!daemonClient) return

    setLoading(true)
    setError(null)

    try {
      const result = await daemonClient.stopMining()
      if (result.status !== 'OK') {
        setError(result.status)
      }
    } catch (err: any) {
      setError(`⚠️ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const formatHashRate = (rate: number) => {
    if (rate >= 1000000) return `${(rate / 1000000).toFixed(2)} MH/s`
    if (rate >= 1000) return `${(rate / 1000).toFixed(2)} KH/s`
    return `${rate.toFixed(2)} H/s`
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.floor(seconds)}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
    return `${Math.floor(seconds / 86400)}d`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gold flex items-center gap-2">
          ⛏️ Mine Pirate Booty
        </h1>
        <p className="text-gray-400 mt-1">Deploy pirates to mine treasure from the blockchain</p>
      </div>

      {/* Mining Status Card */}
      <div className={`bg-gradient-to-br ${
        isMining ? 'from-treasure/20 to-treasure/5' : 'from-ocean to-ocean-dark'
      } rounded-xl p-6 border ${
        isMining ? 'border-treasure' : 'border-ocean-light'
      } shadow-xl transition-all`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isMining ? 'bg-treasure text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Mining Status</div>
              <div className={`text-2xl font-bold ${isMining ? 'text-treasure' : 'text-gray-400'}`}>
                {isMining ? '⚓ Pirates Mining' : '⚓ Not Mining'}
              </div>
            </div>
          </div>

          {isMining && (
            <div className="text-right">
              <div className="text-sm text-gray-400">Hash Rate</div>
              <div className="text-3xl font-bold text-gold">{formatHashRate(hashRate)}</div>
            </div>
          )}
        </div>

        {isMining && (
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-ocean-light">
            <div>
              <div className="text-xs text-gray-400 mb-1">Pirates (Threads)</div>
              <div className="text-lg font-semibold text-white">{threads}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Blocks Found</div>
              <div className="text-lg font-semibold text-treasure">{stats.totalBlocksFound}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Mining Time</div>
              <div className="text-lg font-semibold text-white">{formatTime(stats.uptimeSeconds)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Avg Hash Rate</div>
              <div className="text-lg font-semibold text-white">
                {formatHashRate(stats.averageHashRate)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Mining Configuration */}
        <div className="bg-ocean rounded-xl p-6 border border-ocean-light space-y-6">
          <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
            ⚙️ Mining Configuration
          </h2>

          {/* Mining Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mining Address
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={miningAddress}
                onChange={(e) => setMiningAddress(e.target.value)}
                placeholder="4ABC..."
                className="flex-1 bg-navy-900 border border-ocean-light rounded-lg px-4 py-2 text-white text-sm font-mono"
                disabled={isMining}
              />
              <button
                onClick={() => primaryAddress && setMiningAddress(primaryAddress)}
                disabled={isMining}
                className="px-4 py-2 bg-gold hover:bg-gold-light text-navy-950 rounded-lg disabled:opacity-50"
              >
                Use Primary
              </button>
            </div>
          </div>

          {/* Thread Count */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Pirates (Mining Threads): {threads}
            </label>
            <input
              type="range"
              min="1"
              max={maxThreads}
              value={threads}
              onChange={(e) => setThreads(parseInt(e.target.value))}
              disabled={isMining}
              className="w-full h-2 bg-navy-900 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>Available: {maxThreads} CPU threads</span>
              <span>{maxThreads}</span>
            </div>
          </div>

          {/* Background Mining */}
          <div className="space-y-3 pt-4 border-t border-ocean-light">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={backgroundMiningEnabled}
                onChange={(e) => setBackgroundMining(e.target.checked)}
                disabled={isMining}
                className="w-4 h-4 rounded border-ocean-light"
              />
              <span className="text-sm font-medium text-gray-300">
                Enable Background Mining
              </span>
            </label>

            {backgroundMiningEnabled && (
              <div className="space-y-3 pl-6">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Start when idle for (minutes): {idleThreshold}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={idleThreshold}
                    onChange={(e) => setIdleThreshold(parseInt(e.target.value))}
                    disabled={isMining}
                    className="w-full h-1 bg-navy-900 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Minimum idle time (seconds): {minIdleSeconds}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={minIdleSeconds}
                    onChange={(e) => setMinIdleSeconds(parseInt(e.target.value))}
                    disabled={isMining}
                    className="w-full h-1 bg-navy-900 rounded"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ignoreBattery}
                    onChange={(e) => setIgnoreBattery(e.target.checked)}
                    disabled={isMining}
                    className="w-4 h-4 rounded border-ocean-light"
                  />
                  <span className="text-xs text-gray-300">
                    Ignore battery status (mine on battery)
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-3 pt-2">
            {!isMining ? (
              <button
                onClick={handleStartMining}
                disabled={loading || !miningAddress}
                className="flex-1 px-6 py-3 bg-treasure hover:bg-treasure-light text-white font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                🏴‍☠️ Start Mining
              </button>
            ) : (
              <button
                onClick={handleStopMining}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Square className="w-5 h-5" />
                ⚓ Stop Mining
              </button>
            )}
          </div>
        </div>

        {/* Statistics & Info */}
        <div className="space-y-6">
          {/* Network Statistics */}
          <div className="bg-ocean rounded-xl p-6 border border-ocean-light">
            <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              Network Statistics
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Network Difficulty</span>
                <span className="text-sm font-semibold text-white">
                  {(difficulty / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Block Reward</span>
                <span className="text-sm font-semibold text-gold">{blockReward.toFixed(2)} PBT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Block Time</span>
                <span className="text-sm font-semibold text-white">60 seconds</span>
              </div>
              {estimatedTimeToBlock && (
                <div className="flex justify-between items-center pt-3 border-t border-ocean-light">
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Est. Time to Block
                  </span>
                  <span className="text-sm font-semibold text-treasure">
                    {formatTime(estimatedTimeToBlock)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mining History */}
          <div className="bg-ocean rounded-xl p-6 border border-ocean-light">
            <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              Mining History
            </h3>
            
            {stats.totalBlocksFound > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Blocks Found</span>
                  <span className="text-lg font-bold text-treasure">{stats.totalBlocksFound}</span>
                </div>
                {stats.lastBlockFound && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Last Block</span>
                    <span className="text-sm text-white">
                      {formatDistanceToNow(stats.lastBlockFound, { addSuffix: true })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Hashes</span>
                  <span className="text-sm text-white">
                    {(stats.totalHashesComputed / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <div className="text-3xl mb-2">🏴‍☠️</div>
                <p className="text-sm">No blocks found yet</p>
                <p className="text-xs mt-1">Keep mining for treasure!</p>
              </div>
            )}
          </div>

          {/* Algorithm Info */}
          {algorithmInfo && (
            <div className="bg-ocean rounded-xl p-6 border border-ocean-light">
              <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-gold" />
                {algorithmInfo.algorithm_name}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Phase 1:</span>
                  <span className="text-white ml-2">{algorithmInfo.phase1_algorithm}</span>
                </div>
                <div className="pl-4 text-xs text-gray-400">
                  • {algorithmInfo.phase1_edgebits} edgebits
                  <br />
                  • {algorithmInfo.phase1_cycle_length}-cycle proof
                </div>
                <div>
                  <span className="text-gray-400">Phase 2:</span>
                  <span className="text-white ml-2">{algorithmInfo.phase2_algorithm}</span>
                </div>
                <div className="pt-2 border-t border-ocean-light">
                  <span className="text-gray-400">Memory:</span>
                  <span className="text-white ml-2">
                    ~{(algorithmInfo.memory_requirement / 1024 / 1024).toFixed(0)} MB
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-treasure">✓</span>
                  <span className="text-sm text-gray-300">ASIC Resistant</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
