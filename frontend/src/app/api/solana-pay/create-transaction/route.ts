import { NextResponse } from 'next/server';
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';
import { HermesClient } from '@pythnetwork/hermes-client';
import { createMemoInstruction } from '@solana/spl-memo';

const SOL_USD_PRICE_ID = "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";

interface PriceData {
  ema_price: { conf: string; expo: number; price: string; publish_time: number; };
  id: string;
  metadata: { prev_publish_time: number; proof_available_time: number; slot: number; };
  price: { conf: string; expo: number; price: string; publish_time: number; };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, wallet ,donationId } = body;

    if (!amount || !wallet || !donationId) {
      return NextResponse.json(
        { error: 'Amount, wallet, and donationId are required' },
        { status: 400 }
      );
    }

    const hermesClient = new HermesClient("https://hermes.pyth.network", {});
    const priceUpdates = await hermesClient.getLatestPriceUpdates([SOL_USD_PRICE_ID]);
    
    if (!priceUpdates || !priceUpdates.parsed || !priceUpdates.parsed[0]) {
      throw new Error('Failed to fetch SOL price from Pyth Network');
    }
    
    const priceData = priceUpdates.parsed[0] as unknown as PriceData;
    const priceObj = priceData.price;
    
    const priceValue = parseFloat(priceObj.price);
    const priceExponent = priceObj.expo || -8;
    const scaleFactor = Math.pow(10, priceExponent);
    const solPrice = priceValue * scaleFactor;
    
    if (isNaN(solPrice) || solPrice <= 0) {
      throw new Error(`Invalid price calculation: raw=${priceValue}, exponent=${priceExponent}, result=${solPrice}`);
    }
    
    const bufferPercentage = 0.005;
    const adjustedSolPrice = solPrice * (1 + bufferPercentage);
    const solAmount = amount / adjustedSolPrice;
    const lamports = Math.round(solAmount * LAMPORTS_PER_SOL);

    const connection = new Connection(
      process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
      'confirmed'
    );

    const merchantWallet = new PublicKey(
      process.env.MERCHANT_WALLET_ADDRESS || 
      'DummyAddressReplaceMeWithActualMerchantWallet'
    );

    const customerWallet = new PublicKey(wallet);

    // Create structured JSON memo
    const memoData = {
      DonationId: donationId, // Generate a unique ID
      Ver: "1.0",
      Amount: amount,
      Currency: "usd",
    };

    const memoText = JSON.stringify(memoData);

    const transaction = new Transaction();
    
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: customerWallet,
        toPubkey: merchantWallet,
        lamports,
      }),
      createMemoInstruction(memoText, [customerWallet])
    );

    const { blockhash } = await connection.getLatestBlockhash('finalized');
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = customerWallet;

    const serializedTransaction = Buffer.from(
      transaction.serialize({
        requireAllSignatures: false,
        verifySignatures: false
      })
    ).toString('base64');

    return NextResponse.json({ 
      transaction: serializedTransaction,
      message: `Transaction created for ${solAmount.toFixed(6)} SOL (${amount} USD)`,
      currentPrice: solPrice,
      adjustedPrice: adjustedSolPrice,
      memo: memoText
    });
  } catch (error: unknown) {
    console.error('Error creating Solana transaction:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}