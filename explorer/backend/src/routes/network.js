// 🏴‍☠️ Network routes
// API endpoints for network statistics

const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// GET /api/network/info - Get network info
router.get('/info', async (req, res) => {
  try {
    const { daemonRPC, cacheService } = req.app.locals;
    
    // Check cache
    const cacheKey = 'network:info';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    const info = await daemonRPC.getInfo();
    const pirateHashInfo = await daemonRPC.getPirateHashInfo();
    
    const response = {
      height: info.height,
      difficulty: info.difficulty,
      target: info.target,
      hash_rate: info.difficulty / info.target,
      tx_count: info.tx_count,
      tx_pool_size: info.tx_pool_size,
      connections: info.outgoing_connections_count + info.incoming_connections_count,
      white_peerlist_size: info.white_peerlist_size,
      grey_peerlist_size: info.grey_peerlist_size,
      mainnet: info.mainnet,
      testnet: info.testnet,
      stagenet: info.stagenet,
      version: info.version,
      algorithm: pirateHashInfo.algorithm_name,
      algorithm_details: pirateHashInfo
    };
    
    // Cache for 10 seconds
    await cacheService.set(cacheKey, response, 10);
    
    res.json(response);
  } catch (error) {
    logger.error('Error fetching network info:', error);
    res.status(500).json({
      error: '⚠️ Failed to fetch network info',
      message: error.message
    });
  }
});

// GET /api/network/mining - Get mining status
router.get('/mining', async (req, res) => {
  try {
    const { daemonRPC } = req.app.locals;
    
    const status = await daemonRPC.getMiningStatus();
    
    res.json({
      active: status.active,
      speed: status.speed,
      threads_count: status.threads_count,
      pow_algorithm: status.pow_algorithm,
      difficulty: status.difficulty,
      block_reward: status.block_reward / 1e12
    });
  } catch (error) {
    logger.error('Error fetching mining status:', error);
    res.status(500).json({
      error: '⚠️ Failed to fetch mining status',
      message: error.message
    });
  }
});

// GET /api/network/stats - Get network statistics
router.get('/stats', async (req, res) => {
  try {
    const { daemonRPC, cacheService } = req.app.locals;
    
    const cacheKey = 'network:stats';
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    const info = await daemonRPC.getInfo();
    
    // Calculate 24h statistics
    const blocksPerDay = 1440; // 1 block per minute
    const currentHeight = info.height;
    const startHeight = Math.max(0, currentHeight - blocksPerDay);
    
    const headers = await daemonRPC.getBlockHeadersRange(startHeight, currentHeight);
    
    // Calculate averages
    const avgBlockTime = headers.reduce((acc, h, i) => {
      if (i === 0) return acc;
      return acc + (h.timestamp - headers[i - 1].timestamp);
    }, 0) / (headers.length - 1);
    
    const avgDifficulty = headers.reduce((acc, h) => acc + h.difficulty, 0) / headers.length;
    const avgBlockSize = headers.reduce((acc, h) => acc + h.block_size, 0) / headers.length;
    const totalTxs = headers.reduce((acc, h) => acc + h.num_txes, 0);
    
    const response = {
      current_height: currentHeight,
      network_hashrate: info.difficulty / info.target,
      avg_block_time_24h: avgBlockTime,
      avg_difficulty_24h: avgDifficulty,
      avg_block_size_24h: avgBlockSize,
      total_transactions_24h: totalTxs,
      mempool_size: info.tx_pool_size,
      emission_percent: (info.height * 500 / 1021000000) * 100 // Simplified
    };
    
    // Cache for 1 minute
    await cacheService.set(cacheKey, response, 60);
    
    res.json(response);
  } catch (error) {
    logger.error('Error fetching network stats:', error);
    res.status(500).json({
      error: '⚠️ Failed to fetch network stats',
      message: error.message
    });
  }
});

module.exports = router;
