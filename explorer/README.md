# 🏴‍☠️ Pirate Booty Block Explorer

A privacy-preserving block explorer for the Pirate Booty blockchain.

## Architecture

```
┌─────────────────────────────────────────┐
│      Frontend (React/Next.js)           │
│      - Block list                       │
│      - Transaction viewer               │
│      - Network stats                    │
│      - Search functionality             │
└──────────────┬──────────────────────────┘
               │
               │ HTTP/REST API
               │
┌──────────────▼──────────────────────────┐
│      Explorer API Server (Node.js)      │
│      - Express.js REST API              │
│      - WebSocket for live updates       │
│      - Redis cache layer                │
└──────────────┬──────────────────────────┘
               │
               │ JSON-RPC
               │
┌──────────────▼──────────────────────────┐
│      piratebootyd (Daemon RPC)          │
│      - Blockchain data                  │
│      - Network information              │
└──────────────┬──────────────────────────┘
               │
               │
┌──────────────▼──────────────────────────┐
│      PostgreSQL Database (Optional)     │
│      - Indexed transactions             │
│      - Block cache                      │
│      - Search optimization              │
└─────────────────────────────────────────┘
```

## Features

### Core Functionality
- ✅ Block browser with pagination
- ✅ Transaction details (privacy-preserving)
- ✅ Network statistics and charts
- ✅ Search by block height/hash
- ✅ Real-time updates via WebSocket
- ✅ Mining statistics
- ✅ Mempool viewer

### Privacy Features
- 🔒 No address tracking
- 🔒 No transaction linking
- 🔒 Ring signature preservation
- 🔒 Stealth address respect
- 🔒 No analytics or tracking
- 🔒 Optional Tor access

### Network Statistics
- Current block height
- Network hash rate
- Difficulty
- Block time (average)
- Transaction count
- Mempool size
- Active miners estimate

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **WebSocket**: Socket.io
- **Cache**: Redis
- **Database**: PostgreSQL (optional)
- **RPC Client**: Custom daemon RPC client

### Frontend
- **Framework**: Next.js 14+
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State**: Zustand
- **API Client**: Axios

## Getting Started

See individual directories:
- `backend/` - API server
- `frontend/` - React frontend
- `docker/` - Docker deployment

## License

MIT License - See LICENSE file
