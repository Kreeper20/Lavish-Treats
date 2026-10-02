type itemType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};
import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";

export const Route = createFileRoute('/api/checkout')({
    server: {
        handlers: {
            POST: async ({ request }) => {
                try {
                    const stripeKey = process.env.STRIPE_SECRET_KEY;

                    if (!stripeKey) {
                        console.error("Stripe API Key is missing. Check the Netlify environment variables.");
                        return new Response(
                            JSON.stringify({ error: "Payment service is not configured" }),
                            { status: 503, headers: { "Content-Type": "application/json" } }
                        );
                    }

                    const stripe = new Stripe(stripeKey);
                    const { cartItems, orderDetails } = await request.json();

                    if (!Array.isArray(cartItems) || cartItems.length === 0) {
                        return new Response(
                            JSON.stringify({ error: "cartItems must be a non-empty array" }),
                            { status: 400, headers: { "Content-Type": "application/json" } }
                        );
                    }

                    const session = await stripe.checkout.sessions.create({
                        payment_method_types: ["card"],
                        payment_intent_data: {
                            metadata: {
                                // CHANGED — order details go here instead of just orderId
                                customerName: orderDetails.customerName,
                                email: orderDetails.email,
                                phone: orderDetails.phone,
                                collectionDate: orderDetails.collectionDate,
                                collectionTime: orderDetails.collectionTime,
                                notes: orderDetails.notes ?? "",
                                totalAmount: String(orderDetails.totalAmount),
                                fulfillmentType: orderDetails.fulfillmentType,
                                addressLine: orderDetails.addressLine ?? "",
                                city: orderDetails.city ?? "",
                                postcode: orderDetails.postcode ?? "",
                                items: JSON.stringify(cartItems), // watch the 500-char cap here
                            },
                        },
                        line_items: cartItems.map((item: itemType) => ({
                            price_data: {
                                currency: "gbp",
                                product_data: { name: item.name },
                                unit_amount: item.price * 100,
                            },
                            quantity: item.quantity,
                        })),
                        mode: "payment",
                        success_url: `${process.env.FRONTEND_URL}/success`,
                        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
                    });

                    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
                } catch (error) {
                    console.error(error);
                    return new Response(JSON.stringify({ error: "something went wrong" }), { status: 500 });
                }
            },
        },
    },
});