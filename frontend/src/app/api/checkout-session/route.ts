import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// Temporarily disabled Stripe integration
// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
// }
// Initialize Stripe with API key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    // Temporarily return mock data instead of calling Stripe
    return NextResponse.json({
      id: sessionId,
      status: 'complete',
      payment_status: 'paid',
      amount_total: 1000,
      currency: 'usd',
      customer_details: {
        email: 'test@example.com',
        name: 'Test User'
      },
      // Add any other fields your application might need
    });
    
    // Original Stripe code (commented out)
    // const session = await stripe.checkout.sessions.retrieve(sessionId);
    // return NextResponse.json(session);
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}