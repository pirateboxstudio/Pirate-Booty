// 🏴‍☠️ Daemon RPC Client for Mining Control
import axios, { AxiosInstance } from 'axios'

export interface DaemonInfo {
  height: number
  difficulty: number
  target: number
  tx_count: number
  tx_pool_size: number
  alt_blocks_count: number
  outgoing_connections_count: number
  incoming_connections_count: number
  white_peerlist_size: number
  grey_peerlist_size: number
  mainnet: boolean
  testnet: boolean
  stagenet: boolean
  nettype: string
  top_block_hash: string
  cumulative_difficulty: number
  block_size_limit: number
  block_weight_limit: number
  block_size_median: number
  block_weight_median: number
  database_size: number
  version: string
}

export interface MiningStatus {
  active: boolean
  speed: number
  threads_count: number
  address: string
  pow_algorithm: string
  is_background_mining_enabled: boolean
  bg_idle_threshold: number
  bg_min_idle_seconds: number
  bg_ignore_battery: boolean
  bg_target: number
  block_target: number
  block_reward: number
  difficulty: number
  wide_difficulty: string
  difficulty_top64: number
}

export interface PirateHashInfo {
  algorithm_name: string
  description: string
  phase1_algorithm: string
  phase1_edgebits: number
  phase1_cycle_length: number
  phase2_algorithm: string
  memory_requirement: number
  asic_resistant: boolean
}

class DaemonRpcClient {
  private client: AxiosInstance
  private rpcUrl: string
  private httpUrl: string

  constructor(host: string = '127.0.0.1', port: number = 18081) {
    this.rpcUrl = `http://${host}:${port}/json_rpc`
    this.httpUrl = `http://${host}:${port}`
    this.client = axios.create({
      timeout: 30000,
    })
  }

  private async jsonRpcCall(method: string, params: any = {}) {
    try {
      const response = await this.client.post(this.rpcUrl, {
        jsonrpc: '2.0',
        id: '0',
        method,
        params,
      })

      if (response.data.error) {
        throw new Error(response.data.error.message)
      }

      return response.data.result
    } catch (error: any) {
      console.error(`Daemon RPC call failed (${method}):`, error.message)
      throw error
    }
  }

  private async httpRpcCall(endpoint: string, data: any = {}) {
    try {
      const response = await this.client.post(`${this.httpUrl}${endpoint}`, data)
      return response.data
    } catch (error: any) {
      console.error(`Daemon HTTP call failed (${endpoint}):`, error.message)
      throw error
    }
  }

  // Get daemon info
  async getInfo(): Promise<DaemonInfo> {
    return await this.jsonRpcCall('get_info')
  }

  // Get mining status
  async getMiningStatus(): Promise<MiningStatus> {
    return await this.httpRpcCall('/mining_status')
  }

  // Start mining
  async startMining(
    minerAddress: string,
    threadsCount: number,
    doBackgroundMining: boolean = false,
    ignoreBattery: boolean = false
  ): Promise<{ status: string }> {
    return await this.httpRpcCall('/start_mining', {
      miner_address: minerAddress,
      threads_count: threadsCount,
      do_background_mining: doBackgroundMining,
      ignore_battery: ignoreBattery,
    })
  }

  // Stop mining
  async stopMining(): Promise<{ status: string }> {
    return await this.httpRpcCall('/stop_mining')
  }

  // Get Pirate Hash info
  async getPirateHashInfo(): Promise<PirateHashInfo> {
    return await this.httpRpcCall('/get_pirate_hash_info')
  }

  // Get block count
  async getBlockCount(): Promise<number> {
    const result = await this.jsonRpcCall('get_block_count')
    return result.count
  }

  // Get last block header
  async getLastBlockHeader(): Promise<any> {
    const result = await this.jsonRpcCall('get_last_block_header')
    return result.block_header
  }

  // Get coinbase transaction sum
  async getCoinbaseTxSum(height: number, count: number): Promise<any> {
    return await this.jsonRpcCall('get_coinbase_tx_sum', { height, count })
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.getInfo()
      return true
    } catch {
      return false
    }
  }
}

export default DaemonRpcClient
