# 🏴‍☠️ Pirate Booty GUI Wallet - Mining Guide

Complete guide to using the built-in mining interface.

## Overview

The Pirate Booty GUI Wallet includes a fully integrated mining interface that allows you to mine PBT directly from the wallet application. No separate mining software needed!

## Features

### ✅ Implemented Features

- **Start/Stop Mining**: One-click mining control
- **Thread Management**: Adjust CPU threads used for mining
- **Background Mining**: Mine when your computer is idle
- **Real-time Statistics**: Live hash rate and mining stats
- **Block Notifications**: Track blocks you've found
- **Algorithm Information**: Detailed Pirate Hash specs
- **Network Statistics**: Current difficulty and block rewards
- **Estimated Time to Block**: Calculate expected mining time
- **Mining History**: Track your mining performance

## Getting Started

### Prerequisites

1. **Synced Wallet**: Ensure your wallet is fully synchronized
2. **Daemon Running**: piratebootyd must be running and connected
3. **Mining Address**: Have a valid PBT address (primary address by default)

### Step-by-Step Guide

#### 1. Navigate to Mining Tab

Click the "Mining" option in the sidebar navigation.

#### 2. Configure Mining Settings

**Mining Address:**
- Default: Your primary wallet address
- Can be changed to any valid PBT address
- Click "Use Primary" to reset to main address

**Mining Threads (Pirates):**
- Adjust slider to set number of CPU threads
- More threads = higher hash rate (but more CPU usage)
- Recommended: Leave 1-2 threads for system use
- Maximum: Based on your CPU core count

**Background Mining:**
- ☑️ Enable to mine only when computer is idle
- Configure idle threshold (default: 5 minutes)
- Set minimum idle time (default: 30 seconds)
- Option to ignore battery status (laptop users)

#### 3. Start Mining

1. Review your configuration
2. Click **"🏴‍☠️ Start Mining"** button
3. Wait for confirmation
4. Monitor hash rate in real-time

#### 4. Monitor Performance

**Mining Status Card:**
- Current status (Mining/Not Mining)
- Real-time hash rate
- Number of active threads
- Blocks found
- Total mining time
- Average hash rate

**Network Statistics:**
- Current network difficulty
- Block reward amount
- Estimated time to find block
- Network hash rate

**Mining History:**
- Total blocks found
- Last block timestamp
- Total hashes computed
- Performance metrics

#### 5. Stop Mining

Click **"⚓ Stop Mining"** to stop the mining process. Statistics are preserved.

## Understanding Mining

### Pirate Hash Algorithm

Pirate Booty uses a hybrid Proof-of-Work algorithm called **Pirate Hash**:

**Phase 1: Cuckoo Cycle**
- Memory-hard algorithm
- EDGEBITS: 29
- 42-cycle proof requirement
- ~512 MB memory required
- ASIC resistant

**Phase 2: CryptoNight-R (Variant 4)**
- CPU-friendly
- Cache-hard
- Additional ASIC resistance

**Benefits:**
- ✅ True ASIC resistance
- ✅ GPU and CPU mining viable
- ✅ Fair distribution
- ✅ Energy efficient

### Mining Economics

**Block Rewards (Emission Schedule):**
- Early Era (0-1M): 500 PBT per block
- Mid Era (1M-2M): 250 PBT per block
- Late Era (2M-3M): 125 PBT per block
- Final (3M-4M): 62.5 PBT per block
- Tail Emission: 3.0 PBT per block (perpetual)

**Block Time:**
- Target: 60 seconds per block
- Adjusts with difficulty

**Difficulty:**
- Automatically adjusts to maintain block time
- Higher difficulty = more time to find blocks
- Network hash rate determines difficulty

## Performance Optimization

### CPU Thread Selection

**Low-End Systems (2-4 cores):**
```
Recommended: 1-2 threads
Leave cores for: System operation
Hash Rate: ~100-500 H/s
```

**Mid-Range Systems (4-8 cores):**
```
Recommended: 2-4 threads
Leave cores for: System + other apps
Hash Rate: ~500-2000 H/s
```

**High-End Systems (8+ cores):**
```
Recommended: 4-8 threads
Leave cores for: Maximum flexibility
Hash Rate: ~2000-5000+ H/s
```

### Background Mining

**When to Use:**
- You want to mine without impacting daily use
- Computer is often idle (nights, weekends)
- Mining on a work computer (off-hours only)

**Configuration Tips:**
- Set idle threshold to 5-10 minutes
- Use 50-75% of available threads
- Monitor system temperature
- Disable on battery for laptops

### Maximizing Hash Rate

**Software Optimizations:**
1. Close unnecessary applications
2. Disable power-saving mode
3. Ensure adequate cooling
4. Keep drivers updated
5. Use dedicated mining periods

**Hardware Considerations:**
- More cores = higher potential hash rate
- Newer CPUs generally faster
- Memory speed impacts Cuckoo Cycle
- SSD vs HDD minimal impact

## Troubleshooting

### Mining Won't Start

**Error: "Invalid treasure chest address"**
```
Solution: Verify your mining address is valid
- Click "Use Primary" to reset
- Ensure wallet is synced
```

**Error: "Too many pirates for this ship"**
```
Solution: Reduce thread count
- System may have fewer cores than selected
- Try 1-2 threads initially
```

**Error: "Pirates refused to set sail"**
```
Solution: Check daemon connection
- Verify piratebootyd is running
- Check network connection
- Restart daemon if needed
```

### Low Hash Rate

**Expected vs Actual:**
```bash
# Check CPU specs
- Verify core count
- Check CPU frequency
- Monitor temperature throttling
```

**Improvements:**
- Increase thread count (if cores available)
- Close background applications
- Check for thermal throttling
- Verify no other mining software running

### Mining Stops Unexpectedly

**Common Causes:**
1. Daemon disconnection
2. System sleep/hibernate
3. Power settings
4. Resource limits

**Solutions:**
- Disable system sleep while mining
- Check power management settings
- Monitor daemon logs
- Verify system stability

## Mining Statistics Explained

### Hash Rate
- **Instantaneous**: Current mining speed
- **Average**: Mean speed over session
- **Units**: H/s (hashes per second)

### Blocks Found
- Number of blocks you've successfully mined
- Adds block reward to your balance
- Displayed in mining history

### Estimated Time to Block
```
Formula: Difficulty / Your Hash Rate
Example: 1,000,000 / 1,000 H/s = 1,000 seconds (~16 minutes)
```

**Note:** This is an estimate. Actual time varies due to:
- Network difficulty changes
- Your hash rate fluctuations
- Mining luck (probability-based)

### Mining Efficiency
- Hashes per watt (advanced metric)
- Temperature impact on performance
- Uptime vs downtime ratio

## Safety & Best Practices

### System Health

**Monitor:**
- ✅ CPU temperature (keep under 80°C)
- ✅ System responsiveness
- ✅ Fan noise/cooling
- ✅ Power consumption

**Recommendations:**
- Don't mine 24/7 on laptops
- Ensure proper ventilation
- Use thermal monitoring tools
- Take breaks for system cooling

### Security

**Wallet Security:**
- ✅ Never share your seed phrase
- ✅ Use strong wallet password
- ✅ Keep wallet software updated
- ✅ Backup wallet regularly

**Mining Address:**
- Use primary address for simplicity
- Can use subaddress for privacy
- Verify address before starting

### Energy Considerations

**Power Usage:**
- Desktop: ~100-300W when mining
- Laptop: ~50-150W when mining
- Calculate cost: (Watts / 1000) × Hours × Rate

**Cost-Benefit:**
```
Example (US rates):
- Power: 200W × 24h = 4.8 kWh
- Cost: 4.8 × $0.12 = $0.576/day
- Mining: ~1-5 PBT/day (depends on network)
- Profitable if: PBT value > cost
```

## Advanced Features

### Mining Pools (Future)

Currently, the wallet mines solo. Future updates will support:
- Pool mining connections
- Stratum protocol support
- Pool statistics integration
- Automated payouts

### Mining Profiles

Create custom mining configurations:
- **Aggressive**: Maximum threads, always on
- **Balanced**: 50% threads, background only
- **Eco**: Minimal threads, strict idle requirements

### Alerts & Notifications

Configure alerts for:
- Block found
- Hash rate drops
- Mining stops unexpectedly
- Temperature warnings

## FAQ

**Q: Can I mine on multiple computers?**
A: Yes! Each can mine to the same address.

**Q: Do I need to keep the wallet open?**
A: Yes, the wallet controls the mining process.

**Q: Can I mine and use my computer?**
A: Yes, but leave some threads free for other tasks.

**Q: How long until I find a block?**
A: Depends on network difficulty and your hash rate. See estimated time in the interface.

**Q: Is solo mining profitable?**
A: Depends on your hash rate, electricity cost, and PBT price. Use the calculator in the interface.

**Q: Can I mine on a laptop?**
A: Yes, but monitor temperature and consider background mining only.

**Q: What if my daemon crashes while mining?**
A: Mining will stop. Restart daemon and resume mining.

**Q: Does background mining really work?**
A: Yes! It monitors system idle time and mines accordingly.

## Support

### Getting Help

- **Documentation**: Check this guide first
- **Discord**: Join community for mining tips
- **GitHub**: Report bugs and issues
- **Email**: support@piratebooty.io

### Reporting Issues

Include:
- Wallet version
- Operating system
- CPU specifications
- Error messages
- Mining configuration
- Logs (if available)

## Updates

The mining interface is actively developed. Check for:
- Performance improvements
- New features (pool support, etc.)
- Bug fixes
- UI enhancements

---

🏴‍☠️ **"Deploy your pirates and mine the blockchain seas!"** ⚓

## Quick Reference Card

```
Mining Controls
├── Start Mining: Configure settings → Click "Start Mining"
├── Stop Mining: Click "Stop Mining" button
├── Adjust Threads: Use slider (1 to max cores)
├── Background Mode: Enable checkbox + configure idle time
└── Monitor Stats: Watch real-time hash rate display

Key Metrics
├── Hash Rate: Your mining speed (H/s, KH/s, MH/s)
├── Difficulty: Network mining difficulty
├── Block Reward: Current reward per block
├── Est. Time: Expected time to find block
└── Blocks Found: Your successful blocks

Optimal Settings
├── Desktop (8+ cores): 4-6 threads, always on
├── Laptop (4-8 cores): 2-3 threads, background only
├── Low-end (2-4 cores): 1-2 threads, idle times only
└── Aggressive: Max threads - 2, constant mining
```

---

Happy mining! 🏴‍☠️⚓
