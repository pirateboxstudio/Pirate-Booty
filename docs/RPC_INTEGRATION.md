# 🏴‍☠️ Pirate Booty RPC Integration Guide

## Overview
This document describes the customized RPC (Remote Procedure Call) interface for Pirate Booty (PBT). The RPC server allows external applications, mining pools, exchanges, and wallets to interact with the Pirate Booty daemon and wallet.

## RPC Port Configuration

### Network Ports
| Network | P2P Port | RPC Port | ZMQ Port |
|---------|----------|----------|----------|
| **Mainnet** | 19080 | 19081 | 19082 |
| **Testnet** | 29080 | 29081 | 29082 |
| **Stagenet** | 39080 | 39081 | 39082 |

## Version Information

### Software Identification
- **Software Name**: `piratebooty` (replaces "monero" in RPC responses)
- **Version**: `1.0.0.0`
- **Release Name**: `Black Pearl`
- **Version Format**: `1.0.0.0-<tag>` (e.g., `1.0.0.0-release`)

## Standard RPC Endpoints

### Get Info
```bash
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "get_info"
}' -H 'Content-Type: application/json'
```

**Response includes:**
- Software version: `1.0.0.0-release`
- Network type, height, difficulty, etc.

### Mining Status
```bash
curl -X POST http://127.0.0.1:19081/mining_status -H 'Content-Type: application/json'
```

**Response includes:**
- `active`: Mining status (true/false)
- `speed`: Current hash rate
- `threads_count`: Number of mining threads
- `address`: Mining address
- `pow_algorithm`: **"Pirate Hash (Cuckoo Cycle + CryptoNight)"** for block version ≥13
- `block_reward`: Current block reward
- `difficulty`: Current network difficulty

### Start Mining
```bash
curl -X POST http://127.0.0.1:19081/start_mining -d '{
  "miner_address": "YOUR_PBT_ADDRESS",
  "threads_count": 4,
  "do_background_mining": false
}' -H 'Content-Type: application/json'
```

**Pirate-themed error messages:**
- Invalid address: `"🏴‍☠️ Failed - invalid treasure chest address"`
- Subaddress not supported: `"🏴‍☠️ Mining to subaddress isn't supported yet - use main treasure chest"`
- Too many threads: `"🏴‍☠️ Failed - too many pirates for this ship (threads exceed CPU cores)"`
- Already mining: `"🏴‍☠️ Already mining - pirates are already at sea!"`
- Failed to start: `"🏴‍☠️ Failed - pirates refused to set sail"`

### Stop Mining
```bash
curl -X POST http://127.0.0.1:19081/stop_mining -H 'Content-Type: application/json'
```

**Pirate-themed error messages:**
- Not mining: `"⚓ Mining never started - no pirates at sea"`
- Failed to stop: `"⚓ Failed to stop mining - pirates refuse to return to port"`

## 🆕 Pirate Booty Custom Endpoints

### Get Pirate Hash Info
Returns detailed information about the Pirate Hash PoW algorithm.

**Endpoint:** `/get_pirate_hash_info`

**Request:**
```bash
curl -X POST http://127.0.0.1:19081/get_pirate_hash_info -H 'Content-Type: application/json'
```

**Response:**
```json
{
  "algorithm_name": "Pirate Hash",
  "description": "🏴‍☠️ Hybrid PoW combining Cuckoo Cycle (memory-hard) and CryptoNight (CPU-friendly) for true ASIC resistance",
  "phase1_algorithm": "Cuckoo Cycle",
  "phase1_edgebits": 29,
  "phase1_cycle_length": 42,
  "phase2_algorithm": "CryptoNight-R (Variant 4)",
  "memory_requirement": 536870912,
  "asic_resistant": true,
  "status": "OK"
}
```

**Fields:**
- `algorithm_name`: Name of the PoW algorithm
- `description`: Human-readable description with pirate emoji
- `phase1_algorithm`: First phase algorithm (Cuckoo Cycle)
- `phase1_edgebits`: Cuckoo Cycle edge bits (29)
- `phase1_cycle_length`: Required cycle length (42)
- `phase2_algorithm`: Second phase algorithm (CryptoNight-R)
- `memory_requirement`: Memory requirement in bytes (~512 MB)
- `asic_resistant`: ASIC resistance status (true)

## Starting the RPC Server

### Basic RPC Server
```bash
./piratebootyd --rpc-bind-ip 0.0.0.0 --rpc-bind-port 19081 --confirm-external-bind
```

### Restricted RPC (Public Nodes)
```bash
./piratebootyd --rpc-bind-ip 0.0.0.0 --rpc-bind-port 19081 --restricted-rpc --confirm-external-bind
```

### With Login Credentials
```bash
./piratebootyd --rpc-bind-port 19081 --rpc-login username:password
```

## JSON-RPC Interface

### Get Block Count
```bash
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "get_block_count"
}' -H 'Content-Type: application/json'
```

### Get Block Hash
```bash
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "on_get_block_hash",
  "params": [100]
}' -H 'Content-Type: application/json'
```

### Get Block Template (for Mining)
```bash
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "get_block_template",
  "params": {
    "wallet_address": "YOUR_PBT_ADDRESS",
    "reserve_size": 60
  }
}' -H 'Content-Type: application/json'
```

### Submit Block
```bash
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "submit_block",
  "params": ["<block_blob_hex>"]
}' -H 'Content-Type: application/json'
```

## Wallet RPC

### Starting Wallet RPC
```bash
./piratebooty-wallet-rpc --rpc-bind-port 19082 --wallet-file /path/to/wallet --password "your_password" --daemon-address 127.0.0.1:19081
```

### Common Wallet RPC Methods
- `get_balance`: Get wallet balance
- `get_address`: Get wallet address
- `create_address`: Create new address/subaddress
- `transfer`: Send PBT to address
- `get_transfers`: Get transaction history
- `make_integrated_address`: Create integrated address
- `split_integrated_address`: Decode integrated address

## Mining Pool Integration

### Required Endpoints for Pools
1. **`/json_rpc` - `get_block_template`**: Get mining job
2. **`/json_rpc` - `submit_block`**: Submit found block
3. **`/get_info`**: Network stats and height
4. **`/mining_status`**: Current difficulty and algorithm
5. **`/get_pirate_hash_info`**: Algorithm specifications

### Example Pool Request Flow
```bash
# 1. Get algorithm info (once at startup)
curl -X POST http://127.0.0.1:19081/get_pirate_hash_info

# 2. Get block template (repeatedly)
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "get_block_template",
  "params": {
    "wallet_address": "POOL_ADDRESS",
    "reserve_size": 8
  }
}'

# 3. Submit block when found
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "submit_block",
  "params": ["<block_blob_hex>"]
}'
```

## Exchange Integration

### Deposit Detection
```bash
# Monitor new blocks
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "get_block_count"
}'

# Get transactions in block
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "get_block",
  "params": {
    "height": 12345
  }
}'
```

### Withdrawal Processing
```bash
# Create transaction via wallet RPC
curl -X POST http://127.0.0.1:19082/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "transfer",
  "params": {
    "destinations": [
      {
        "amount": 1000000000000,
        "address": "RECIPIENT_ADDRESS"
      }
    ],
    "priority": 1,
    "mixin": 10,
    "get_tx_key": true
  }
}'
```

## Security Considerations

### Restricted RPC Mode
Use `--restricted-rpc` for public nodes to:
- Hide sensitive information
- Prevent resource abuse
- Limit administrative operations

### Authentication
Always use `--rpc-login` for production:
```bash
./piratebootyd --rpc-login myuser:mypassword --rpc-bind-port 19081
```

### Network Binding
- **Local only**: `--rpc-bind-ip 127.0.0.1` (default)
- **Public**: `--rpc-bind-ip 0.0.0.0` (use with `--restricted-rpc`)

### SSL/TLS
For production deployments, use SSL:
```bash
./piratebootyd --rpc-bind-port 19081 \
  --rpc-ssl enabled \
  --rpc-ssl-private-key /path/to/key.pem \
  --rpc-ssl-certificate /path/to/cert.pem
```

## Testing RPC Integration

### Health Check
```bash
curl -X POST http://127.0.0.1:19081/json_rpc -d '{
  "jsonrpc": "2.0",
  "id": "0",
  "method": "get_info"
}'
```

Expected response should include:
- `"software": "piratebooty"`
- `"version": "1.0.0.0-release"`

### Algorithm Verification
```bash
curl -X POST http://127.0.0.1:19081/get_pirate_hash_info
```

Expected response:
- `"algorithm_name": "Pirate Hash"`
- `"asic_resistant": true`

## Error Handling

### Standard Status Codes
- `"OK"`: Success
- `"BUSY"`: Daemon busy (syncing)
- `"NOT MINING"`: Mining operation requested but not mining
- `"PAYMENT REQUIRED"`: RPC payment required (if enabled)

### Pirate-Themed Errors
Mining errors include pirate-themed messages for better UX:
- Invalid address errors reference "treasure chest"
- Thread errors reference "pirates" and "ships"
- Status messages reference nautical themes

## Support and Resources

### Documentation
- Full RPC API: See Monero RPC documentation (compatible)
- Pirate Booty specifics: This document
- Source code: `/src/rpc/` directory

### Community
- GitHub: https://github.com/piratebooty/pirate-booty
- Discord: Join for technical support
- IRC: #piratebooty-dev

---

🏴‍☠️ **"The seas belong to the miners!"** 🏴‍☠️
