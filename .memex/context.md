# Pirate Booty (PBT) Project Rules

## Project Overview
**Pirate Booty** is a proof-of-work cryptocurrency forked from Monero, featuring a custom hybrid mining algorithm and pirate-themed branding. This is a production cryptocurrency implementation, not a toy project.

### Key Identifiers
- **Ticker**: PBT
- **Full Name**: Pirate Booty
- **Version**: 1.0.0.0
- **Release Name**: Black Pearl
- **Software ID**: `piratebooty` (used in RPC responses, not "monero")

## Core Algorithm: Pirate Hash

### Implementation Details
- **Algorithm Name**: Pirate Hash
- **Block Version**: 13 (activates Pirate Hash)
- **Phase 1**: Cuckoo Cycle
  - EDGEBITS: 29
  - Cycle length: 42
  - Memory-hard (ASIC-resistant)
- **Phase 2**: CryptoNight-R (Variant 4)
  - CPU-friendly
  - Cache-hard

### Key Files
- `src/crypto/pirate-hash.h/cpp` - Main Pirate Hash interface
- `src/crypto/cuckoo-hash.h/cpp` - Cuckoo Cycle wrapper
- `external/cuckoo/` - Cuckoo Cycle implementation (git submodule)
- `src/cryptonote_core/cryptonote_tx_utils.cpp` - PoW integration

## Network Configuration

### Port Assignments
| Network | P2P | RPC | ZMQ |
|---------|-----|-----|-----|
| Mainnet | 19080 | 19081 | 19082 |
| Testnet | 29080 | 29081 | 29082 |
| Stagenet | 39080 | 39081 | 39082 |

**IMPORTANT**: Always use 19xxx series for mainnet (not 18xxx which is Monero)

### Economic Parameters
- **Max Supply**: 1,021,000,000 PBT
- **Block Time**: 60 seconds
- **Decimals**: 12
- **Tail Emission**: 3.0 PBT per block (perpetual, ~0.15%/year)

### Emission Schedule
- Early Era (0-1,051,200): 500 PBT/block
- Mid Era (1,051,201-2,102,400): 250 PBT/block
- Late Era (2,102,401-2,891,040): 125 PBT/block
- Final (2,891,041-3,942,240): 62.5 PBT/block
- Tail (after 1,021M): 3.0 PBT/block

## Branding Guidelines

### Pirate Theme Consistency
**ALWAYS** use pirate-themed messages for user-facing strings:
- Mining start: "🏴‍☠️ Ahoy! X pirates ready to mine!"
- Block found: "🏴‍☠️ Booty mined successfully!"
- Mining stop: "⚓ Mining stopped. X pirates returned to port."

### Error Message Patterns
- Invalid address → "invalid treasure chest address"
- Mining errors → reference "pirates", "ships", "sea", "port"
- Thread errors → "too many pirates for this ship"
- Status messages → use nautical themes (⚓, 🏴‍☠️)

### Emoji Usage
- 🏴‍☠️ for mining/booty/success messages
- ⚓ for stopping/anchoring/status messages
- Use sparingly but consistently

## RPC Customization Patterns

### Software Identification
- RPC responses must identify as `"piratebooty"`, NOT "monero"
- Version string: `"1.0.0.0-<tag>"` (e.g., "1.0.0.0-release")
- Release name: "Black Pearl"

### Algorithm Reporting
- For block version >= 13: Report as `"Pirate Hash (Cuckoo Cycle + CryptoNight)"`
- Legacy versions: Keep original CryptoNight variant names
- Always check `major_version` to determine algorithm

### Custom RPC Endpoints
- `/get_pirate_hash_info` - Returns Pirate Hash algorithm specifications
- Returns: algorithm details, memory requirements, ASIC resistance status
- Available to all (not restricted)

## File Organization

### Key Configuration Files
- `src/cryptonote_config.h` - Network params, ports, addresses, constants
- `src/version.h` - Version declarations
- `src/version.cpp.in` - Version template (CMake generates .cpp)
- `cmake/Version.cmake` - Version generation logic

### RPC Implementation
- `src/rpc/core_rpc_server.h` - RPC handler declarations
- `src/rpc/core_rpc_server.cpp` - RPC handler implementations
- `src/rpc/core_rpc_server_commands_defs.h` - RPC command structures
- `src/rpc/daemon_handler.cpp` - Daemon RPC handlers
- `src/rpc/rpc_version_str.cpp` - Version string validation

### Mining Implementation
- `src/cryptonote_basic/miner.cpp` - Miner logic and pirate messages
- `src/cryptonote_core/cryptonote_tx_utils.cpp` - Block rewards, PoW validation

## Development Conventions

### Version Management
- Keep MONERO_VERSION variables for compatibility (used throughout codebase)
- Add PIRATEBOOTY_* aliases where appropriate
- CMake generates version.cpp from version.cpp.in template
- Version format: "Black Pearl" (pirate-themed release names)

### Code Comments
- When modifying RPC: Add "// Pirate Booty:" prefix to clarify custom logic
- Document block version checks (e.g., `>= 13` for Pirate Hash)
- Reference algorithm specifications in comments

### Testing Priorities
1. RPC endpoints return correct algorithm info
2. Port assignments are distinct from Monero
3. Pirate-themed messages display correctly
4. Version reporting shows "piratebooty" not "monero"

## Build System

### CMake Structure
- Multi-stage Docker builds (builder + runtime)
- Submodule: `external/cuckoo/` for Cuckoo Cycle
- Generated files: `version.cpp` created at build time
- Non-root user: "pirate" (not "monero")

### Build Flags
- Block version 13+ enables Pirate Hash
- Standard Monero build flags apply
- Docker: Uses Debian base, optimized layers

## Compatibility Notes

### Monero Base
- Forked from Monero (maintains most core functionality)
- Ring signatures, stealth addresses, RingCT all intact
- Privacy features inherited from Monero

### Breaking Changes from Monero
- Different ports (19xxx vs 18xxx)
- Different PoW algorithm (Pirate Hash vs RandomX)
- Different address prefixes (from cryptonote_config.h)
- Different network IDs

### API Compatibility
- Most Monero RPC methods work as-is
- Additional endpoint: `/get_pirate_hash_info`
- Algorithm field reports "Pirate Hash" for v13+
- Software identification changed to "piratebooty"

## Documentation Standards

### RPC Documentation
- Include curl examples for all endpoints
- Show expected JSON responses
- Document pirate-themed error messages
- Provide integration guides (pools, exchanges)

### Code Documentation
- Comment custom Pirate Booty modifications
- Reference IMPLEMENTATION_SUMMARY.md for architecture
- Keep copyright headers (credit both Monero and Pirate Booty)

## Important Reminders

### When Adding Features
1. Use block version 13+ for Pirate Hash features
2. Maintain pirate theme in user-facing messages
3. Update RPC_INTEGRATION.md if adding endpoints
4. Use 19xxx ports for any mainnet services
5. Test that software identifies as "piratebooty"

### When Modifying Mining
1. Keep pirate-themed console messages
2. Report "Pirate Hash" in mining status
3. Reference "pirates" not "threads" in messages
4. Use nautical emoji (🏴‍☠️, ⚓) consistently

### When Changing Network Params
1. Update all three networks (main/test/stage)
2. Maintain port number patterns (19xxx, 29xxx, 39xxx)
3. Update cryptonote_config.h as single source of truth
4. Document changes in relevant docs/

## Project Status
- ✅ Core blockchain implementation complete
- ✅ Pirate Hash PoW integrated
- ✅ RPC customization complete
- ✅ Docker build system ready
- 🔄 Testnet deployment pending
- 🔄 Wallet implementations pending
- 🔄 Block explorer pending

---

🏴‍☠️ **"The seas belong to the miners!"** 🏴‍☠️