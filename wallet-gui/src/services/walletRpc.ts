// 🏴‍☠️ Wallet RPC Client
import axios, { AxiosInstance } from 'axios'

export interface WalletBalance {
  balance: number
  unlocked_balance: number
}

export interface WalletAddress {
  address: string
  label?: string
  address_index: number
  used: boolean
}

export interface Transfer {
  address: string
  amount: number
}

export interface TransferResult {
  tx_hash: string
  tx_key: string
  amount: number
  fee: number
}

export interface Transaction {
  txid: string
  payment_id: string
  height: number
  timestamp: number
  amount: number
  fee: number
  type: 'in' | 'out' | 'pending'
  unlock_time: number
  address?: string
  note?: string
}

class WalletRpcClient {
  private client: AxiosInstance
  private rpcUrl: string

  constructor(host: string = '127.0.0.1', port: number = 18083) {
    this.rpcUrl = `http://${host}:${port}/json_rpc`
    this.client = axios.create({
      baseURL: this.rpcUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    })
  }

  private async call(method: string, params: any = {}) {
    try {
      const response = await this.client.post('', {
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
      console.error(`RPC call failed (${method}):`, error.message)
      throw error
    }
  }

  // Get wallet balance
  async getBalance(accountIndex: number = 0): Promise<WalletBalance> {
    const result = await this.call('get_balance', { account_index: accountIndex })
    return {
      balance: result.balance / 1e12, // Convert from atomic units
      unlocked_balance: result.unlocked_balance / 1e12,
    }
  }

  // Get primary address
  async getAddress(accountIndex: number = 0): Promise<string> {
    const result = await this.call('get_address', { account_index: accountIndex })
    return result.address
  }

  // Get all addresses
  async getAddresses(accountIndex: number = 0): Promise<WalletAddress[]> {
    const result = await this.call('get_address', { account_index: accountIndex })
    return result.addresses.map((addr: any) => ({
      address: addr.address,
      label: addr.label,
      address_index: addr.address_index,
      used: addr.used,
    }))
  }

  // Create new subaddress
  async createAddress(accountIndex: number = 0, label?: string): Promise<WalletAddress> {
    const result = await this.call('create_address', {
      account_index: accountIndex,
      label,
    })
    return {
      address: result.address,
      address_index: result.address_index,
      label,
      used: false,
    }
  }

  // Label address
  async labelAddress(index: number, label: string, accountIndex: number = 0): Promise<void> {
    await this.call('label_address', {
      index: { major: accountIndex, minor: index },
      label,
    })
  }

  // Transfer PBT
  async transfer(
    destinations: Transfer[],
    priority: number = 1,
    mixin: number = 10,
    getTxKey: boolean = true
  ): Promise<TransferResult> {
    const result = await this.call('transfer', {
      destinations: destinations.map(d => ({
        address: d.address,
        amount: Math.floor(d.amount * 1e12), // Convert to atomic units
      })),
      priority,
      mixin,
      get_tx_key: getTxKey,
    })

    return {
      tx_hash: result.tx_hash,
      tx_key: result.tx_key,
      amount: result.amount / 1e12,
      fee: result.fee / 1e12,
    }
  }

  // Get transaction history
  async getTransfers(
    type: 'in' | 'out' | 'pending' | 'all' = 'all',
    accountIndex: number = 0,
    minHeight?: number,
    maxHeight?: number
  ): Promise<Transaction[]> {
    const params: any = {
      account_index: accountIndex,
      filter_by_height: minHeight !== undefined,
    }

    if (minHeight !== undefined) {
      params.min_height = minHeight
      params.max_height = maxHeight || 999999999
    }

    const result = await this.call('get_transfers', params)
    const transactions: Transaction[] = []

    // Process incoming transactions
    if (result.in) {
      transactions.push(...result.in.map((tx: any) => ({
        txid: tx.txid,
        payment_id: tx.payment_id,
        height: tx.height,
        timestamp: tx.timestamp,
        amount: tx.amount / 1e12,
        fee: tx.fee / 1e12,
        type: 'in' as const,
        unlock_time: tx.unlock_time,
        address: tx.address,
        note: tx.note,
      })))
    }

    // Process outgoing transactions
    if (result.out) {
      transactions.push(...result.out.map((tx: any) => ({
        txid: tx.txid,
        payment_id: tx.payment_id,
        height: tx.height,
        timestamp: tx.timestamp,
        amount: tx.amount / 1e12,
        fee: tx.fee / 1e12,
        type: 'out' as const,
        unlock_time: tx.unlock_time,
        address: tx.address,
        note: tx.note,
      })))
    }

    // Process pending transactions
    if (result.pending) {
      transactions.push(...result.pending.map((tx: any) => ({
        txid: tx.txid,
        payment_id: tx.payment_id,
        height: 0,
        timestamp: tx.timestamp,
        amount: tx.amount / 1e12,
        fee: tx.fee / 1e12,
        type: 'pending' as const,
        unlock_time: tx.unlock_time,
        address: tx.address,
        note: tx.note,
      })))
    }

    return transactions.sort((a, b) => b.timestamp - a.timestamp)
  }

  // Get wallet height
  async getHeight(): Promise<number> {
    const result = await this.call('get_height')
    return result.height
  }

  // Refresh wallet
  async refresh(): Promise<void> {
    await this.call('refresh')
  }

  // Set transaction note
  async setTxNote(txid: string, note: string): Promise<void> {
    await this.call('set_tx_notes', {
      txids: [txid],
      notes: [note],
    })
  }

  // Get transaction note
  async getTxNote(txid: string): Promise<string> {
    const result = await this.call('get_tx_notes', {
      txids: [txid],
    })
    return result.notes[0] || ''
  }

  // Make integrated address
  async makeIntegratedAddress(paymentId?: string): Promise<{ integrated_address: string; payment_id: string }> {
    const result = await this.call('make_integrated_address', {
      payment_id: paymentId,
    })
    return {
      integrated_address: result.integrated_address,
      payment_id: result.payment_id,
    }
  }

  // Split integrated address
  async splitIntegratedAddress(integratedAddress: string): Promise<{ address: string; payment_id: string }> {
    const result = await this.call('split_integrated_address', {
      integrated_address: integratedAddress,
    })
    return {
      address: result.standard_address,
      payment_id: result.payment_id,
    }
  }

  // Validate address
  async validateAddress(address: string): Promise<boolean> {
    try {
      const result = await this.call('validate_address', { address })
      return result.valid
    } catch {
      return false
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.getHeight()
      return true
    } catch {
      return false
    }
  }
}

export default WalletRpcClient
