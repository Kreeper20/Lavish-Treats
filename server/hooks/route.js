import Stripe from 'stripe';
import { supabase } from "../utils/supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function handleStripeWebhook(req, res) {
    try {

        const body = req.body;
        const sig = req.headers["stripe-signature"];

        const event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        const handlePaymentIntent = async (paymentIntentId, isPaid) => {
            const session = await stripe.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;
            await supabase
                .from("orders")
                .update({ paid: isPaid })
                .eq("id", orderId);
        }
        switch (event.type) {
            case 'payment_intent.succeeded': {
                await handlePaymentIntent(event.data.object.id, true);
                break;
            }
            case 'payment_intent.canceled': {
                await handlePaymentIntent(event.data.object.id, false);
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
                break;
        }
        return res.json({ received: true });

    } catch (error) {
        console.error('Error handling webhook event:', error);
       return res.status(400).json({ error: "Webhook failed" });
    }

}
export { handleStripeWebhook };

export const config = {
    api: {
        bodyParser: false,
    },
}