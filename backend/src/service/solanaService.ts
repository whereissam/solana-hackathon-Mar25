import { Connection, PublicKey, PartiallyDecodedInstruction, Keypair } from '@solana/web3.js'
import { createSignerFromKeypair, generateSigner, signerIdentity } from '@metaplex-foundation/umi'
import {base58} from '@metaplex-foundation/umi/serializers'
import {mplCore, createCollectionV2} from '@metaplex-foundation/mpl-core'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import * as fs from 'fs'
import * as path from 'path'


function createContext(){
    const rpcUrl = process.env.SOLANA_RPC_URL ?? "";
    const connection = new Connection(rpcUrl, 'confirmed');

    const umi = createUmi(rpcUrl).use(mplCore())
    
    const walletFile = fs.readFileSync(path.join(__dirname, '../../keypair.json'), 'utf-8')
    const keypair = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from(JSON.parse(walletFile)))
    const signer = createSignerFromKeypair(umi, keypair)
    umi.use(signerIdentity(signer))
    return {umi, signer}
}

async function getSolanaMemo(txHash: string, rpcUrl = process.env.SOLANA_RPC_URL) {
    try {
        const connection = new Connection(rpcUrl??"", 'confirmed');
        const transaction = await connection.getParsedTransaction(txHash);

        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Iterate through the transaction instructions to find the memo
        for (const instruction of transaction.transaction.message.instructions) {
            const programId = new PublicKey(instruction.programId).toString();

            // Check if the instruction is from the Memo program
            if (programId === process.env.SOLANA_MEMO_PROGRAM_ID) {
                if ('data' in instruction && 'programId' in instruction) {
                    return Buffer.from(instruction.data, 'base64').toString('utf-8');
                }
                return instruction.parsed;
            }
        }

        return null; // No memo found
    } catch (error) {
        console.error('Error fetching Solana memo:', error);
        throw error;
    }
}

async function mintReceipt(donationId: string) {
    try {
        const {umi, signer} = createContext()

        const assetSigner = generateSigner(umi)
        const result = await createCollectionV2(umi, {
            collection: assetSigner, 
            name: 'Receipts',
            payer: signer,
            uri: 'https://arweave.net/123',
        }).sendAndConfirm(umi)

        return base58.deserialize(result.signature).toString()
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
}

export { getSolanaMemo, mintReceipt };