# 🏴‍☠️ Pirate Booty Deployment Guide

Complete guide for deploying Pirate Booty cryptocurrency infrastructure.

## Quick Start Summary

### 1. Testnet Deployment ✅
```bash
# Start testnet with mining
cd scripts
./start-testnet.sh

# Check testnet status
./testnet-status.sh

# Stop testnet
./stop-testnet.sh
```

### 2. Wallet Usage ✅
```bash
# CLI Wallet (with pirate branding)
./piratebooty-wallet-cli --testnet

# Wallet RPC Server
./piratebooty-wallet-rpc --testnet --daemon-address localhost:29081
```

### 3. Block Explorer ✅
```bash
# Start explorer (API + Frontend + Redis)
cd explorer
docker-compose up -d

# Access explorer
# Frontend: http://localhost:3001
# API: http://localhost:3000
```

---

## 🏴‍☠️ Part 1: Testnet Deployment

### Architecture

```
┌─────────────────────────────────────────┐
│   Testnet Node (piratebootyd)           │
│   Ports: 29080 (P2P), 29081 (RPC)      │
└──────────────┬──────────────────────────┘
               │
               ├──> Mining Node
               │    (Auto-mines blocks)
               │
               └──> Wallet RPC Server
                    (Port: 29083)
```

### Files Created

**Docker Compose:**
- `docker-compose.testnet.yml` - Complete testnet environment

**Scripts:**
- `scripts/start-testnet.sh` - Launch testnet
- `scripts/stop-testnet.sh` - Stop testnet
- `scripts/testnet-status.sh` - Check testnet health

**Configuration:**
- `testnet-config/seed-nodes.txt` - Bootstrap nodes
- `.env.testnet` - Environment variables (auto-generated)

### Services Included

1. **piratebooty-testnet** - Main daemon
   - Synchronized blockchain
   - P2P networking
   - RPC server
   
2. **piratebooty-testnet-miner** - Mining node
   - Auto-creates wallet
   - Mines blocks continuously
   - Configurable threads

3. **piratebooty-testnet-wallet-rpc** - Wallet RPC
   - HTTP JSON-RPC interface
   - Transaction management
   - Balance queries

### Usage

```bash
# Start all testnet services
./scripts/start-testnet.sh

# View logs
docker-compose -f docker-compose.testnet.yml logs -f piratebooty-testnet

# Check mining status
curl -X POST http://localhost:29081/mining_status | jq

# Get network info
curl -X POST http://localhost:29081/json_rpc -d '{
  "jsonrpc":"2.0",
  "id":"0",
  "method":"get_info"
}' | jq

# Get wallet balance
curl -X POST http://localhost:29083/json_rpc -d '{
  "jsonrpc":"2.0",
  "id":"0",
  "method":"get_balance"
}' | jq

# Stop testnet
./scripts/stop-testnet.sh

# Reset testnet (delete all data)
docker-compose -f docker-compose.testnet.yml down -v
```

### Configuration

Edit `.env.testnet` to customize:
```env
# Mining threads (default: 2)
MINING_THREADS=4

# Wallet passwords
TESTNET_WALLET_PASSWORD=your_secure_password
TESTNET_WALLET_RPC_PASSWORD=rpc_secure_password
```

---

## 🏴‍☠️ Part 2: Wallet Implementation

### CLI Wallet Customization ✅

**Pirate-Themed Messages:**
- Welcome message: "🏴‍☠️ Welcome to Pirate Booty..."
- Version display: "🏴‍☠️ Pirate Booty 'Black Pearl' (v1.0.0.0)"
- Prompts: References to "treasure chests" and "pirates"

**Modified Files:**
- `src/simplewallet/simplewallet.cpp`
  - Updated welcome message
  - Customized version display
  - Pirate-themed prompts

**Usage:**
```bash
# Create new wallet
./piratebooty-wallet-cli --generate-new-wallet mywallet

# Restore from seed
./piratebooty-wallet-cli --restore-deterministic-wallet mywallet

# Connect to testnet
./piratebooty-wallet-cli --testnet --daemon-address localhost:29081

# Commands (in wallet)
> welcome          # Show pirate-themed welcome
> balance          # Show your treasure
> address          # Show your treasure chest address
> transfer <addr> <amount>  # Send booty
```

### Wallet RPC Server ✅

**Already configured in testnet:**
- Port: 29083
- Auto-creates wallet on first run
- JSON-RPC 2.0 interface

**Endpoints:**
```bash
# Get balance
curl -X POST http://localhost:29083/json_rpc -d '{
  "jsonrpc":"2.0",
  "id":"0",
  "method":"get_balance"
}'

# Get address
curl -X POST http://localhost:29083/json_rpc -d '{
  "jsonrpc":"2.0",
  "id":"0",
  "method":"get_address"
}'

# Create subaddress
curl -X POST http://localhost:29083/json_rpc -d '{
  "jsonrpc":"2.0",
  "id":"0",
  "method":"create_address",
  "params":{"account_index":0,"label":"My Subaddress"}
}'

# Transfer PBT
curl -X POST http://localhost:29083/json_rpc -d '{
  "jsonrpc":"2.0",
  "id":"0",
  "method":"transfer",
  "params":{
    "destinations":[{"amount":1000000000000,"address":"4ABC..."}],
    "priority":1,
    "mixin":10
  }
}'
```

### GUI Wallet Specification ✅

**Complete specifications in:** `docs/GUI_WALLET_SPECS.md`

**Key Features:**
- Pirate-themed dark UI
- Dashboard with balance
- Send/Receive screens
- Transaction history
- Built-in mining interface
- Address book management
- Settings and backups

**Technology Options:**
- **Electron** (recommended): React + TypeScript + Tailwind
- **Native**: Qt (C++) for all platforms

**Design Colors:**
- Primary: Deep navy blue (#0A1929)
- Accent: Pirate gold (#FFB300)
- Success: Treasure green (#4CAF50)

---

## 🏴‍☠️ Part 3: Block Explorer

### Architecture

```
┌────────────────────────────────────────┐
│   Frontend (Next.js + React)          │
│   Port: 3001                           │
└──────────────┬─────────────────────────┘
               │ HTTP/WebSocket
┌──────────────▼─────────────────────────┐
│   Explorer API (Node.js + Express)    │
│   Port: 3000                           │
│   - REST API endpoints                 │
│   - WebSocket for live updates         │
│   - Redis caching                      │
└──────────────┬─────────────────────────┘
               │ JSON-RPC
┌──────────────▼─────────────────────────┐
│   piratebootyd (Daemon)                │
│   Port: 19081 (mainnet)               │
│   Port: 29081 (testnet)               │
└────────────────────────────────────────┘
```

### Files Created

**Backend (API Server):**
- `explorer/backend/src/index.js` - Main server
- `explorer/backend/src/services/daemonRPC.js` - Daemon client
- `explorer/backend/src/services/cache.js` - Redis cache
- `explorer/backend/src/routes/blocks.js` - Block endpoints
- `explorer/backend/src/routes/network.js` - Network endpoints
- `explorer/backend/src/utils/logger.js` - Logging utility
- `explorer/backend/package.json` - Dependencies

**Frontend:**
- `explorer/frontend/package.json` - Next.js app dependencies

**Deployment:**
- `explorer/docker-compose.yml` - Complete stack deployment
- `explorer/README.md` - Explorer documentation

### API Endpoints

**Blocks:**
```
GET  /api/blocks                - List recent blocks
GET  /api/blocks/:identifier    - Get block by height/hash
GET  /api/blocks/latest/info    - Get latest block
```

**Network:**
```
GET  /api/network/info          - Network statistics
GET  /api/network/mining        - Mining status
GET  /api/network/stats         - 24h statistics
```

**Transactions:**
```
GET  /api/transactions/:hash    - Get transaction details
GET  /api/transactions/mempool  - View mempool
```

**Search:**
```
GET  /api/search?q=<query>      - Search by block/tx/height
```

### Features Implemented

**Backend API:**
- ✅ Block browsing with pagination
- ✅ Transaction details (privacy-preserving)
- ✅ Network statistics
- ✅ Mining information
- ✅ Pirate Hash algorithm info
- ✅ Real-time updates via WebSocket
- ✅ Redis caching for performance
- ✅ Rate limiting
- ✅ Health checks

**Privacy Features:**
- 🔒 No address tracking
- 🔒 No transaction linking
- 🔒 Ring signature preservation
- 🔒 No analytics/tracking

### Usage

```bash
# Start explorer stack
cd explorer
docker-compose up -d

# Check API health
curl http://localhost:3000/health

# Get recent blocks
curl http://localhost:3000/api/blocks?page=1&limit=20 | jq

# Get specific block
curl http://localhost:3000/api/blocks/12345 | jq

# Get network info
curl http://localhost:3000/api/network/info | jq

# Get Pirate Hash info
curl http://localhost:3000/api/network/info | jq '.algorithm_details'

# View logs
docker-compose logs -f api

# Stop explorer
docker-compose down
```

### Frontend Features (Specifications)

**Pages:**
1. **Home** - Network stats, recent blocks
2. **Blocks** - Block browser with search
3. **Block Detail** - Full block information
4. **Network** - Charts and statistics
5. **Search** - Universal search

**Live Updates:**
- New blocks appear automatically
- Mempool updates in real-time
- Network stats refresh

---

## 🏴‍☠️ Production Deployment

### Prerequisites

1. **Server Requirements:**
   - 4+ CPU cores
   - 8+ GB RAM
   - 100+ GB SSD storage
   - Ubuntu 22.04 LTS (recommended)

2. **Software:**
   - Docker & Docker Compose
   - Nginx (for reverse proxy)
   - SSL certificates (Let's Encrypt)

### Mainnet Deployment

```bash
# 1. Build Pirate Booty daemon
docker build -t piratebooty:latest .

# 2. Start mainnet daemon
docker run -d \
  --name piratebooty-mainnet \
  -p 19080:19080 \
  -p 19081:19081 \
  -v piratebooty-blockchain:/home/pirate/.piratebooty \
  piratebooty:latest \
  piratebootyd \
    --data-dir /home/pirate/.piratebooty \
    --p2p-bind-port 19080 \
    --rpc-bind-ip 0.0.0.0 \
    --rpc-bind-port 19081 \
    --confirm-external-bind \
    --restricted-rpc

# 3. Start block explorer
cd explorer
docker-compose up -d

# 4. Configure Nginx reverse proxy
# See nginx/nginx.conf for configuration
```

### Security Checklist

- [ ] Use `--restricted-rpc` for public RPC
- [ ] Set up `--rpc-login` credentials
- [ ] Enable SSL/TLS for RPC
- [ ] Configure firewall (UFW)
- [ ] Regular backups of blockchain data
- [ ] Monitor disk space
- [ ] Set up log rotation
- [ ] Use rate limiting on API
- [ ] Enable CORS restrictions
- [ ] Regular security updates

### Monitoring

```bash
# Daemon status
curl -X POST http://localhost:19081/json_rpc -d '{
  "jsonrpc":"2.0",
  "id":"0",
  "method":"get_info"
}' | jq '.result.height'

# Check sync status
watch -n 5 'curl -s -X POST http://localhost:19081/json_rpc -d "{\"jsonrpc\":\"2.0\",\"id\":\"0\",\"method\":\"get_info\"}" | jq ".result.height"'

# Explorer API health
curl http://localhost:3000/health

# Redis status
docker exec piratebooty-explorer-redis redis-cli ping
```

---

## 🏴‍☠️ Maintenance

### Backup Blockchain Data

```bash
# Stop daemon
docker stop piratebooty-mainnet

# Backup blockchain
tar -czf piratebooty-blockchain-$(date +%Y%m%d).tar.gz \
  /var/lib/docker/volumes/piratebooty-blockchain/_data/

# Restart daemon
docker start piratebooty-mainnet
```

### Update Software

```bash
# Pull latest code
git pull origin main

# Rebuild Docker image
docker build -t piratebooty:latest .

# Stop old container
docker stop piratebooty-mainnet
docker rm piratebooty-mainnet

# Start with new image
docker run -d --name piratebooty-mainnet ...
```

### Log Management

```bash
# View daemon logs
docker logs -f piratebooty-mainnet

# View explorer logs
cd explorer
docker-compose logs -f api

# Rotate logs (add to cron)
find /var/log/piratebooty -name "*.log" -mtime +7 -delete
```

---

## 🏴‍☠️ Troubleshooting

### Testnet Issues

**Problem:** Testnet won't sync
```bash
# Check daemon logs
docker-compose -f docker-compose.testnet.yml logs piratebooty-testnet

# Verify ports are open
netstat -tlnp | grep 29080

# Restart services
docker-compose -f docker-compose.testnet.yml restart
```

**Problem:** Mining not starting
```bash
# Check mining logs
docker-compose -f docker-compose.testnet.yml logs piratebooty-testnet-miner

# Verify wallet was created
docker exec piratebooty-testnet-miner ls -la /home/pirate/.piratebooty/wallet/

# Check daemon connection
curl -X POST http://localhost:29081/get_info
```

### Explorer Issues

**Problem:** API not responding
```bash
# Check API logs
docker-compose logs api

# Verify daemon connection
curl -X POST http://localhost:19081/get_info

# Check Redis
docker exec piratebooty-explorer-redis redis-cli ping

# Restart API
docker-compose restart api
```

**Problem:** Cache not working
```bash
# Clear Redis cache
docker exec piratebooty-explorer-redis redis-cli FLUSHALL

# Check Redis connection
docker exec piratebooty-explorer-api env | grep REDIS_URL
```

---

## 🏴‍☠️ Summary

### What's Been Implemented

✅ **Testnet Deployment**
- Complete Docker compose environment
- Auto-mining testnet node
- Wallet RPC server
- Easy-to-use scripts

✅ **Wallet Implementations**
- CLI wallet with pirate branding
- Wallet RPC fully configured
- Comprehensive GUI wallet specifications

✅ **Block Explorer**
- Complete REST API backend
- Redis caching layer
- WebSocket live updates
- Privacy-preserving design
- Docker deployment ready

### Next Steps

1. **Build GUI Wallet** - Implement Electron app from specs
2. **Deploy Mainnet** - Launch production nodes
3. **Create Mining Pool** - Develop pool software
4. **Mobile Wallets** - iOS/Android apps
5. **Exchange Integration** - List on exchanges

### Resources

- **Documentation**: `docs/` directory
- **RPC Guide**: `docs/RPC_INTEGRATION.md`
- **GUI Specs**: `docs/GUI_WALLET_SPECS.md`
- **Project Rules**: `.memex/context.md`

---

🏴‍☠️ **"The seas belong to the miners! Set sail with Pirate Booty!"** 🏴‍☠️
