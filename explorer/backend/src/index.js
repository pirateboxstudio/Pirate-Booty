// 🏴‍☠️ Pirate Booty Block Explorer API
// Main entry point

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');

const logger = require('./utils/logger');
const DaemonRPC = require('./services/daemonRPC');
const CacheService = require('./services/cache');

// Import routes
const blockRoutes = require('./routes/blocks');
const transactionRoutes = require('./routes/transactions');
const networkRoutes = require('./routes/network');
const searchRoutes = require('./routes/search');
const statsRoutes = require('./routes/stats');

// Initialize Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

// Configuration
const PORT = process.env.PORT || 3000;
const DAEMON_HOST = process.env.DAEMON_HOST || '127.0.0.1';
const DAEMON_PORT = process.env.DAEMON_PORT || 19081;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: '⚠️ Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Initialize services
const daemonRPC = new DaemonRPC(DAEMON_HOST, DAEMON_PORT);
const cacheService = new CacheService();

// Make services available to routes
app.locals.daemonRPC = daemonRPC;
app.locals.cacheService = cacheService;
app.locals.io = io;

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'piratebooty-explorer-api',
    version: '1.0.0',
    pirate: '🏴‍☠️'
  });
});

// API Routes
app.use('/api/blocks', blockRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/stats', statsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: '⚠️ Lost at sea - endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: '⚠️ Ship encountered rough waters - internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// WebSocket connection handling
io.on('connection', (socket) => {
  logger.info(`⚓ Client connected: ${socket.id}`);
  
  socket.on('subscribe:blocks', () => {
    socket.join('blocks');
    logger.info(`Client ${socket.id} subscribed to blocks`);
  });
  
  socket.on('subscribe:mempool', () => {
    socket.join('mempool');
    logger.info(`Client ${socket.id} subscribed to mempool`);
  });
  
  socket.on('disconnect', () => {
    logger.info(`⚓ Client disconnected: ${socket.id}`);
  });
});

// Start block monitoring
const startBlockMonitoring = async () => {
  let lastHeight = 0;
  
  setInterval(async () => {
    try {
      const info = await daemonRPC.getInfo();
      if (info.height > lastHeight) {
        lastHeight = info.height;
        
        // Fetch new block
        const block = await daemonRPC.getBlockByHeight(info.height);
        
        // Emit to subscribed clients
        io.to('blocks').emit('new:block', {
          height: info.height,
          hash: block.hash,
          timestamp: block.timestamp,
          size: block.block_size,
          transactions: block.tx_hashes.length
        });
        
        logger.info(`🏴‍☠️ New block found: ${info.height}`);
      }
    } catch (error) {
      logger.error('Block monitoring error:', error.message);
    }
  }, 10000); // Check every 10 seconds
};

// Start server
const startServer = async () => {
  try {
    // Test daemon connection
    const info = await daemonRPC.getInfo();
    logger.info(`🏴‍☠️ Connected to Pirate Booty daemon`);
    logger.info(`   Network: ${info.mainnet ? 'Mainnet' : info.testnet ? 'Testnet' : 'Stagenet'}`);
    logger.info(`   Height: ${info.height}`);
    logger.info(`   Version: ${info.version}`);
    
    // Initialize cache
    await cacheService.connect();
    logger.info(`✅ Redis cache connected`);
    
    // Start server
    httpServer.listen(PORT, () => {
      logger.info(`🏴‍☠️ Pirate Booty Explorer API running on port ${PORT}`);
      logger.info(`   API: http://localhost:${PORT}/api`);
      logger.info(`   WebSocket: ws://localhost:${PORT}`);
      logger.info(`⚓ The explorer sails the blockchain seas!`);
    });
    
    // Start block monitoring
    startBlockMonitoring();
    
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async () => {
  logger.info('⚓ Shutting down gracefully...');
  
  httpServer.close(() => {
    logger.info('HTTP server closed');
  });
  
  await cacheService.disconnect();
  logger.info('Cache disconnected');
  
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Start the server
startServer();
