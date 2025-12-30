#!/bin/bash
# 🏴‍☠️ Pirate Booty Testnet Launcher
# Starts a complete testnet environment with daemon, miner, and wallet RPC

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🏴‍☠️ =============================================="
echo "🏴‍☠️  Pirate Booty Testnet Deployment"
echo "🏴‍☠️ =============================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose not found. Please install docker-compose."
    exit 1
fi

cd "$PROJECT_ROOT"

# Create .env file if it doesn't exist
if [ ! -f .env.testnet ]; then
    echo "📝 Creating .env.testnet file..."
    cat > .env.testnet <<EOF
# Pirate Booty Testnet Configuration
TESTNET_WALLET_PASSWORD=pirate_testnet_2024
TESTNET_WALLET_RPC_PASSWORD=rpc_testnet_2024
MINING_THREADS=2
EOF
    echo "✅ Created .env.testnet with default passwords"
    echo "⚠️  IMPORTANT: Change passwords in .env.testnet for production use!"
fi

# Load environment variables
if [ -f .env.testnet ]; then
    export $(cat .env.testnet | grep -v '^#' | xargs)
fi

echo ""
echo "🔧 Configuration:"
echo "   Mining Threads: ${MINING_THREADS:-2}"
echo "   Network: Testnet (ports 29080-29083)"
echo ""

# Build and start services
echo "🏗️  Building Docker images..."
docker-compose -f docker-compose.testnet.yml build

echo ""
echo "⚓ Starting testnet services..."
docker-compose -f docker-compose.testnet.yml up -d

echo ""
echo "⏳ Waiting for daemon to start..."
sleep 10

# Check daemon status
if docker-compose -f docker-compose.testnet.yml exec -T piratebooty-testnet piratebootyd status > /dev/null 2>&1; then
    echo "✅ Daemon is running"
else
    echo "⚠️  Daemon starting (may take a few moments)"
fi

echo ""
echo "🏴‍☠️ =============================================="
echo "🏴‍☠️  Testnet Services Started!"
echo "🏴‍☠️ =============================================="
echo ""
echo "📡 Daemon RPC:      http://localhost:29081"
echo "💰 Wallet RPC:      http://localhost:29083"
echo "🔗 P2P Port:        29080"
echo "📊 ZMQ Port:        29082"
echo ""
echo "📋 Useful Commands:"
echo "   View logs:       docker-compose -f docker-compose.testnet.yml logs -f"
echo "   Stop testnet:    docker-compose -f docker-compose.testnet.yml down"
echo "   Restart:         docker-compose -f docker-compose.testnet.yml restart"
echo "   Get daemon info: curl -X POST http://localhost:29081/json_rpc -d '{\"jsonrpc\":\"2.0\",\"id\":\"0\",\"method\":\"get_info\"}'"
echo ""
echo "🔍 Check mining status:"
echo "   curl -X POST http://localhost:29081/mining_status"
echo ""
echo "🏴‍☠️ The testnet seas await! Happy testing!"
echo ""
