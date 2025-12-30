# 🏴‍☠️ Pirate Booty - GitHub Repository Structure

```
pirate-booty/
│
├── .github/                        # GitHub-specific files
│   ├── workflows/                  # CI/CD workflows
│   │   ├── build.yml              # Build and test workflow
│   │   ├── docker.yml             # Docker build workflow
│   │   └── release.yml            # Release workflow
│   ├── ISSUE_TEMPLATE/            # Issue templates
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── mining_support.md
│   ├── PULL_REQUEST_TEMPLATE.md   # PR template
│   └── FUNDING.yml                # Sponsorship info
│
├── cmake/                          # CMake modules
│   ├── FindBoost.cmake
│   ├── FindOpenSSL.cmake
│   └── ...
│
├── contrib/                        # Contributed tools
│   ├── epee/                      # Epee library
│   └── ...
│
├── docs/                           # 📚 Documentation
│   ├── wallet-ui-design.md        # Wallet interface design
│   ├── explorer-ui-design.md      # Explorer interface design
│   ├── wallet-miner-integration.md # Built-in miner guide
│   ├── quick-start-mining.md      # Quick start for users
│   ├── docker-build-guide.md      # Docker deployment
│   ├── API.md                     # API documentation
│   ├── BUILDING.md                # Build instructions
│   └── MINING.md                  # Mining guide
│
├── external/                       # External dependencies
│   ├── boost/                     # Boost library
│   ├── cuckoo/                    # 🏴‍☠️ Cuckoo Cycle (submodule)
│   ├── randomx/                   # RandomX (submodule)
│   ├── rapidjson/                 # JSON library (submodule)
│   ├── miniupnp/                  # UPnP library (submodule)
│   ├── supercop/                  # Crypto library (submodule)
│   └── gtest/                     # Google Test (submodule)
│
├── src/                            # 💻 Source code
│   │
│   ├── blockchain_db/             # Blockchain database
│   │   ├── lmdb/                  # LMDB implementation
│   │   └── blockchain_db.h
│   │
│   ├── blockchain_utilities/      # Blockchain tools
│   │   ├── blockchain_import.cpp
│   │   ├── blockchain_export.cpp
│   │   └── ...
│   │
│   ├── blocks/                    # Block data
│   │   └── blocks.cpp
│   │
│   ├── checkpoints/               # Network checkpoints
│   │   ├── checkpoints.cpp
│   │   └── checkpoints.h
│   │
│   ├── common/                    # Common utilities
│   │   ├── base58.cpp
│   │   ├── util.cpp
│   │   └── ...
│   │
│   ├── crypto/                    # 🔐 Cryptography (CORE)
│   │   ├── pirate-hash.h          # 🏴‍☠️ Main Pirate Hash
│   │   ├── pirate-hash.cpp        # Hybrid PoW implementation
│   │   ├── cuckoo-hash.h          # Cuckoo Cycle wrapper
│   │   ├── cuckoo-hash.cpp        # Cuckoo integration
│   │   ├── slow-hash.c            # CryptoNight
│   │   ├── rx-slow-hash.c         # RandomX
│   │   ├── hash.h                 # Hash functions
│   │   ├── hash.c
│   │   ├── hash-ops.h             # PIRATE_BLOCK_VERSION
│   │   ├── crypto.cpp
│   │   ├── crypto-ops.c
│   │   └── ...
│   │
│   ├── cryptonote_basic/          # Core cryptonote
│   │   ├── cryptonote_basic.h
│   │   ├── cryptonote_format_utils.cpp
│   │   ├── cryptonote_basic_impl.cpp  # 💰 Emission schedule
│   │   ├── miner.cpp              # 🏴‍☠️ Pirate-themed mining
│   │   └── ...
│   │
│   ├── cryptonote_core/           # Blockchain core
│   │   ├── blockchain.cpp         # Blockchain logic
│   │   ├── blockchain.h
│   │   ├── cryptonote_core.cpp
│   │   ├── cryptonote_tx_utils.cpp # ⛏️ Pirate Hash integration
│   │   ├── tx_pool.cpp
│   │   └── ...
│   │
│   ├── cryptonote_config.h        # 🏴‍☠️ Network parameters
│   │   # - MONEY_SUPPLY (1,021,000,000 PBT)
│   │   # - PIRATE_REWARD_* (emission phases)
│   │   # - PIRATE_BLOCK_TIME (60 seconds)
│   │
│   ├── cryptonote_protocol/       # P2P protocol
│   │   └── cryptonote_protocol_handler.inl
│   │
│   ├── daemon/                    # Daemon (piratebootyd)
│   │   ├── main.cpp
│   │   ├── daemon.cpp
│   │   └── ...
│   │
│   ├── daemonizer/                # Daemon utilities
│   │
│   ├── device/                    # Hardware support
│   │   ├── device.cpp
│   │   └── device_ledger.cpp
│   │
│   ├── mnemonics/                 # Seed words
│   │
│   ├── net/                       # Networking
│   │
│   ├── p2p/                       # Peer-to-peer
│   │   ├── net_node.h
│   │   └── net_node.inl
│   │
│   ├── ringct/                    # Ring signatures
│   │
│   ├── rpc/                       # RPC server
│   │   ├── core_rpc_server.cpp
│   │   ├── core_rpc_server.h
│   │   └── ...
│   │
│   ├── serialization/             # Data serialization
│   │
│   ├── simplewallet/              # CLI wallet
│   │   └── simplewallet.cpp
│   │
│   ├── wallet/                    # 💼 Wallet library
│   │   ├── wallet2.cpp            # Main wallet
│   │   ├── wallet2.h
│   │   ├── wallet_miner.h         # 🏴‍☠️ Built-in miner
│   │   ├── wallet_miner.cpp       # One-click mining
│   │   ├── wallet_rpc_server.cpp  # Wallet RPC
│   │   ├── api/                   # Wallet API
│   │   └── ...
│   │
│   └── version.cpp.in             # Version info
│
├── tests/                          # 🧪 Tests
│   ├── core_tests/
│   ├── crypto/
│   ├── functional_tests/
│   ├── hash/
│   ├── performance_tests/
│   └── unit_tests/
│
├── translations/                   # 🌍 Internationalization
│   ├── en.ts
│   └── ...
│
├── utils/                          # Utilities
│   ├── gpg_keys/
│   └── ...
│
├── .dockerignore                   # Docker ignore file
├── .gitattributes                  # Git attributes
├── .gitignore                      # Git ignore
├── .gitmodules                     # Git submodules config
│
├── CMakeLists.txt                  # 🔧 Main build config
├── CMakeLists_IOS.txt             # iOS build config
│
├── Dockerfile                      # 🐳 Docker build (multi-stage)
├── docker-compose.yml              # Full stack orchestration
│
├── Doxyfile                        # Doxygen config
├── LICENSE                         # BSD 3-Clause
├── Makefile                        # Build shortcuts
│
├── README.md                       # 📖 Main readme
├── IMPLEMENTATION_SUMMARY.md       # Complete implementation guide
└── REPOSITORY_STRUCTURE.md         # This file
```

---

## 🎯 Key Directories Explained

### `/src/crypto/` - Cryptography Core
**Most Important Directory** - Contains Pirate Hash implementation
- `pirate-hash.h/cpp` - Main hybrid PoW (Cuckoo + CryptoNight)
- `cuckoo-hash.h/cpp` - Cuckoo Cycle integration
- `slow-hash.c` - CryptoNight implementation
- `hash-ops.h` - Defines PIRATE_BLOCK_VERSION (13)

### `/src/cryptonote_basic/` - Blockchain Basics
- `cryptonote_basic_impl.cpp` - **Emission schedule** (500→250→125→62.5→3 PBT)
- `miner.cpp` - Mining with pirate-themed messages

### `/src/cryptonote_core/` - Core Logic
- `blockchain.cpp` - Block validation
- `cryptonote_tx_utils.cpp` - **Pirate Hash integration** point
- `tx_pool.cpp` - Transaction pool with emission

### `/src/wallet/` - Wallet Implementation
- `wallet2.cpp` - Main wallet logic
- `wallet_miner.h/cpp` - **Built-in one-click miner** 🏴‍☠️
- `wallet_rpc_server.cpp` - RPC API

### `/external/cuckoo/` - Cuckoo Cycle
**Git Submodule** from tromp/cuckoo
- Memory-hard PoW algorithm
- Phase 1 of Pirate Hash

### `/docs/` - Documentation
- Design documents for wallet and explorer
- Mining guides
- Docker deployment instructions

---

## 🔗 Git Submodules

```bash
# Initialize submodules
git submodule init
git submodule update --recursive

# Submodules included:
external/cuckoo      → https://github.com/tromp/cuckoo
external/randomx     → https://github.com/tevador/RandomX
external/rapidjson   → https://github.com/Tencent/rapidjson
external/miniupnp    → https://github.com/miniupnp/miniupnp
external/supercop    → https://github.com/monero-project/supercop
external/gtest       → https://github.com/google/googletest
```

---

## 🛠️ Build Artifacts (Generated)

```
build/                  # CMake build directory (gitignored)
├── bin/               # Compiled binaries
│   ├── piratebootyd
│   ├── pirate-wallet-cli
│   ├── pirate-wallet-rpc
│   └── ...
├── lib/               # Compiled libraries
└── ...
```

---

## 📦 Docker Volumes

```
Docker volumes (persistent data):
├── piratebooty-data/        # Blockchain data
│   └── lmdb/               # LMDB database
└── piratebooty-wallet/      # Wallet files
    └── wallets/
```

---

## 🌟 Notable Custom Files

### Pirate Booty Specific
```
✅ src/crypto/pirate-hash.h         # Hybrid PoW header
✅ src/crypto/pirate-hash.cpp       # Hybrid PoW implementation
✅ src/crypto/cuckoo-hash.h         # Cuckoo wrapper header
✅ src/crypto/cuckoo-hash.cpp       # Cuckoo wrapper implementation
✅ src/wallet/wallet_miner.h        # Built-in miner header
✅ src/wallet/wallet_miner.cpp      # Built-in miner implementation
✅ external/cuckoo/                 # Cuckoo Cycle submodule
✅ docs/wallet-ui-design.md         # Wallet design
✅ docs/explorer-ui-design.md       # Explorer design
✅ docs/wallet-miner-integration.md # Miner integration
✅ docs/quick-start-mining.md       # User mining guide
✅ IMPLEMENTATION_SUMMARY.md        # Complete guide
```

---

## 🔄 Build Process Flow

```
1. Clone Repository
   git clone https://github.com/piratebooty/pirate-booty.git
   ↓
2. Initialize Submodules
   git submodule init && git submodule update --recursive
   ↓
3. Create Build Directory
   mkdir build && cd build
   ↓
4. Configure with CMake
   cmake ..
   ↓
5. Build
   make -j$(nproc)
   ↓
6. Output Binaries
   build/bin/piratebootyd
   build/bin/pirate-wallet-cli
   build/bin/pirate-wallet-rpc
```

---

## 🐳 Docker Build Flow

```
1. Dockerfile (Multi-stage)
   ├── Stage 1: Builder
   │   ├── Install dependencies
   │   ├── Clone & build source
   │   └── Compile binaries
   │
   └── Stage 2: Runtime
       ├── Minimal dependencies
       ├── Copy binaries
       └── Setup user/volumes
   ↓
2. docker-compose.yml
   ├── piratebootyd (daemon)
   ├── wallet-rpc (wallet server)
   └── explorer (web UI)
```

---

## 📊 Code Statistics

```
Language              Files       Lines      Code
────────────────────────────────────────────────────
C++                    250+      150,000+   120,000+
C                       50+       30,000+    25,000+
CMake                   40+        5,000+     4,000+
Documentation           15+       10,000+     8,000+
────────────────────────────────────────────────────
Total                  355+      195,000+   157,000+

🏴‍☠️ Custom PBT Code:    ~5,000 lines
📚 Documentation:        ~8,000 lines
```

---

## 🎨 Asset Directories (To Be Added)

```
assets/                    # Design assets (future)
├── logo/
│   ├── pirate-flag.svg
│   ├── logo-light.png
│   └── logo-dark.png
├── icons/
│   ├── app-icon.ico
│   ├── tray-icon.png
│   └── ...
└── screenshots/
    ├── wallet-dashboard.png
    ├── mining-screen.png
    └── ...
```

---

## 🌐 Explorer (To Be Added)

```
explorer/                  # Block explorer (future)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/
│   ├── api/
│   ├── database/
│   └── ...
└── nginx.conf
```

---

## 📱 Mobile Wallets (Future)

```
mobile/                    # Mobile apps (future)
├── ios/
│   └── PirateBooty/
├── android/
│   └── app/
└── shared/
    └── components/
```

---

## 🔐 Security Files

```
.github/
├── SECURITY.md           # Security policy
└── workflows/
    └── security-scan.yml # Automated security scanning
```

---

## 📈 CI/CD Workflows

```
.github/workflows/
├── build.yml             # Build on push
├── test.yml              # Run tests
├── docker.yml            # Build Docker images
├── release.yml           # Create releases
└── lint.yml              # Code quality checks
```

---

## 🎯 Important Configuration Files

### Network Parameters
- `src/cryptonote_config.h` - All network constants

### Build Configuration
- `CMakeLists.txt` - Main build config
- `src/*/CMakeLists.txt` - Module builds

### Docker Configuration
- `Dockerfile` - Container build
- `docker-compose.yml` - Stack orchestration
- `.dockerignore` - Exclude files

### Version Control
- `.gitignore` - Ignored files
- `.gitmodules` - Submodule config
- `.gitattributes` - Line endings

---

## 🚀 Quick Navigation

### For Developers
```
Start here:
  └─ README.md
     └─ docs/BUILDING.md
        └─ src/crypto/pirate-hash.cpp (Pirate Hash)
           └─ src/cryptonote_basic/cryptonote_basic_impl.cpp (Emission)
```

### For Miners
```
Start here:
  └─ README.md
     └─ docs/quick-start-mining.md
        └─ src/wallet/wallet_miner.cpp (Built-in miner)
```

### For UI Designers
```
Start here:
  └─ docs/wallet-ui-design.md
     └─ docs/explorer-ui-design.md
        └─ docs/wallet-miner-integration.md
```

---

🏴‍☠️ **"Navigate the code like a true pirate!"** 🏴‍☠️
