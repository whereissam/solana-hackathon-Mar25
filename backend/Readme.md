
          
# Backend for Solana Sprint Project

This README provides documentation for the backend portion of the Solana Sprint project.

## Overview

The backend serves as the server-side component of our Solana blockchain application, handling API requests, blockchain interactions, and data processing.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- Yarn
- Solana CLI tools

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ug-solana-sprint-1.git
cd ug-solana-sprint-1/backend
```

2. Install dependencies:
```bash
yarn install
```

## Configuration

1. Create a `.env` file in the backend directory with the following variables:
```
DATABASE_URL="mongodb://localhost:27017/ug_compass_db"
PORT=3000
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
```

2. Configure your Solana wallet:
   - Generate a new keypair or use an existing one
   - Store the keypair securely
   - Fund your wallet with SOL for transaction fees (if using devnet)

## Database Setup

This project uses Prisma ORM with MongoDB. The schema is defined in the `../schema/.prisma/schema.prisma` file.

To generate Prisma client:
```bash
yarn prisma
```

## GraphQL Schema

The GraphQL schema is defined in the `../schema/graphql/*.graphql` files. To generate TypeScript types from the GraphQL schema:

```bash
yarn generate
```

## Running the Server

### Development Mode
```bash
yarn dev
```

### Production Mode
```bash
yarn build
yarn start
```

## Solana Integration

This backend integrates with the Solana blockchain using the `@solana/web3.js` library. Key features include:

- Connection to Solana RPC nodes
- Transaction creation and signing
- Account management
- Program interaction
- Token operations (SPL tokens)

## Available Scripts

- `yarn build` - Build the TypeScript code
- `yarn start` - Start the production server
- `yarn dev` - Start the development server with hot reloading
- `yarn prisma` - Generate Prisma client
- `yarn generate` - Generate GraphQL types

## Environment Variables

- `DATABASE_URL` - MongoDB connection string
- `PORT` - Server port (default: 3000)
- `SOLANA_NETWORK` - Solana network to connect to (e.g., devnet, testnet, mainnet-beta)
- `SOLANA_RPC_URL` - URL of the Solana RPC node

## License

This project is licensed under the ISC License - see the LICENSE file for details.
