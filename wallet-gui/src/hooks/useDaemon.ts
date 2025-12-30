// 🏴‍☠️ Daemon Connection Hook
import { useEffect } from 'react'
import { useNetworkStore } from '../store/walletStore'
import { useMiningStore } from '../store/miningStore'
import DaemonRpcClient from '../services/daemonRpc'

export function useDaemon() {
  const { setConnected, updateNetworkInfo } = useNetworkStore()
  const { daemonClient } = useMiningStore()

  useEffect(() => {
    if (!daemonClient) return

    const checkConnection = async () => {
      try {
        const isHealthy = await daemonClient.healthCheck()
        setConnected(isHealthy)

        if (isHealthy) {
          const info = await daemonClient.getInfo()
          updateNetworkInfo({
            height: info.height,
            difficulty: info.difficulty,
            hashRate: info.difficulty / info.target,
            connections: info.outgoing_connections_count + info.incoming_connections_count,
          })
        }
      } catch (error) {
        console.error('Daemon connection check failed:', error)
        setConnected(false)
      }
    }

    // Initial check
    checkConnection()

    // Poll every 10 seconds
    const interval = setInterval(checkConnection, 10000)
    return () => clearInterval(interval)
  }, [daemonClient, setConnected, updateNetworkInfo])
}
