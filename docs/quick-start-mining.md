# 🏴‍☠️ Pirate Booty - Quick Start Mining Guide

## 🚀 Start Mining in 3 Easy Steps!

### Step 1: Download & Install Wallet
```bash
# Download from https://piratebooty.io/download
# Or build from source:
git clone https://github.com/piratebooty/pirate-booty.git
cd pirate-booty
mkdir build && cd build
cmake ..
make
```

### Step 2: Create Your Wallet
```bash
# Launch wallet
./pirate-wallet-gui

# Or CLI:
./pirate-wallet-cli --generate-new-wallet mywallet
```

### Step 3: Click "START MINING"
- Open wallet
- Go to Mining tab
- Click "🚀 START MINING"
- That's it! You're mining PBT!

---

## 💡 Mining Modes

### 🌟 Light Mining (Recommended for Beginners)
- **1-2 threads**
- **Low CPU usage** (10-20%)
- **Perfect for:** Daily computer use, laptops
- **Earnings:** ~0.5 PBT/day

```
[Settings] → Mining Intensity → Light
```

### ⚡ Balanced Mining (Recommended)
- **4-6 threads**
- **Medium CPU usage** (40-60%)
- **Perfect for:** Background mining, home computers
- **Earnings:** ~2.5 PBT/day

```
[Settings] → Mining Intensity → Balanced
```

### 🔥 Maximum Mining (Advanced)
- **All threads**
- **High CPU usage** (90-100%)
- **Perfect for:** Dedicated mining rigs
- **Earnings:** ~5-10 PBT/day

```
[Settings] → Mining Intensity → Maximum
```

---

## 🎮 Smart Mining Features

### Auto-Pause When Gaming
```
[Settings] → Smart Mining → [✓] Pause when gaming
```
Wallet automatically detects when you're playing games and pauses mining.

### Battery Saver (Laptops)
```
[Settings] → Smart Mining → [✓] Battery Aware
```
Automatically pauses mining when:
- Battery < 20%
- Not plugged in (optional)

### Background Mode
```
[Settings] → Smart Mining → [✓] Mine when idle
```
Only mines when your computer is idle (>60% CPU free).

### Thermal Protection
```
[Settings] → Smart Mining → [✓] Thermal Protection
```
Automatically reduces threads if CPU temperature > 80°C.

---

## 📊 Understanding Your Stats

### Hash Rate
- **What it is:** Mining speed (hashes per second)
- **Good rate:**
  - 4-core CPU: 200-500 H/s
  - 8-core CPU: 500-1,500 H/s
  - 16-core CPU: 1,000-3,000 H/s

### Blocks Found
- **What it is:** Number of blocks you've successfully mined
- **Average time:** 
  - Solo mining: ~2-24 hours per block (depends on hash rate)
  - Pool mining: Shares every few minutes

### Earnings
- **Block Reward:** 
  - Early Era: 500 PBT per block
  - Mid Era: 250 PBT per block
  - Late Era: 125 PBT per block
  - Final Era: 62.5 PBT per block

---

## 🎯 Optimization Tips

### 1. Close Background Apps
```
Before mining:
  ✓ Close Chrome/Firefox (if not needed)
  ✓ Close Discord/Slack (if not needed)
  ✓ Stop video streaming
```

### 2. Optimal Thread Count
```
Rule of thumb:
  Total CPU Cores - 1 or 2 = Optimal threads

Examples:
  4 cores  → Use 2-3 threads
  8 cores  → Use 6-7 threads
  16 cores → Use 14-15 threads
```

### 3. Keep System Cool
```
✓ Clean dust from fans
✓ Ensure good airflow
✓ Use laptop cooling pad
✓ Monitor temperatures
```

### 4. Use SSD for Blockchain
```
Store blockchain on SSD for:
  ✓ Faster sync
  ✓ Better performance
  ✓ Reduced latency
```

---

## 🏊 Pool Mining vs Solo Mining

### Solo Mining (Default)
**Pros:**
- ✅ Keep 100% of rewards
- ✅ No pool fees
- ✅ Support decentralization
- ✅ More privacy

**Cons:**
- ❌ Irregular payouts
- ❌ Longer time between blocks
- ❌ Need more hash power

**Recommended for:** Users with good hardware, patient miners

### Pool Mining (Optional)
**Pros:**
- ✅ Regular payouts
- ✅ Predictable earnings
- ✅ Good for low hash rate
- ✅ Combined mining power

**Cons:**
- ❌ Pool fees (1-3%)
- ❌ Less decentralization
- ❌ Trust pool operator

**Recommended for:** Beginners, users with limited hardware

#### How to Join a Pool:
```
1. Go to [Settings] → Pool Configuration
2. Enable [✓] Use Mining Pool
3. Enter pool address: pool.piratebooty.io:3333
4. Enter worker name: YourName
5. Click [Start Mining]
```

---

## 🔧 Troubleshooting

### "Low Hash Rate"
```
Possible causes:
  - Too many background apps
  - Not enough threads allocated
  - CPU thermal throttling
  - Background mode enabled

Solutions:
  ✓ Close unnecessary apps
  ✓ Increase thread count
  ✓ Check CPU temperature
  ✓ Disable background mode
```

### "Mining Stopped Automatically"
```
Possible causes:
  - Battery saver activated
  - Thermal protection triggered
  - Gaming mode detected
  - System went to sleep

Solutions:
  ✓ Plug in laptop
  ✓ Improve cooling
  ✓ Disable auto-pause features
  ✓ Adjust power settings
```

### "No Blocks Found Yet"
```
This is normal! Solo mining can take time.

Average time to find block:
  Network Hash Rate: 100 MH/s
  Your Hash Rate: 1,000 H/s
  Your Share: 0.001%
  Expected Time: ~10-20 hours per block

Be patient or try pool mining for faster rewards!
```

### "High CPU Temperature"
```
Solutions:
  ✓ Reduce thread count
  ✓ Enable thermal protection
  ✓ Clean computer fans
  ✓ Improve room ventilation
  ✓ Use laptop cooling pad
```

---

## 💰 Earnings Calculator

### Estimate Your Daily Earnings

```
Formula:
  Daily PBT = (Your Hashrate / Network Hashrate) × Blocks Per Day × Block Reward

Example:
  Your Hashrate: 1,000 H/s
  Network Hashrate: 100 MH/s (100,000,000 H/s)
  Blocks Per Day: 1,440 (60-second blocks)
  Block Reward: 500 PBT
  
  Daily PBT = (1,000 / 100,000,000) × 1,440 × 500
            = 0.00001 × 1,440 × 500
            = 7.2 PBT/day
```

### Online Calculator
Visit: https://piratebooty.io/calculator
- Enter your hash rate
- See estimated earnings
- Compare different scenarios

---

## 📱 Mobile Mining

### iOS/Android Wallet
```
✓ Light mining (1-2 threads)
✓ WiFi-only mode
✓ Charging-only mode
✓ Battery temperature monitoring
✓ Background restrictions

Expected earnings: 0.1-0.5 PBT/day
```

**Note:** Mobile mining is optional and limited to protect your device.

---

## 🎓 Advanced Topics

### Command Line Mining
```bash
# Start mining with CLI
./pirate-wallet-cli --wallet-file mywallet

# In wallet:
start_mining 4  # Start with 4 threads
mining_status   # Check status
stop_mining     # Stop mining
```

### RPC Mining Control
```bash
# Start mining via RPC
curl -X POST http://localhost:18082/json_rpc \
  -d '{"jsonrpc":"2.0","id":"0","method":"start_mining",
       "params":{"threads_count":4}}'

# Get mining status
curl -X POST http://localhost:18082/json_rpc \
  -d '{"jsonrpc":"2.0","id":"0","method":"mining_status"}'
```

### Docker Mining
```bash
# Mine with Docker container
docker run -d \
  --name pbt-miner \
  -v pbt-wallet:/wallet \
  piratebooty:latest \
  pirate-wallet-cli --daemon-address node.piratebooty.io:18081 \
  --wallet-file /wallet/mywallet \
  --start-mining 4
```

---

## 🏆 Mining Achievements

Track your progress:

### 🥉 Rookie Miner
- Find your first block
- Earn 500 PBT

### 🥈 Seasoned Sailor
- Mine for 7 days
- Find 10 blocks
- Earn 5,000 PBT

### 🥇 Pirate Captain
- Mine for 30 days
- Find 50 blocks
- Earn 25,000 PBT

### 👑 Legendary Buccaneer
- Mine for 365 days
- Find 500 blocks
- Earn 250,000 PBT

---

## 🤝 Community & Support

### Get Help
- **Discord:** https://discord.gg/piratebooty
- **Reddit:** r/piratebooty
- **Telegram:** @PirateBootyOfficial
- **Forum:** https://forum.piratebooty.io

### Share Your Setup
Post your mining rig on:
- Twitter: #PirateBootyMining
- Reddit: r/piratebooty
- Discord: #mining-rigs

### Mining Pools List
Official pools at: https://piratebooty.io/pools

---

## 📖 FAQ

**Q: Is mining profitable?**
A: Yes! With built-in wallet mining, you have zero overhead. Any PBT you earn is profit.

**Q: Will mining damage my computer?**
A: No, if you use thermal protection and reasonable thread counts.

**Q: Can I mine on multiple computers?**
A: Yes! Mine to the same wallet address from multiple devices.

**Q: Does mining use a lot of electricity?**
A: A typical 4-core CPU mining uses 50-100W, similar to gaming.

**Q: When will I get my first reward?**
A: Solo mining: Could take hours to days. Pool mining: Minutes to hours.

**Q: Can I mine and use my computer?**
A: Yes! Use Light or Balanced mode with background mining enabled.

---

## 🎉 Success Stories

### From the Community:

> *"Started mining on day 1 with my old laptop. Found 3 blocks in the first week!"*
> - @CryptoSailor

> *"Using background mode on my work computer. Earning 2 PBT/day passively!"*
> - @BootypHunter

> *"Built a 16-core mining rig. Getting 10-15 PBT daily!"*
> - @MiningCaptain

---

## 🚀 Ready to Mine?

1. Open Pirate Booty Wallet
2. Go to Mining tab
3. Click "START MINING"
4. Watch your booty grow!

🏴‍☠️ **"The seas belong to the miners!"** 🏴‍☠️

---

**Need help?** Join our Discord: https://discord.gg/piratebooty
