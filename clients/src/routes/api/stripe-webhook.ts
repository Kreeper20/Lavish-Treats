import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { supabase } from "../../../../server/supabase";

export const Route = createFileRoute("/api/stripe-webhook")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const body = await request.text();
                const signature = request.headers.get("stripe-signature");
                const stripeKey = process.env.STRIPE_SECRET_KEY;
                const secret = process.env.STRIPE_WEBHOOK_SECRET;

                if (!signature || !secret || !stripeKey) {
                    return new Response("Missing webhook configuration", { status: 400 });
                }

                let event: Stripe.Event;

                try {
                    const stripe = new Stripe(stripeKey);
                    event = stripe.webhooks.constructEvent(body, signature, secret);
                } catch (error) {
                    console.error("Webhook verification failed:", error);
                    return new Response("Invalid signature", { status: 400 });
                }

                if (event.type === "payment_intent.succeeded") {
                    const paymentIntent = event.data.object as Stripe.PaymentIntent;
                    const meta = paymentIntent.metadata;

                    const { error } = await supabase.from("orders").insert({
                        customer_name: meta.customerName,
                        email: meta.email,
                        phone: meta.phone,
                        collection_date: meta.collectionDate,
                        collection_time: meta.collectionTime,
                        notes: meta.notes,
                        total_amount: Number(meta.totalAmount),
                        fulfillment_type: meta.fulfillmentType,
                        address_line: meta.addressLine,
                        city: meta.city,
                        postal_code: meta.postcode,
                        items: JSON.parse(meta.items),
                        status: "paid", // it's created already-paid, since this only fires on success
                    });

                    if (error) {
                        console.error(error);
                        return new Response("Database insert failed", { status: 500 });
                    }
                }

                return new Response("Webhook received", { status: 200 });
            },
        },
    },
});