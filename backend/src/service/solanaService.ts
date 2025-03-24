import { Connection, PublicKey, PartiallyDecodedInstruction } from '@solana/web3.js'

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

export {getSolanaMemo};