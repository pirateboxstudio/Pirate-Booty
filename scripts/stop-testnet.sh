#!/bin/bash
# 🏴‍☠️ Pirate Booty Testnet Stopper

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "⚓ Stopping Pirate Booty Testnet..."
docker-compose -f docker-compose.testnet.yml down

echo ""
echo "✅ Testnet stopped. Pirates returned to port!"
echo ""
echo "To remove all testnet data (blockchain, wallets):"
echo "   docker-compose -f docker-compose.testnet.yml down -v"
echo ""
