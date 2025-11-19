# QuickVote - Decentralized Voting Platform

> **Make voting accessible anytime, everywhere. Engage, Vote, Proceed.**

QuickVote is a blockchain-powered decentralized voting platform that ensures transparency, security, and immutability in the voting process. Built with Solidity smart contracts and a modern Next.js frontend, QuickVote provides a seamless voting experience with real-time results and comprehensive analytics.

## 🌟 Features

### Core Functionality
- **Blockchain-Powered Voting**: Every vote is recorded on an immutable blockchain ledger, ensuring complete transparency and preventing tampering
- **Role-Based Access Control**: Secure registrar system for managing elections and candidates
- **One Vote Per Address**: Prevents double voting through blockchain verification
- **Real-Time Results**: Instant vote counting and result updates
- **Time-Limited Elections**: Configurable voting periods (default: 7 days)
- **Tie Handling**: Supports multiple winners in case of ties

### User Experience
- **Modern UI/UX**: Beautiful, responsive design built with Tailwind CSS and Radix UI
- **Wallet Integration**: Seamless Web3 wallet connection via Reown AppKit (formerly WalletConnect)
- **Dark Mode Support**: Theme switching with next-themes
- **Real-Time Analytics**: Interactive charts and statistics using Recharts
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Toast Notifications**: User-friendly notifications with Sonner

### Security Features
- **Access Control**: OpenZeppelin's AccessControl for secure role management
- **Immutable Records**: All votes are permanently recorded on-chain
- **Transparent Process**: Public view functions for auditability
- **Registrar Role Transfer**: Secure role management capabilities

## 🛠️ Tech Stack

### Smart Contracts
- **Solidity** `^0.8.14`
- **Hardhat** - Development environment and testing framework
- **OpenZeppelin Contracts** - Battle-tested security libraries
- **TypeScript** - Type-safe contract interactions
- **Ethers.js** - Ethereum library

### Frontend
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Accordion, Dialog, Label, Select, Slot, Tabs
- **Wagmi 2.19.2** - React Hooks for Ethereum
- **Viem 2.38.6** - TypeScript Ethereum library
- **Reown AppKit 1.8.13** - Wallet connection UI
- **React Hook Form 7.66.0** - Form management
- **Zod 4.1.12** - Schema validation
- **Recharts 3.3.0** - Chart library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **next-themes** - Theme management

## 📁 Project Structure

```
QuickVote/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── admin/       # Admin panel page
│   │   │   ├── vote/        # Voting page
│   │   │   ├── result/      # Results page
│   │   │   ├── contender/   # Contender list page
│   │   │   ├── config/      # App configuration
│   │   │   ├── context/     # React context providers
│   │   │   └── layout.tsx   # Root layout
│   │   ├── components/      # React components
│   │   │   ├── admin/       # Admin-specific components
│   │   │   ├── contender/   # Contender components
│   │   │   ├── results/     # Results components
│   │   │   ├── shared/      # Shared components
│   │   │   ├── ui/          # UI primitives
│   │   │   └── voting/      # Voting components
│   │   ├── contracts/       # Contract ABIs and types
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useContenders.ts
│   │   │   ├── useIsRegistrar.ts
│   │   │   ├── useVoteStatus.ts
│   │   │   └── useVotingContract.ts
│   │   └── lib/             # Utility functions
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
└── smartcontract/           # Solidity smart contracts
    ├── contracts/
    │   └── vote.sol         # Main VotingContract
    ├── scripts/
    │   └── deploy.ts        # Deployment script
    ├── test/
    │   └── VotingContract.ts # Contract tests
    ├── hardhat.config.ts    # Hardhat configuration
    ├── package.json
    └── tsconfig.json
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **MetaMask** or another Web3 wallet (for testing)
- **Alchemy/Infura account** (for testnet deployment)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd QuickVote
```

### 2. Install Smart Contract Dependencies

```bash
cd smartcontract
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Smart Contract Configuration

1. Create a `.env` file in the `smartcontract/` directory:

```bash
cd smartcontract
touch .env
```

2. Add your environment variables:

```env
ALCHEMY_SEPOLIA_API_KEY_URL=https://sepolia.infura.io/v3/YOUR_KEY
ACCOUNT_PRIVATE_KEY=your_private_key_without_0x_prefix
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Frontend Configuration

1. Update the contract address in `frontend/src/app/config/index.tsx`:

```typescript
export const VOTING_CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
```

2. Configure your network settings in the app configuration file.

## 🧪 Development

### Running Smart Contract Tests

```bash
cd smartcontract
npx hardhat test
```

### Compiling Smart Contracts

```bash
cd smartcontract
npx hardhat compile
```

### Deploying Smart Contracts

#### Local Network

```bash
cd smartcontract
npx hardhat node  # Start local node in one terminal
npx hardhat run scripts/deploy.ts --network localhost  # Deploy in another terminal
```

#### Testnet (Sepolia)

```bash
cd smartcontract
npx hardhat run scripts/deploy.ts --network sepolia
```

#### Base Sepolia

```bash
cd smartcontract
npx hardhat run scripts/deploy.ts --network baseSepolia
```

### Running the Frontend

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
cd frontend
npm run build
npm start
```

## 📖 Usage Guide

### For Administrators (Registrars)

1. **Connect Wallet**: Connect your Web3 wallet that has registrar permissions
2. **Access Admin Panel**: Navigate to `/admin`
3. **Register Contenders**:
   - Enter contender address and unique code
   - Click "Register Contender"
   - Register multiple contenders as needed
4. **Start Voting**: Once all contenders are registered, click "Start Voting"
5. **Monitor Results**: View real-time statistics and vote counts
6. **End Voting**: After the voting period ends, click "End Voting" to finalize results

### For Voters

1. **Connect Wallet**: Connect your Web3 wallet
2. **Navigate to Vote Page**: Go to `/vote`
3. **View Contenders**: Browse all registered contenders
4. **Cast Vote**: Select a contender by their code and submit your vote
5. **View Results**: Check `/result` for real-time voting results and analytics

## 🔐 Smart Contract Details

### Key Functions

#### Registrar Functions
- `registerContender(address, string)` - Register a single contender
- `registerMultipleContenders(address[], string[])` - Register multiple contenders
- `startVoting()` - Start the voting period
- `endVoting()` - End voting and determine winners
- `transferRegistrarRole(address)` - Transfer registrar role

#### Voting Functions
- `vote(string code)` - Cast a vote for a contender by code

#### View Functions
- `getContender(string code)` - Get contender details by code
- `getContenderByAddress(address)` - Get contender details by address
- `getAllContenders()` - Get all contender addresses
- `getVoteCounts()` - Get vote counts for all contenders
- `getWinners()` - Get winners after voting ends
- `getTimeRemaining()` - Get remaining voting time
- `hasVotingExpired()` - Check if voting has expired

### Events

- `ContenderRegistered(address indexed, string)` - Emitted when a contender is registered
- `VoteSuccess(address indexed, address indexed, string)` - Emitted when a vote is cast
- `VotingEnded(address[], uint32)` - Emitted when voting ends
- `RegistrarRoleTransferred(address indexed, address indexed)` - Emitted when registrar role is transferred

### Security Features

- **Access Control**: Uses OpenZeppelin's AccessControl for role management
- **One Vote Per Address**: Prevents double voting
- **Time Restrictions**: Voting can only occur during active period
- **Input Validation**: Validates all inputs before processing

## 🧩 Frontend Architecture

### Custom Hooks

- **`useVotingContract()`** - Provides contract instance and read/write functions
- **`useContenders()`** - Fetches and manages contender data
- **`useContenderDetails(address)`** - Fetches details for a specific contender
- **`useVoteStatus()`** - Tracks voting status and time remaining
- **`useIsRegistrar()`** - Checks if connected wallet has registrar role

### Component Structure

- **Pages**: Route-level components in `app/`
- **Features**: Feature-specific components in `components/`
- **UI Primitives**: Reusable UI components in `components/ui/`
- **Shared**: Common components in `components/shared/`

## 🧪 Testing

### Smart Contract Tests

The smart contract includes comprehensive tests covering:
- Contender registration
- Voting functionality
- Access control
- Time restrictions
- Winner determination
- Edge cases

Run tests with:
```bash
cd smartcontract
npx hardhat test
```

## 🚢 Deployment

### Smart Contract Deployment

1. Ensure your `.env` file is configured
2. Deploy to your target network:
   ```bash
   npx hardhat run scripts/deploy.ts --network <network-name>
   ```
3. Copy the deployed contract address
4. Update the frontend configuration with the new address

### Frontend Deployment

#### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

#### Other Platforms

```bash
cd frontend
npm run build
# Deploy the .next folder to your hosting platform
```

## 🔍 Verification

Verify your smart contract on Etherscan:

```bash
cd smartcontract
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## 📝 License

This project is licensed under the UNLICENSED license. See the contract files for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the repository.

## 🎯 Roadmap

- [ ] Multi-chain support
- [ ] Gasless voting options
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Voting delegation
- [ ] Snapshot integration
- [ ] IPFS integration for metadata

## 🙏 Acknowledgments

- OpenZeppelin for security libraries
- Next.js team for the amazing framework
- Radix UI for accessible components
- Reown (WalletConnect) for wallet integration

---

**Built with ❤️ for transparent and secure voting**
