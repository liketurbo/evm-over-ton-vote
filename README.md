# VotON: Decentralized Voting Platform

> _**Vote in TON using EVM wallet**_

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Status

Unfortunately, the contract implementation has encountered a setback due to the non-functional state of the `HASHEXT_KECCAK256` opcode. As a result, the contract's completion and full functionality are currently on hold.

## Content

- Next.js App  
The `/` path contains a Next.js application, which serves as the user interface for VotON.

- Blueprint Framework Contract  
The `/contract` folder contains the VotON contract implemented using the blueprint framework.

## How New Opcodes are Used

1. `HASHEXT_KECCAK256`  
The `HASHEXT_KECCAK256` is used to compute the hash of the message to be signed, which typically follows the Ethereum Signed Message format: "\x19Ethereum Signed Message:\n" + dataToSign.length + dataToSign.

2. `ECRECOVER`  
The `ECRECOVER` opcode is employed in VotON to extract the Ethereum address associated with a given signature.

## Use Case: EVM Wallets Whitelisted Voting

VotON facilitates a use case where voting is exclusively open to Ethereum Virtual Machine (EVM) wallets that have been whitelisted.  
This functionality allows the platform to restrict voting rights to a predefined list of EVM wallet addresses. By leveraging the TON network and EVM-compatible wallets, VotON ensures that only approved participants with whitelisted wallets can actively participate in the voting process.  
This use case is particularly valuable in scenarios where the voting system needs to be limited to specific individuals or entities who possess confirmed EVM wallets, ensuring a secure and controlled voting environment.

## Getting Started

1. Clone the repository: `git clone https://github.com/liketurbo/evm-over-ton-vote.git`

2. Install the required dependencies: `npm install`

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
