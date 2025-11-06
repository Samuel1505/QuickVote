# QuickVote Frontend Setup

## Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update the following variables in `.env.local`:

### NEXT_PUBLIC_PROJECT_ID
Get your Reown AppKit project ID from [https://dashboard.reown.com](https://dashboard.reown.com)

### NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS
After deploying your VotingContract to Base Sepolia (or your chosen network), add the contract address here.

Example:
```
NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS=
```

## Admin Access

The Admin navigation link will only appear when:
1. A wallet is connected
2. The connected wallet address has the REGISTRAR_ROLE in the VotingContract

The REGISTRAR_ROLE is automatically granted to the address that deploys the contract (the constructor grants it to `msg.sender`).

## How It Works

1. When a user connects their wallet, the app checks if their address has the REGISTRAR_ROLE
2. This is done by calling two contract functions:
   - `REGISTRAR_ROLE()` - Gets the role hash
   - `hasRole(roleHash, userAddress)` - Checks if the user has that role
3. If the user has the role, the Admin link appears in the navbar
4. The Admin link redirects to `/admin` where registrars can manage elections

## Testing

To test the admin functionality:
1. Deploy the VotingContract using the deployer wallet
2. Connect that same wallet to the frontend
3. The Admin link should appear in the navbar
4. Connect a different wallet - the Admin link should disappear