import Stripe from 'stripe';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: Request) {

    const body = await req.text();
    const headerList = await req.headers.get('stripe-signature');
    const sig = headerList;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }
    if (!sig) {
        return new Response(JSON.stringify({ error: "Missing Stripe signature" }), { status: 400 });

    }

    let event: Stripe.Event;

    event = stripe.webhooks.constructEvent(
        body,
        sig,
        webhookSecret
    );


    try { 
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    }catch (error) {
        console.error('Error handling webhook event:', error);
        return new Response(JSON.stringify({ error: 'Webhook handler failed' }), { status: 400 });
    }
    if (event.type === 'payment_intent.succeeded') {
        const session = event.data.object as Stripe.PaymentIntent;
    }
        


}