#!/bin/bash
# 🏴‍☠️ Check Pirate Booty Testnet Status

set -e

echo "🏴‍☠️ Pirate Booty Testnet Status"
echo "=================================="
echo ""

# Check daemon
echo "📡 Daemon Status:"
DAEMON_INFO=$(curl -s -X POST http://localhost:29081/json_rpc -d '{"jsonrpc":"2.0","id":"0","method":"get_info"}' -H 'Content-Type: application/json' 2>/dev/null || echo "error")

if [ "$DAEMON_INFO" != "error" ]; then
    HEIGHT=$(echo $DAEMON_INFO | jq -r '.result.height // "unknown"')
    DIFFICULTY=$(echo $DAEMON_INFO | jq -r '.result.difficulty // "unknown"')
    TX_POOL=$(echo $DAEMON_INFO | jq -r '.result.tx_pool_size // "0"')
    CONNECTIONS=$(echo $DAEMON_INFO | jq -r '.result.outgoing_connections_count // "0"')
    
    echo "   ✅ Running"
    echo "   Block Height: $HEIGHT"
    echo "   Difficulty: $DIFFICULTY"
    echo "   TX Pool Size: $TX_POOL"
    echo "   Connections: $CONNECTIONS"
else
    echo "   ❌ Not responding"
fi

echo ""

# Check mining
echo "⛏️  Mining Status:"
MINING_INFO=$(curl -s -X POST http://localhost:29081/mining_status -H 'Content-Type: application/json' 2>/dev/null || echo "error")

if [ "$MINING_INFO" != "error" ]; then
    ACTIVE=$(echo $MINING_INFO | jq -r '.active // false')
    SPEED=$(echo $MINING_INFO | jq -r '.speed // 0')
    THREADS=$(echo $MINING_INFO | jq -r '.threads_count // 0')
    ALGORITHM=$(echo $MINING_INFO | jq -r '.pow_algorithm // "unknown"')
    
    if [ "$ACTIVE" = "true" ]; then
        echo "   ✅ Active"
        echo "   Hash Rate: $SPEED H/s"
        echo "   Threads: $THREADS"
        echo "   Algorithm: $ALGORITHM"
    else
        echo "   ⚓ Not mining"
    fi
else
    echo "   ❌ Cannot retrieve status"
fi

echo ""

# Check wallet RPC
echo "💰 Wallet RPC Status:"
WALLET_STATUS=$(curl -s -X POST http://localhost:29083/json_rpc -d '{"jsonrpc":"2.0","id":"0","method":"get_balance"}' -H 'Content-Type: application/json' 2>/dev/null || echo "error")

if [ "$WALLET_STATUS" != "error" ]; then
    BALANCE=$(echo $WALLET_STATUS | jq -r '.result.balance // 0')
    UNLOCKED=$(echo $WALLET_STATUS | jq -r '.result.unlocked_balance // 0')
    
    # Convert from atomic units to PBT (12 decimals)
    BALANCE_PBT=$(echo "scale=12; $BALANCE / 1000000000000" | bc)
    UNLOCKED_PBT=$(echo "scale=12; $UNLOCKED / 1000000000000" | bc)
    
    echo "   ✅ Running"
    echo "   Balance: $BALANCE_PBT PBT"
    echo "   Unlocked: $UNLOCKED_PBT PBT"
else
    echo "   ❌ Not responding"
fi

echo ""
echo "🏴‍☠️ End of Status Report"
echo ""
