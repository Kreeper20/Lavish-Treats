type itemType = {
    name: string;
    price: number;
    quantity: number;
};


import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {



    try {
        const { items } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:
                [...items.map((item: itemType) => ({
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                })),
                ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        return new Response(JSON.stringify({ url: session.url }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'something went wrong' }));
    }
}