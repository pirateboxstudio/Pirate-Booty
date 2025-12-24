# 🗺️ Pirate Booty Explorer UI Design
## "The Crow's Nest" - Blockchain Explorer

## Design Philosophy
- **Maritime Navigation Theme**
- **Real-time data visualization**
- **Intuitive blockchain exploration**
- **Performance-optimized**
- **Mobile-responsive**

## Color Palette (Same as Wallet)
- **Background:** `#1B1C20` (Deep ocean)
- **Surface:** `#2A2D35` (Ship deck)
- **Primary:** `#FFD700` (Gold)
- **Accent:** `#FF6B35` (Sunset)
- **Success:** `#4CAF50`
- **Info:** `#2196F3`

---

## Main Screens

### 1. Home / Dashboard
```
┌────────────────────────────────────────────────────────────────────┐
│  🏴‍☠️ THE CROW'S NEST                           [Search...]  [⚙️]  │
│  Pirate Booty Blockchain Explorer                                  │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─ NETWORK STATUS ──────────────────────────────────────────┐   │
│  │  🟢 Online                    Height: 1,234,567           │   │
│  │  Difficulty: 12,345,678,901   Hash Rate: 123.45 MH/s     │   │
│  │  Block Time: 58.2s avg        Transactions: 9,876,543    │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ┌─ LIVE BLOCKS ──────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │  📦 #1,234,567  ⛏️  50.0 PBT  💳 12 txs  ⏱️ 2s ago        │  │
│  │  Hash: 000000abcd1234...                                   │  │
│  │  ──────────────────────────────────────────────────────   │  │
│  │  📦 #1,234,566  ⛏️ 500.0 PBT  💳 45 txs  ⏱️ 58s ago       │  │
│  │  Hash: 000000ef567890...                                   │  │
│  │  ──────────────────────────────────────────────────────   │  │
│  │  📦 #1,234,565  ⛏️ 500.0 PBT  💳 23 txs  ⏱️ 2m ago        │  │
│  │  Hash: 000000ij123456...                                   │  │
│  │  ──────────────────────────────────────────────────────   │  │
│  │  📦 #1,234,564  ⛏️ 500.0 PBT  💳 67 txs  ⏱️ 3m ago        │  │
│  │  Hash: 000000kl789012...                                   │  │
│  │                                                             │  │
│  │  [View All Blocks →]                                       │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌─ RECENT TRANSACTIONS ──────────────────────────────────────┐  │
│  │                                                             │  │
│  │  💰 12.3456 PBT   ⏱️ 5s ago    Fee: 0.0010 PBT            │  │
│  │  TxID: abcd1234...                                         │  │
│  │  ──────────────────────────────────────────────────────   │  │
│  │  💰 456.7890 PBT  ⏱️ 12s ago   Fee: 0.0015 PBT           │  │
│  │  TxID: ef567890...                                         │  │
│  │  ──────────────────────────────────────────────────────   │  │
│  │  💰 78.9012 PBT   ⏱️ 28s ago   Fee: 0.0008 PBT           │  │
│  │  TxID: ij123456...                                         │  │
│  │                                                             │  │
│  │  [View Mempool →]                                          │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌─ NETWORK STATISTICS ───────────────────────────────────────┐  │
│  │                                                             │  │
│  │  📊 Hash Rate (24h)         🪙 Supply Statistics           │  │
│  │  ┌─────────────────┐        Circulating: 525,600,000 PBT  │  │
│  │  │   📈 Chart      │        Total: 1,021,000,000 PBT      │  │
│  │  │                 │        Emission Phase: Early Era     │  │
│  │  └─────────────────┘        Block Reward: 500 PBT         │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  [Home] [Blocks] [Transactions] [Charts] [API] [About]           │
└────────────────────────────────────────────────────────────────────┘
```

### 2. Block Details Page
```
┌────────────────────────────────────────────────────────────────────┐
│  ⬅️ Back    🗺️ BLOCK #1,234,567                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─ BLOCK INFORMATION ──────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  Block Hash:                                                  │ │
│  │  000000abcd1234567890ef1234567890abcdef1234567890...        📋│ │
│  │                                                               │ │
│  │  Previous Block:     #1,234,566                              │ │
│  │  Next Block:         #1,234,568                              │ │
│  │                                                               │ │
│  │  Timestamp:          2024-12-22 23:45:12 UTC                 │ │
│  │  Age:                2 minutes ago                           │ │
│  │  Height:             1,234,567                               │ │
│  │  Size:               45.2 KB                                 │ │
│  │  Weight:             67,890                                  │ │
│  │                                                               │ │
│  │  ⛏️ Mining Details                                            │ │
│  │  Block Reward:       500.0000 PBT                            │ │
│  │  Transaction Fees:   0.1234 PBT                              │ │
│  │  Total Output:       500.1234 PBT                            │ │
│  │  Difficulty:         12,345,678,901                          │ │
│  │  Nonce:              4,294,967,295                           │ │
│  │                                                               │ │
│  │  🏴‍☠️ Pirate Hash (PoW):                                      │ │
│  │  Phase 1: Cuckoo Cycle Proof [View Details →]               │ │
│  │  Phase 2: CryptoNight Hash   [View Details →]               │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ TRANSACTIONS (12) ─────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  ⛏️ Coinbase Transaction                                      │ │
│  │  TxID: abc123...                           500.1234 PBT      │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  💳 Transaction                                               │ │
│  │  TxID: def456...                            12.3456 PBT      │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  💳 Transaction                                               │ │
│  │  TxID: ghi789...                           456.7890 PBT      │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  [View All 12 Transactions →]                                │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 3. Transaction Details Page
```
┌────────────────────────────────────────────────────────────────────┐
│  ⬅️ Back    💰 TRANSACTION DETAILS                                 │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─ TRANSACTION INFO ────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  Transaction ID:                                              │ │
│  │  abcd1234567890ef1234567890abcdef1234567890abcdef...       📋│ │
│  │                                                               │ │
│  │  Status:           ✅ Confirmed (150 confirmations)           │ │
│  │  Block:            #1,234,567                                │ │
│  │  Timestamp:        2024-12-22 23:45:12 UTC                   │ │
│  │  Age:              2 minutes ago                             │ │
│  │  Size:             2.34 KB                                   │ │
│  │  Fee:              0.0010 PBT                                │ │
│  │  Fee per byte:     0.0004 PBT/byte                           │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ INPUTS ──────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  📥 Input #0                                                  │ │
│  │  From:     PBT1abc...xyz123                                  │ │
│  │  Amount:   100.0000 PBT                                      │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  📥 Input #1                                                  │ │
│  │  From:     PBT1def...uvw456                                  │ │
│  │  Amount:   50.0000 PBT                                       │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ OUTPUTS ─────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  📤 Output #0                                                 │ │
│  │  To:       PBT1ghi...rst789                                  │ │
│  │  Amount:   149.9990 PBT                                      │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ ADDITIONAL DATA ─────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  Payment ID:     (None)                                       │ │
│  │  Ring Size:      11                                           │ │
│  │  Version:        2                                            │ │
│  │  Unlock Time:    0                                            │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 4. Search Results Page
```
┌────────────────────────────────────────────────────────────────────┐
│  🔍 SEARCH RESULTS                                                 │
│  Query: "1234567"                                                  │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─ BLOCKS (1) ──────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  📦 Block #1,234,567                                          │ │
│  │  Hash: 000000abcd...                                         │ │
│  │  Transactions: 12    Size: 45.2 KB    Age: 2 minutes ago    │ │
│  │  [View Block →]                                               │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ TRANSACTIONS (3) ────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  💰 TxID: abcd1234...                                         │ │
│  │  Amount: 12.3456 PBT    Block: #1,234,567    ✅ Confirmed    │ │
│  │  [View Transaction →]                                         │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  💰 TxID: ef567890...                                         │ │
│  │  Amount: 456.7890 PBT   Block: #1,233,456    ✅ Confirmed    │ │
│  │  [View Transaction →]                                         │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  💰 TxID: ij123456...                                         │ │
│  │  Amount: 78.9012 PBT    Block: #1,231,234    ✅ Confirmed    │ │
│  │  [View Transaction →]                                         │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  No addresses found matching your query.                          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 5. Charts & Analytics Page
```
┌────────────────────────────────────────────────────────────────────┐
│  📊 NETWORK CHARTS & ANALYTICS                                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  [24H] [7D] [30D] [1Y] [ALL]                                      │
│                                                                    │
│  ┌─ HASH RATE ───────────────────────────────────────────────────┐ │
│  │  Current: 123.45 MH/s                                         │ │
│  │                                                               │ │
│  │  150 ┤                                              📈        │ │
│  │  125 ┤                                         ╱──╲           │ │
│  │  100 ┤                                    ╱───╯    ╲          │ │
│  │   75 ┤                               ╱───╯          ╲─        │ │
│  │   50 ┤                          ╱───╯                ╲        │ │
│  │   25 ┤                     ╱───╯                      ╲       │ │
│  │    0 └────────────────────────────────────────────────────   │ │
│  │       00:00   06:00   12:00   18:00   24:00                  │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ DIFFICULTY ──────────────────────────────────────────────────┐ │
│  │  Current: 12.34B                                              │ │
│  │  [Similar chart...]                                           │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ TRANSACTION COUNT ───────────────────────────────────────────┐ │
│  │  Today: 12,345 txs                                            │ │
│  │  [Bar chart showing daily transaction volume]                 │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ EMISSION SCHEDULE ───────────────────────────────────────────┐ │
│  │  Current Phase: Early Era (500 PBT/block)                     │ │
│  │  Circulating Supply: 525,600,000 PBT (51.5%)                 │ │
│  │                                                               │ │
│  │  [Emission curve visualization]                               │ │
│  │                                                               │ │
│  │  Next Phase: Mid Era (250 PBT/block)                         │ │
│  │  Blocks Remaining: 525,600 (~1 year)                         │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 6. Mining Pools Page
```
┌────────────────────────────────────────────────────────────────────┐
│  ⛏️ MINING POOLS                                                   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─ TOP POOLS (Last 1000 Blocks) ───────────────────────────────┐ │
│  │                                                               │ │
│  │  #1  Pirate Pool           42.5%  (425 blocks)               │ │
│  │      ████████████████████████████████████████░░░░░░░░░░░░   │ │
│  │      pirate-pool.io                                          │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  #2  Treasure Mine         28.3%  (283 blocks)               │ │
│  │      ██████████████████████████████░░░░░░░░░░░░░░░░░░░░░   │ │
│  │      treasuremine.xyz                                        │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  #3  Booty Diggers         15.7%  (157 blocks)               │ │
│  │      █████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ │
│  │      bootydiggers.com                                        │ │
│  │  ────────────────────────────────────────────────────────   │ │
│  │  #4  Solo Miners           13.5%  (135 blocks)               │ │
│  │      ██████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ │
│  │      Various                                                 │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌─ NETWORK DECENTRALIZATION ───────────────────────────────────┐ │
│  │                                                               │ │
│  │  Pool Distribution:                                           │ │
│  │  🔴 Red (>40%): 1 pool                                       │ │
│  │  🟡 Yellow (20-40%): 1 pool                                  │ │
│  │  🟢 Green (<20%): 2 pools + solo                             │ │
│  │                                                               │ │
│  │  [Pie chart visualization]                                    │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## UI Components

### Search Bar
- **Placeholder:** "Search blocks, transactions, or addresses..."
- **Supports:**
  - Block numbers (e.g., 1234567)
  - Block hashes
  - Transaction IDs
  - Addresses
- **Auto-suggestions** as you type
- **Recent searches** dropdown

### Network Status Badge
```
🟢 Online           ⚫ Syncing          🔴 Offline
```

### Block Card Component
```
┌────────────────────────────────────────┐
│  📦 #1,234,567                         │
│  Hash: 000000abc...              📋   │
│  ⛏️ 500.0 PBT  💳 12 txs  ⏱️ 2m ago   │
│  Size: 45.2 KB  Difficulty: 12.3B    │
└────────────────────────────────────────┘
```

### Transaction Card
```
┌────────────────────────────────────────┐
│  💰 12.3456 PBT                        │
│  TxID: abcd1234...               📋   │
│  Block: #1,234,567  ⏱️ 5s ago         │
│  Fee: 0.0010 PBT  ✅ Confirmed (150)  │
└────────────────────────────────────────┘
```

## Features

### Core Features
- ✅ Real-time block updates (WebSocket)
- ✅ Live transaction feed
- ✅ Advanced search
- ✅ Block details with Pirate Hash visualization
- ✅ Transaction tracking
- ✅ Network statistics
- ✅ Charts and analytics
- ✅ Mining pool statistics
- ✅ Emission schedule visualization
- ✅ API documentation

### Advanced Features
- 🔔 Push notifications for new blocks
- 📊 Custom chart ranges
- 🌐 Multi-language support
- 🎨 Theme switcher (dark/light)
- 📱 Progressive Web App (PWA)
- 🔗 Deep linking
- 📥 Export data (CSV, JSON)
- 🔖 Bookmarks/favorites
- ⚡ Lightning-fast search
- 📡 REST API + WebSocket API

## Technology Stack

### Frontend
- **Framework:** React or Vue.js
- **UI Library:** Material-UI or Vuetify
- **Charts:** Chart.js or D3.js
- **State:** Redux or Vuex
- **WebSocket:** Socket.io-client
- **HTTP:** Axios
- **Routing:** React Router or Vue Router

### Backend API
- **Server:** Node.js + Express or Python + FastAPI
- **Database:** PostgreSQL or MongoDB
- **Cache:** Redis
- **WebSocket:** Socket.io
- **Blockchain RPC:** Pirate Booty RPC

### Infrastructure
- **Hosting:** AWS, DigitalOcean, or Cloudflare Pages
- **CDN:** Cloudflare
- **SSL:** Let's Encrypt
- **Monitoring:** Grafana + Prometheus
- **Logging:** ELK Stack

## API Endpoints

### Public API
```
GET  /api/v1/info             - Network info
GET  /api/v1/blocks           - Recent blocks
GET  /api/v1/blocks/:height   - Block by height
GET  /api/v1/blocks/:hash     - Block by hash
GET  /api/v1/txs              - Recent transactions
GET  /api/v1/txs/:txid        - Transaction by ID
GET  /api/v1/search?q=:query  - Search
GET  /api/v1/stats            - Network statistics
GET  /api/v1/emission         - Emission schedule
GET  /api/v1/pools            - Mining pools

WebSocket: /ws/blocks          - Live block feed
WebSocket: /ws/txs             - Live transaction feed
```

## Performance Optimization
- Server-side rendering (SSR)
- Code splitting
- Lazy loading
- Image optimization
- Caching strategy
- CDN delivery
- Database indexing
- Query optimization

## Mobile Responsiveness
- Touch-friendly interface
- Swipe gestures
- Bottom sheet modals
- Collapsible sections
- Optimized for small screens

## Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Semantic HTML
- ARIA labels
- Focus indicators

## Security
- CSP headers
- XSS protection
- CSRF tokens
- Rate limiting
- Input validation
- Secure headers

## Branding Elements
- 🏴‍☠️ Pirate flag favicon
- ⚓ Anchor loading spinner
- 🗺️ Treasure map backgrounds
- ⛵ Ship animations
- 🪙 Coin flip transitions
- 🌊 Wave patterns
