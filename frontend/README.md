# Unify - Your Compass for Local Good

A decentralized donation platform that connects donors with local charities and beneficiaries, featuring Solana blockchain payments and traditional payment methods.

## Features

- **Local Discovery**: Explore places, meet changemakers, and give with purpose through Unify Compass
- **Multi-Payment Support**: 
  - Solana Pay integration for cryptocurrency donations
  - Traditional payment methods via Stripe
- **Beneficiary Management**: Create and manage charity beneficiaries
- **Interactive Map**: Discover local causes and donation opportunities
- **Real-time Tracking**: Monitor donations and impact
- **NFT Marketplace**: Digital collectibles for donors

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **UI Framework**: Material-UI (MUI) + Tailwind CSS
- **Blockchain**: Solana Web3.js, Wallet Adapter
- **Payments**: Stripe, Solana Pay
- **State Management**: Redux Toolkit, Zustand
- **Data Fetching**: Apollo Client (GraphQL)
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Solana wallet (Phantom, Solflare, etc.)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Run the development server:
```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── beneficiaries/     # Beneficiary pages
│   ├── donate/            # Donation flow
│   ├── hubs/              # Hub management
│   └── marketplace/       # NFT marketplace
├── components/            # Reusable components
│   ├── home/              # Landing page components
│   ├── payment/           # Payment components
│   └── ui/                # UI components
├── lib/                   # Utilities and configurations
│   ├── mutations/         # GraphQL mutations
│   └── queries/           # GraphQL queries
├── store/                 # State management
└── types/                 # TypeScript definitions
```

## Key Features

### Solana Integration
- Wallet connection with multiple wallet adapters
- Solana Pay for seamless cryptocurrency donations
- NFT minting and marketplace functionality

### Payment Processing
- Stripe integration for traditional payments
- Secure checkout sessions
- Receipt generation and tracking

### Beneficiary Management
- Create and edit beneficiary profiles
- Upload images and documentation
- Track donation impact

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Stripe Payment Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Solana Blockchain Configuration
SOLANA_RPC_URL=https://api.devnet.solana.com
MERCHANT_WALLET_ADDRESS=your_merchant_wallet_address
NEXT_PUBLIC_MERCHANT_WALLET=your_merchant_wallet_address

# GraphQL API
NEXT_PUBLIC_GRAPHQL_URL=your_graphql_endpoint

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Environment
NODE_ENV=development
```

### Required Environment Variables

- **STRIPE_SECRET_KEY**: Server-side Stripe API key for payment processing
- **STRIPE_PUBLISHABLE_KEY**: Client-side Stripe key for checkout forms
- **STRIPE_WEBHOOK_SECRET**: Webhook secret for Stripe event verification
- **SOLANA_RPC_URL**: RPC endpoint for Solana network (devnet/mainnet)
- **MERCHANT_WALLET_ADDRESS**: Server-side wallet address for receiving payments
- **NEXT_PUBLIC_MERCHANT_WALLET**: Client-side wallet address for QR code generation
- **NEXT_PUBLIC_GRAPHQL_URL**: GraphQL API endpoint
- **NEXT_PUBLIC_POSTHOG_KEY**: PostHog analytics project key
- **NEXT_PUBLIC_POSTHOG_HOST**: PostHog analytics host URL

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy

### Manual Deployment
```bash
bun build
bun start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is part of the Unify ecosystem for decentralized charitable giving.
