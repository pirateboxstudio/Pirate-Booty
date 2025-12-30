// 🏴‍☠️ Daemon RPC Client
// Handles communication with piratebootyd

const axios = require('axios');
const logger = require('../utils/logger');

class DaemonRPC {
  constructor(host = '127.0.0.1', port = 19081) {
    this.baseURL = `http://${host}:${port}`;
    this.jsonRpcURL = `${this.baseURL}/json_rpc`;
    this.httpURL = this.baseURL;
  }

  // JSON-RPC call
  async jsonRpcCall(method, params = {}) {
    try {
      const response = await axios.post(this.jsonRpcURL, {
        jsonrpc: '2.0',
        id: '0',
        method,
        params
      });
      
      if (response.data.error) {
        throw new Error(response.data.error.message);
      }
      
      return response.data.result;
    } catch (error) {
      logger.error(`RPC call failed (${method}):`, error.message);
      throw error;
    }
  }

  // HTTP RPC call
  async httpRpcCall(endpoint, data = {}) {
    try {
      const response = await axios.post(`${this.httpURL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      logger.error(`HTTP RPC failed (${endpoint}):`, error.message);
      throw error;
    }
  }

  // Get daemon info
  async getInfo() {
    return await this.jsonRpcCall('get_info');
  }

  // Get block count
  async getBlockCount() {
    const result = await this.jsonRpcCall('get_block_count');
    return result.count;
  }

  // Get block by height
  async getBlockByHeight(height) {
    const result = await this.jsonRpcCall('get_block', {
      height: height
    });
    return {
      ...result.block_header,
      hash: result.block_header.hash,
      json: JSON.parse(result.json)
    };
  }

  // Get block by hash
  async getBlockByHash(hash) {
    const result = await this.jsonRpcCall('get_block', {
      hash: hash
    });
    return {
      ...result.block_header,
      hash: result.block_header.hash,
      json: JSON.parse(result.json)
    };
  }

  // Get last block header
  async getLastBlockHeader() {
    const result = await this.jsonRpcCall('get_last_block_header');
    return result.block_header;
  }

  // Get block headers range
  async getBlockHeadersRange(start_height, end_height) {
    const result = await this.jsonRpcCall('get_block_headers_range', {
      start_height,
      end_height
    });
    return result.headers;
  }

  // Get transaction pool
  async getTransactionPool() {
    const result = await this.httpRpcCall('/get_transaction_pool');
    return result.transactions || [];
  }

  // Get transactions
  async getTransactions(txHashes) {
    const result = await this.httpRpcCall('/get_transactions', {
      txs_hashes: txHashes,
      decode_as_json: true
    });
    return result.txs || [];
  }

  // Mining status
  async getMiningStatus() {
    return await this.httpRpcCall('/mining_status');
  }

  // Get Pirate Hash info
  async getPirateHashInfo() {
    return await this.httpRpcCall('/get_pirate_hash_info');
  }

  // Get network stats
  async getNetworkStats() {
    return await this.httpRpcCall('/get_net_stats');
  }

  // Get connections
  async getConnections() {
    const result = await this.jsonRpcCall('get_connections');
    return result.connections || [];
  }

  // Get fee estimate
  async getFeeEstimate() {
    const result = await this.jsonRpcCall('get_fee_estimate');
    return result;
  }

  // Get alternate chains
  async getAlternateChains() {
    const result = await this.jsonRpcCall('get_alternate_chains');
    return result.chains || [];
  }

  // Get output histogram
  async getOutputHistogram(amounts = [], min_count = 0, max_count = 0) {
    const result = await this.jsonRpcCall('get_output_histogram', {
      amounts,
      min_count,
      max_count,
      unlocked: true
    });
    return result.histogram || [];
  }

  // Get coinbase transaction sum
  async getCoinbaseTxSum(height, count) {
    const result = await this.jsonRpcCall('get_coinbase_tx_sum', {
      height,
      count
    });
    return result;
  }

  // Health check
  async healthCheck() {
    try {
      await this.getInfo();
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = DaemonRPC;
