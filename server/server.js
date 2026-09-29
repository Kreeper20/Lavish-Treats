require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const app = express();
app.use(cors());

const frontendUrl = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 8080;

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
app.post(
    "/stripe-webhook",
    express.raw({ type: "application/json" }),
    handleStripeWebhook
);
app.use(express.json());



app.post('/create-checkout-session', async (req, res) => {
    const { cartItems, orderId } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({
            error: 'cartItems must be a non-empty array',
        });
    }
    if (!orderId) {
        return res.status(400).json({ error: "orderId is required" });
    }
    const metadata = {
        orderId: String(orderId),
    };

    const lineItems = cartItems.map((item) => ({
        price_data: {
            currency: 'gbp',
            product_data: {
                name: item.name,
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects the amount in cents
        },
        quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
        metadata,
        payment_intent_data: {
            metadata,
        },
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${frontendUrl}/success`,
        cancel_url: `${frontendUrl}/cancel`,
    });


    res.json({ url: session.url });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});