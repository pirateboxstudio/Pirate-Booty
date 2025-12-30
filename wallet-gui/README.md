# 🏴‍☠️ Pirate Booty GUI Wallet - Black Pearl Edition

Modern, privacy-focused desktop wallet for Pirate Booty (PBT) cryptocurrency.

## Features

### ✅ Implemented
- **Dashboard**: Balance overview, quick actions, recent transactions
- **Send**: Transfer PBT with pirate-themed interface
- **Receive**: QR codes, subaddress management
- **History**: Complete transaction log with filters
- **Mining**: Full mining interface with controls and statistics
- **Pirate Theme**: Nautical design with gold accents

### 🔄 Coming Soon
- Address book
- Settings & preferences
- Wallet creation wizard
- Seed phrase backup
- Hardware wallet support
- Mining pools support

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Tailwind CSS
- **State Management**: Zustand
- **Desktop**: Electron
- **Build Tool**: Vite
- **Charts**: Recharts
- **QR Codes**: react-qr-code

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- piratebooty-wallet-rpc (must be in PATH)

### Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run electron:dev

# Build for production
npm run electron:build
```

## Development

### Project Structure

```
wallet-gui/
├── electron/           # Electron main process
│   ├── main.ts        # Main process entry
│   └── preload.ts     # Preload script
├── src/
│   ├── components/    # React components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── pages/         # Page components
│   │   ├── Welcome.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Send.tsx
│   │   ├── Receive.tsx
│   │   └── History.tsx
│   ├── services/      # Business logic
│   │   └── walletRpc.ts
│   ├── store/         # State management
│   │   └── walletStore.ts
│   ├── types/         # TypeScript types
│   ├── utils/         # Utilities
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── package.json
└── vite.config.ts
```

### Running Locally

1. **Start wallet RPC server**:
```bash
piratebooty-wallet-rpc \
  --wallet-file ~/mywallet \
  --password "your-password" \
  --daemon-address 127.0.0.1:18081 \
  --rpc-bind-port 18083
```

2. **Start development server**:
```bash
npm run electron:dev
```

### Building

```bash
# Build for current platform
npm run electron:build

# Build directory only (for testing)
npm run build:dir
```

## Design System

### Colors

```css
/* Primary */
--navy-950: #0A1929;        /* Background */
--ocean: #1B3A52;            /* Secondary background */
--gold: #FFB300;             /* Accent/Primary actions */

/* Status */
--treasure: #4CAF50;         /* Success */
--danger: #F44336;           /* Error */
--warning: #FFC947;          /* Warning */
```

### Typography

- **Headers**: Bold, Gold (#FFB300)
- **Body**: Inter font, Off-white (#ECEFF1)
- **Monospace**: For addresses and hashes

### Components

All components follow Apple's design guidelines:
- Clean, minimal interfaces
- Generous spacing
- Clear hierarchy
- Smooth transitions
- Responsive feedback

## Features Guide

### Dashboard
- View total balance (locked + unlocked)
- Quick access to send/receive/history/mining
- Recent transaction list
- Network statistics

### Send Transaction
- Address validation
- Amount input with "Send All" button
- Priority selection (Slow/Standard/Fast)
- Payment ID support
- Local transaction notes
- Privacy settings display

### Receive
- Primary address with QR code
- Subaddress management
- One-click copy
- Address labeling

### Transaction History
- Full transaction log
- Filter by type (In/Out/Pending)
- Search by TX ID
- Export to CSV/JSON
- Privacy-preserving display

### Mining Interface
- Start/stop mining with one click
- Adjustable CPU thread count
- Background mining when idle
- Real-time hash rate monitoring
- Block found notifications
- Mining statistics and history
- Pirate Hash algorithm details
- Network difficulty tracking
- Estimated time to block

## Security

### Best Practices
- ✅ Password-protected wallet files
- ✅ No plaintext seed storage
- ✅ Secure keychain integration
- ✅ Auto-lock on idle
- ✅ Privacy by default

### What We DON'T Store
- ❌ Passwords (in memory only)
- ❌ Private keys (encrypted only)
- ❌ Seed phrases (shown once)
- ❌ Transaction analytics
- ❌ User tracking data

## Troubleshooting

### Wallet Won't Connect
```bash
# Check if wallet RPC is running
curl -X POST http://127.0.0.1:18083/json_rpc \
  -d '{"jsonrpc":"2.0","id":"0","method":"get_height"}'
```

### Balance Not Updating
- Ensure daemon is synced
- Check network connection
- Restart wallet RPC server

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Functional components with hooks
- Descriptive variable names
- Comments for complex logic

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

## Roadmap

### v1.1.0 (Next)
- [ ] Complete wallet creation wizard
- [ ] Seed phrase backup/restore
- [ ] Mining interface
- [ ] Address book functionality
- [ ] Full settings panel

### v1.2.0
- [ ] Hardware wallet support (Ledger/Trezor)
- [ ] Multi-signature wallets
- [ ] Payment requests/invoices
- [ ] Advanced transaction history

### v2.0.0
- [ ] Mobile companion app
- [ ] Watch-only wallets
- [ ] Merchant tools
- [ ] Lightning-style payments

## License

MIT License - See LICENSE file

## Support

- **Website**: https://piratebooty.io
- **GitHub**: https://github.com/piratebooty/pirate-booty
- **Discord**: Join our community
- **Email**: support@piratebooty.io

---

🏴‍☠️ **"Your treasure chest awaits!"** 🏴‍☠️
