// 🏴‍☠️ Block routes
// API endpoints for block data

const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// GET /api/blocks - Get recent blocks
router.get('/', async (req, res) => {
  try {
    const { daemonRPC, cacheService } = req.app.locals;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    
    // Check cache
    const cacheKey = `blocks:page:${page}:limit:${limit}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    // Get current height
    const info = await daemonRPC.getInfo();
    const startHeight = Math.max(0, info.height - ((page - 1) * limit) - 1);
    const endHeight = Math.max(0, startHeight - limit + 1);
    
    // Get block headers
    const headers = await daemonRPC.getBlockHeadersRange(endHeight, startHeight);
    
    const blocks = headers.reverse().map(header => ({
      height: header.height,
      hash: header.hash,
      timestamp: header.timestamp,
      size: header.block_size,
      weight: header.block_weight,
      difficulty: header.difficulty,
      reward: header.reward / 1e12, // Convert to PBT
      transactions: header.num_txes,
      miner_tx_hash: header.miner_tx_hash
    }));
    
    const response = {
      blocks,
      page,
      limit,
      total: info.height,
      total_pages: Math.ceil(info.height / limit)
    };
    
    // Cache for 30 seconds
    await cacheService.set(cacheKey, response, 30);
    
    res.json(response);
  } catch (error) {
    logger.error('Error fetching blocks:', error);
    res.status(500).json({
      error: '⚠️ Failed to fetch blocks',
      message: error.message
    });
  }
});

// GET /api/blocks/:identifier - Get block by height or hash
router.get('/:identifier', async (req, res) => {
  try {
    const { daemonRPC, cacheService } = req.app.locals;
    const { identifier } = req.params;
    
    // Check cache
    const cacheKey = `block:${identifier}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    // Determine if identifier is height or hash
    const isHeight = /^\d+$/.test(identifier);
    let block;
    
    if (isHeight) {
      block = await daemonRPC.getBlockByHeight(parseInt(identifier));
    } else {
      block = await daemonRPC.getBlockByHash(identifier);
    }
    
    // Get transactions
    const txHashes = block.json.tx_hashes || [];
    const transactions = [];
    
    if (txHashes.length > 0) {
      const txs = await daemonRPC.getTransactions(txHashes);
      transactions.push(...txs.map(tx => ({
        hash: tx.tx_hash,
        version: tx.as_json ? JSON.parse(tx.as_json).version : null,
        size: tx.as_json ? JSON.parse(tx.as_json).vin.length : 0
      })));
    }
    
    const response = {
      height: block.height,
      hash: block.hash,
      timestamp: block.timestamp,
      size: block.block_size,
      weight: block.block_weight,
      difficulty: block.difficulty,
      reward: block.reward / 1e12,
      transactions: transactions.length,
      tx_hashes: txHashes,
      tx_details: transactions,
      miner_tx_hash: block.json.miner_tx.hash || null,
      nonce: block.nonce,
      prev_hash: block.prev_hash,
      major_version: block.major_version,
      minor_version: block.minor_version,
      pow_algorithm: block.major_version >= 13 ? 'Pirate Hash' : 'Legacy'
    };
    
    // Cache for 5 minutes
    await cacheService.set(cacheKey, response, 300);
    
    res.json(response);
  } catch (error) {
    logger.error('Error fetching block:', error);
    res.status(404).json({
      error: '⚠️ Block not found',
      message: error.message
    });
  }
});

// GET /api/blocks/latest - Get latest block
router.get('/latest/info', async (req, res) => {
  try {
    const { daemonRPC } = req.app.locals;
    
    const header = await daemonRPC.getLastBlockHeader();
    
    res.json({
      height: header.height,
      hash: header.hash,
      timestamp: header.timestamp,
      size: header.block_size,
      weight: header.block_weight,
      difficulty: header.difficulty,
      reward: header.reward / 1e12,
      transactions: header.num_txes
    });
  } catch (error) {
    logger.error('Error fetching latest block:', error);
    res.status(500).json({
      error: '⚠️ Failed to fetch latest block',
      message: error.message
    });
  }
});

module.exports = router;
