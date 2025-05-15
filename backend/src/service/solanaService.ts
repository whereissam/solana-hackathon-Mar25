import { Connection, PublicKey, PartiallyDecodedInstruction, Keypair, ParsedTransaction, ParsedTransactionWithMeta } from '@solana/web3.js'
import { createSignerFromKeypair, generateSigner, KeypairSigner, signerIdentity, Umi, publicKey as UmiPublicKey } from '@metaplex-foundation/umi'
import {base58} from '@metaplex-foundation/umi/serializers'
import {mplCore, createCollectionV2, fetchCollection, create, Plugin, updateAuthority, ruleSet} from '@metaplex-foundation/mpl-core'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import * as fs from 'fs'
import * as path from 'path'
import { get } from 'http'


export interface IDonationMemo {
    DonationId: string,
    Ver: string,
    Amount: number,
    Currency: string
}

export interface ITransferDetail {
    feePayer: string,
    solanaMemo: IDonationMemo
}

function getSignerFromFile(umi: Umi, filePath: string): KeypairSigner{
    const signerFile = fs.readFileSync(filePath, 'utf-8')
    const keypair = umi.eddsa.createKeypairFromSecretKey(Uint8Array.from(JSON.parse(signerFile)))
    const signer = createSignerFromKeypair(umi, keypair)
    return signer
}

function getContext(): {umi: Umi, signer: KeypairSigner} {
    if (global.umiContext) return global.umiContext
    const rpcUrl = process.env.SOLANA_RPC_URL ?? "";
    const connection = new Connection(rpcUrl, 'confirmed');
    const umi = createUmi(rpcUrl).use(mplCore())
    
    const signer = getSignerFromFile(umi, path.join(__dirname, '../../wallet-secret.json'))
    umi.use(signerIdentity(signer))
    global.umiContext = {umi, signer}
    return global.umiContext
}

function getFeePayer(transaction: ParsedTransactionWithMeta): string{
    return transaction.transaction.message.accountKeys[0].pubkey.toBase58();
}

function getSolanaMemo(transaction: ParsedTransactionWithMeta) : IDonationMemo{
    for (const instruction of transaction.transaction.message.instructions) {
        const programId = new PublicKey(instruction.programId).toString();

        // Check if the instruction is from the Memo program
        if (programId === process.env.SOLANA_MEMO_PROGRAM_ID) {
            if ('data' in instruction && 'programId' in instruction) {
                return JSON.parse(Buffer.from(instruction.data, 'base64').toString('utf-8')) as IDonationMemo;
            }
            return JSON.parse(instruction.parsed) as IDonationMemo;
        }
    }
    throw "Memo not found in transaction";
}

async function getTransferDetail(txHash: string, rpcUrl = process.env.SOLANA_RPC_URL)
    : Promise<ITransferDetail> {
    try {
        const connection = new Connection(rpcUrl??"", 'confirmed');
        const transaction = await connection.getParsedTransaction(txHash);

        if (!transaction) {
            throw new Error('Transaction not found');
        }

        return { feePayer: getFeePayer(transaction), solanaMemo: getSolanaMemo(transaction) };
    } catch (error) {
        console.error('Error fetching Solana memo:', error);
        throw error;
    }
}

/*
    * Create a new NFT collection
    * Internal use only
    */
async function createCollection(){
    const {umi, signer} = getContext()
        
    const collectionSigner = generateSigner(umi)

    const result = await createCollectionV2(umi, {
        collection: collectionSigner, 
        name: 'UG Receipts Collection Season 1',
        payer: signer,
        uri: `https://unifygiving.com/ug-s1/`,
    }).sendAndConfirm(umi)
    
    return {
        collectionKey: collectionSigner.publicKey.toString(), 
        txSignature: base58.deserialize(result.signature).toString().split(',')[0],
        collectionSignerSecret: Array.from(collectionSigner.secretKey)
    }
}

async function mintReceipt(receiptOwner: string, donationId: string): Promise<{assetKey: string, signature: string}> {
    try {
        const {umi, signer} = getContext()
        
        const collectionSigner = getSignerFromFile(umi, path.join(__dirname, '../../collection-secret.json'))
        const collection = await fetchCollection(umi, collectionSigner.publicKey)

        const assetSigner = generateSigner(umi)
        const result = await create(umi, {
            asset: assetSigner,
            collection: collection, 
            owner: UmiPublicKey(receiptOwner),
            name: `UG Receipts for donation ${donationId}`,
            payer: signer,
            uri: `https://solana-hackathon-mar25.onrender.com/donation/${donationId}`,
            plugins: [
                {
                    type: 'Royalties',
                    creators: [
                        { address: signer.publicKey, percentage: 100 }
                    ],
                    basisPoints: 0,
                    ruleSet: ruleSet('None')
                },
                {
                    type: 'ImmutableMetadata',
                }
            ],
            updateAuthority: undefined
        }).send(umi)

        return {
            assetKey: assetSigner.publicKey.toString(), 
            signature: base58.deserialize(result).toString().split(',')[0]
        }
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
}

export { getTransferDetail, mintReceipt };