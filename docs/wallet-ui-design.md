# 🏴‍☠️ Pirate Booty Wallet UI Design

## Design Philosophy
- **Pirate-themed** but professional
- **Dark theme** with gold/treasure accents
- **Intuitive** navigation
- **Modern** material design principles
- **Maritime** visual elements

## Color Palette

### Primary Colors
- **Background:** `#1B1C20` (Deep ocean black)
- **Surface:** `#2A2D35` (Dark ship hull)
- **Primary:** `#FFD700` (Pirate gold)
- **Secondary:** `#C77D31` (Treasure bronze)
- **Accent:** `#FF6B35` (Sunset orange)

### Text Colors
- **Primary Text:** `#FFFFFF` (White)
- **Secondary Text:** `#B0B3B8` (Light gray)
- **Disabled:** `#6B6E73` (Dark gray)

### Status Colors
- **Success:** `#4CAF50` (Green seas)
- **Warning:** `#FFC107` (Amber alert)
- **Error:** `#F44336` (Red flag)
- **Info:** `#2196F3` (Ocean blue)

## Main Screens

### 1. Dashboard / Overview
```
┌────────────────────────────────────────────────────────┐
│  🏴‍☠️ PIRATE BOOTY WALLET          [Settings] [Help]    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ╔══════════════════════════════════════════════════╗ │
│  ║  💰 TREASURE CHEST                                ║ │
│  ║                                                   ║ │
│  ║     12,345.6789 PBT                              ║ │
│  ║     ≈ $123,456.78 USD                            ║ │
│  ║                                                   ║ │
│  ║  [⚓ Receive]  [⛵ Send]  [🗺️ History]           ║ │
│  ╚══════════════════════════════════════════════════╝ │
│                                                        │
│  ┌─ QUICK STATS ──────────────────────────────────┐  │
│  │  Unlocked:     12,245.6789 PBT                 │  │
│  │  Locked:         100.0000 PBT (2 blocks)       │  │
│  │  Network:       ⚫ Connected (10 peers)         │  │
│  │  Sync Status:   ████████████████░░ 95%         │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─ RECENT VOYAGES ───────────────────────────────┐  │
│  │  ⬆️ Sent      -50.0 PBT    2 min ago           │  │
│  │  ⬇️ Received  +125.5 PBT   1 hour ago          │  │
│  │  ⬆️ Sent      -25.0 PBT    3 hours ago         │  │
│  │  ⬇️ Received  +500.0 PBT   1 day ago           │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  [Dashboard] [Send] [Receive] [History] [Mine] [⚙️]   │
└────────────────────────────────────────────────────────┘
```

### 2. Send Transaction Screen
```
┌────────────────────────────────────────────────────────┐
│  ⛵ SEND TREASURE                          [← Back]     │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Recipient Address                                     │
│  ┌──────────────────────────────────────────────────┐ │
│  │ PBT1x7kPirateBootyAddressAhoyMatey...          📋│ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Amount to Send                                        │
│  ┌──────────────────────────┐  [Send All]            │
│  │ 100.0                  PBT│                        │
│  └──────────────────────────┘                         │
│  ≈ $1,000.00 USD                                      │
│                                                        │
│  Priority                                             │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ● Slow (0.0001 PBT)                              │ │
│  │ ○ Normal (0.001 PBT)                             │ │
│  │ ○ Fast (0.01 PBT)                                │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Payment ID (Optional)                                │
│  ┌──────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌─ TRANSACTION SUMMARY ───────────────────────────┐ │
│  │  Amount:        100.0000 PBT                     │ │
│  │  Fee:             0.0010 PBT                     │ │
│  │  ─────────────────────────────                   │ │
│  │  Total:         100.0010 PBT                     │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│        [Cancel]        [🏴‍☠️ Set Sail (Send)]          │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 3. Receive Screen
```
┌────────────────────────────────────────────────────────┐
│  ⚓ RECEIVE TREASURE                       [← Back]     │
├────────────────────────────────────────────────────────┤
│                                                        │
│         ┌─────────────────────────────┐               │
│         │                             │               │
│         │       ████████████          │               │
│         │       ██  QR  ██            │               │
│         │       ██ CODE ██            │               │
│         │       ████████████          │               │
│         │                             │               │
│         └─────────────────────────────┘               │
│                                                        │
│  Your Treasure Map (Address)                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │ PBT1x7kPirateBootyAddressAhoyMatey456789...    📋│ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Amount (Optional)                                    │
│  ┌──────────────────────────┐                        │
│  │                        PBT│                        │
│  └──────────────────────────┘                         │
│                                                        │
│  Message (Optional)                                   │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Payment for treasure map                         │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│         [Generate New Address] [Copy URI]             │
│                                                        │
│  💡 Tip: Share this address to receive PBT            │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 4. Mining Dashboard
```
┌────────────────────────────────────────────────────────┐
│  ⛏️ MINING OPERATIONS                     [← Back]     │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Mining Status: 🟢 ACTIVE                             │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Hashrate:      1,234 H/s                        │ │
│  │  Threads:       4 / 8 available                  │ │
│  │  Difficulty:    1,234,567,890                    │ │
│  │  Last Block:    5 minutes ago                    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌─ BOOTY MINED TODAY ─────────────────────────────┐ │
│  │                                                   │ │
│  │           🪙  145.50 PBT                         │ │
│  │           ≈ $1,455.00 USD                        │ │
│  │                                                   │ │
│  │  Blocks Found: 3                                 │ │
│  │  Average Time: 2.5 hours per block              │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Thread Configuration                                 │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Mining Threads: [■■■■□□□□] 4                   │ │
│  │  Intensity:      [■■■■■■■□] High                │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│        [⏸️ Pause Mining]     [⚙️ Configure]           │
│                                                        │
│  ┌─ RECENT BLOCKS FOUND ───────────────────────────┐ │
│  │  Block 123,456  +50.0 PBT   5 min ago           │ │
│  │  Block 123,442  +50.0 PBT   2 hours ago         │ │
│  │  Block 123,398  +50.0 PBT   5 hours ago         │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 5. Transaction History
```
┌────────────────────────────────────────────────────────┐
│  🗺️ VOYAGE LOG (History)                 [← Back]     │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [All] [Received] [Sent] [Mining]     🔍 [Search...]  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ⬆️ SENT                              Dec 22, 2024 │ │
│  │ -50.0000 PBT                          Confirmed   │ │
│  │ To: PBT1abc...xyz123                             │ │
│  │ Fee: 0.0010 PBT                      [Details >] │ │
│  ├──────────────────────────────────────────────────┤ │
│  │ ⬇️ RECEIVED                          Dec 22, 2024 │ │
│  │ +125.5000 PBT                         Confirmed   │ │
│  │ From: PBT1def...uvw456                           │ │
│  │ Height: 123,456                      [Details >] │ │
│  ├──────────────────────────────────────────────────┤ │
│  │ ⛏️ MINED                             Dec 21, 2024 │ │
│  │ +500.0000 PBT                         Confirmed   │ │
│  │ Block: 123,400                                   │ │
│  │ Reward + Fee                         [Details >] │ │
│  ├──────────────────────────────────────────────────┤ │
│  │ ⬆️ SENT                              Dec 21, 2024 │ │
│  │ -25.0000 PBT                          Confirmed   │ │
│  │ To: PBT1ghi...rst789                             │ │
│  │ Fee: 0.0010 PBT                      [Details >] │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  [< Previous]  Page 1 of 42  [Next >]                │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## UI Components

### Navigation Bar
- Persistent bottom navigation (mobile) or side navigation (desktop)
- Icons with pirate theme:
  - Dashboard: 🏴‍☠️
  - Send: ⛵
  - Receive: ⚓
  - History: 🗺️
  - Mine: ⛏️
  - Settings: ⚙️

### Loading States
- Ship sailing animation
- Waves animation
- "Navigating the blockchain seas..."
- "Hoisting the sails..."
- "Searching for treasure..."

### Empty States
- "No treasure yet! Start receiving PBT"
- "No voyages recorded"
- Friendly pirate illustrations

### Notifications
- Toast messages with pirate flair:
  - Success: "⚓ Transaction anchored!"
  - Error: "🏴‍☠️ Rough seas ahead..."
  - Info: "📯 Ahoy! New block found"

## Responsive Design

### Desktop (1920x1080+)
- Full sidebar navigation
- Multi-column layout
- Detailed charts and graphs
- Advanced features visible

### Tablet (768x1024)
- Collapsible sidebar
- Two-column layout
- Simplified charts
- Touch-optimized controls

### Mobile (375x667)
- Bottom navigation bar
- Single-column layout
- Swipe gestures
- Essential features only

## Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode
- Adjustable font sizes

## Animations
- Smooth page transitions (300ms)
- Micro-interactions on buttons
- Balance count-up animations
- Progress indicators
- Loading skeletons

## Typography
- **Headers:** Inter Bold, 24-32px
- **Body:** Inter Regular, 14-16px
- **Numbers:** Roboto Mono, 16-20px
- **Accent:** Pirata One (pirate-themed headers)

## Icons
- Material Design Icons base set
- Custom pirate-themed icons:
  - Treasure chest for balance
  - Ship for sending
  - Anchor for receiving
  - Map for history
  - Pickaxe for mining
  - Compass for navigation
  - Cannon for advanced features

## Implementation Stack
- **Framework:** React or Vue.js
- **UI Library:** Material-UI or Vuetify
- **Charts:** Chart.js or D3.js
- **QR Codes:** qrcode.react
- **Animations:** Framer Motion
- **State Management:** Redux or Vuex
- **API:** Pirate Booty RPC

## Security Features
- Password/PIN protection
- Biometric authentication (mobile)
- Session timeout
- Clipboard protection
- Secure storage (encrypted)
- Address verification
- Transaction confirmation

## Future Enhancements
- Multi-wallet support
- Hardware wallet integration
- Address book
- Contact management
- Price alerts
- Portfolio tracking
- NFT support (future)
- Staking interface (if implemented)
