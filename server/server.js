require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const frontendUrl = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 8080;



app.post('/create-checkout-session', async (req, res) => {
    const { cartItems } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({
            error: 'cartItems must be a non-empty array',
        });
    }

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
        line_items: lineItems,
        mode: 'payment',
        success_url: `${frontendUrl}/success`,
        cancel_url: `${frontendUrl}/cancel`,
    });


    res.json({ url: session.url });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});