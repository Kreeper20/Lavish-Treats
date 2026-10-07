import { useState, type FormEvent } from "react";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { ShopData } from "../data/ShopData";
import { formatCurrency } from "../utils/formatCurrency";
import { motion } from "framer-motion";
import { getDiscountedTotal } from "../promotions/promotion";
import { DiscountedPrice } from "../promotions/DiscountedPrice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


export const Checkout = () => {

    const motionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // cart access
    const { cartItems, openCart } = UseShoppingCart();

    const subtotal = cartItems.reduce((total, cartItem) => {
        const item = ShopData.find((item) => item.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

    const total = getDiscountedTotal(subtotal);
    const savings = subtotal - total;

    const boxStyles =
        "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2.5 px-3 text-text-body focus:outline-none focus:ring-1 focus:ring-purple-deep focus:border-purple-deep sm:text-sm";
    const labelStyles = "block text-sm font-medium text-text-body";

    // fulfillment type
    const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");
    const DELIVERY_FEE = 5;
    const PICKUP_TIMES = ["9am - 9:25am", "9:30am - 9:55am", "10am - 10:25am", "10:30am - 11am", "5pm - 6pm"];
    const DELIVERY_TIMES = ["9am - 9:25am", "9:30am - 9:55am", "10am - 10:25am", "10:30am - 11am", "5pm - 6pm"];


    // supabase form
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [collectionDate, setCollectionDate] = useState("");
    const [collectionTime, setCollectionTime] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [addressLine, setAddressLine] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!customerName || !email || !phone || !collectionDate || !collectionTime) {
            setError("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        // REPLACED the Supabase insert — just hand everything to checkout now
        checkout({
            customerName,
            email,
            phone,
            collectionDate,
            collectionTime,
            notes,
            totalAmount: total,
            fulfillmentType,
            addressLine,
            city,
            postcode,
        });

        setIsSubmitting(false);
    };
    //Stripe payment


    const { mutate: checkout, isPending } = useMutation({
        mutationFn: async (orderDetails: {
            customerName: string;
            email: string;
            phone: string;
            collectionDate: string;
            collectionTime: string;
            notes: string;
            totalAmount: number;
            fulfillmentType: "pickup" | "delivery";
            addressLine: string;
            city: string;
            postcode: string;
        }) => {
            const response = await axios.post("/api/checkout", {
                orderDetails,
                cartItems: cartItems.map((item) => {
                    const product = ShopData.find((p) => p.id === item.id);
                    return {
                        id: item.id,
                        name: product?.name ?? "",
                        price: product?.price ?? 0,
                        quantity: item.quantity,
                    };
                }),
            });
            return response.data;
        },
        onSuccess: (data: { url: string }) => {
            window.location.href = data.url;
        },
    });

    return (
        <>
            <motion.section
                variants={motionVariants}
                initial="hidden"
                animate="visible"
                className="bg-lilac-50 py-12 "
            >
                <div className="text-center items-center px-4 mx-auto">
                    <h1 className="text-purple-bright font-light mb-3 uppercase tracking-widest">
                        STEP 2 OF 2
                    </h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                        Your Collection Details
                    </h2>
                    <p className="text-text-body font-extralight text-base lg:text-lg max-w-2xl mx-auto">
                        Please provide your details below and we will be in touch to confirm your order and arrange payment.
                    </p>
                </div>
            </motion.section>

            <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    <section className="flex-1">
                        <form

                            className="space-y-5 border border-lilac-panel bg-white p-6 md:p-10 rounded-2xl shadow-sm"
                            onSubmit={handleSubmit}
                        >
                            <h3 className="font-serif text-2xl text-purple-deep font-semibold mb-2">
                                Your Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="customerName" className={labelStyles}>
                                        Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="customerName"
                                        id="customerName"
                                        placeholder="Jane Doe"
                                        className={boxStyles}
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelStyles}>
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="jane@example.com"
                                        className={boxStyles}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className={labelStyles}>
                                        Phone*
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        placeholder="07123 456789"
                                        className={boxStyles}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelStyles}>How would you like your order?</label>
                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {(
                                        [
                                            { value: "pickup", title: "Pickup", subtitle: "From our Kettering shop" },
                                            { value: "delivery", title: "Delivery", subtitle: `${formatCurrency(DELIVERY_FEE)}+ estimated fee` },
                                        ] as const
                                    ).map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${fulfillmentType === option.value
                                                ? "border-purple-deep bg-lilac-50"
                                                : "border-gray-300 bg-white"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="fulfillmentType"
                                                value={option.value}
                                                checked={fulfillmentType === option.value}
                                                onChange={() => {
                                                    setFulfillmentType(option.value);
                                                    setCollectionTime("");
                                                }}
                                                className="accent-purple-deep"
                                            />
                                            <span>
                                                <span className="block text-sm font-semibold text-text-card">
                                                    {option.title}
                                                </span>
                                                <span className="block text-xs text-text-muted">
                                                    {option.subtitle}
                                                </span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>


                            {fulfillmentType === "delivery" && (
                                <div className="space-y-4 rounded-xl bg-lilac-50 p-4">
                                    <div>
                                        <label htmlFor="addressLine" className={labelStyles}>
                                            Delivery Address*
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine"
                                            id="addressLine"
                                            placeholder="123 High Street"
                                            className={boxStyles}
                                            value={addressLine}
                                            onChange={(e) => setAddressLine(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="city" className={labelStyles}>
                                                Town/City*
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                placeholder="Kettering"
                                                className={boxStyles}
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="postcode" className={labelStyles}>
                                                Postcode*
                                            </label>
                                            <input
                                                type="text"
                                                name="postcode"
                                                id="postcode"
                                                placeholder="NN15 6XX"
                                                className={boxStyles}
                                                value={postcode}
                                                onChange={(e) => setPostcode(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="collectionDate" className={labelStyles}>
                                        {fulfillmentType === "delivery" ? "Delivery Date*" : "Collection Date*"}
                                    </label>
                                    <input
                                        type="date"
                                        name="collectionDate"
                                        id="collectionDate"
                                        className={boxStyles}
                                        value={collectionDate}
                                        onChange={(e) => setCollectionDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="collectionTime" className={labelStyles}>
                                        {fulfillmentType === "delivery" ? "Delivery Time*" : "Collection Time*"}
                                    </label>
                                    <select
                                        name="collectionTime"
                                        id="collectionTime"
                                        className={boxStyles}
                                        value={collectionTime}
                                        onChange={(e) => setCollectionTime(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select a time
                                        </option>
                                        {(fulfillmentType === "delivery" ? DELIVERY_TIMES : PICKUP_TIMES).map(
                                            (time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>


                            <div>
                                <label htmlFor="notes" className={labelStyles}>
                                    Additional Notes
                                </label>
                                <textarea
                                    name="notes"
                                    id="notes"
                                    rows={4}
                                    placeholder="Allergies, message on the cake, anything else we should know..."
                                    className={`resize-none ${boxStyles}`}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || isSubmitting}

                                className="bg-purple-primary cursor-pointer text-white px-6 py-3 uppercase w-full rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isPending ? "Submitting..." : "Submit Order"}
                            </button>

                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <p className="text-xs text-text-muted mt-2">
                                Minimum 5 days notice. Rush orders within 48 hours from £20, subject to availability.
                            </p>
                        </form>
                    </section>

                    {/* Order summary */}
                    <aside className="h-fit lg:w-96 shrink-0 rounded-3xl bg-lilac-panel p-6 md:p-8">
                        <h2 className="mb-6 font-serif text-2xl font-semibold text-purple-deep">
                            Your Order
                        </h2>

                        <div className="divide-y divide-lilac-300">
                            {cartItems.map((cartItem) => {
                                const product = ShopData.find((item) => item.id === cartItem.id);
                                if (!product) return null;
                                return (
                                    <div key={cartItem.id} className="flex items-start gap-4 py-4">
                                        <div className="relative shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-16 w-16 rounded-xl object-cover border border-lilac-300"
                                            />
                                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-deep text-[11px] font-semibold text-white">
                                                {cartItem.quantity}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-medium text-text-card">{product.name}</p>
                                            <p className="text-xs text-text-muted">
                                                {formatCurrency(product.price)} each
                                            </p>
                                            {cartItem.note && (
                                                <p className="mt-1 text-xs text-text-muted">
                                                    Note: {cartItem.note}
                                                </p>
                                            )}
                                        </div>

                                        <p className="font-semibold text-purple-dark whitespace-nowrap">
                                            {formatCurrency(product.price * cartItem.quantity)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 space-y-2 border-t border-lilac-300 pt-4 text-sm">
                            <div className="flex justify-between text-text-muted">
                                <span>Subtotal</span>
                                <span className="text-text-card">{formatCurrency(subtotal)}</span>
                            </div>
                            {savings > 0 && (
                                <div className="flex justify-between text-text-muted">
                                    <span>Discount</span>
                                    <span className="text-purple-deep">
                                        &minus;{formatCurrency(savings)}
                                    </span>
                                </div>
                            )}
                            <div className="flex justify-between text-text-muted">
                                <span>Collection</span>
                                <span className="text-text-card">Free</span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-end justify-between border-t border-lilac-300 pt-5">
                            <span className="text-xs uppercase tracking-widest text-text-muted">
                                Total
                            </span>
                            <strong className="font-serif text-4xl text-purple-primary">
                                <DiscountedPrice total={subtotal} price={total} />
                            </strong>
                        </div>

                        <button
                            onClick={openCart}
                            className="mt-5 block rounded-full w-full border cursor-pointer border-purple-primary px-5 py-3 text-center text-sm font-semibold uppercase tracking-widest text-purple-primary transition hover:bg-purple-primary hover:text-white duration-300 ease-in-out"
                        >
                            Edit Basket
                        </button>
                    </aside>
                </div>
            </section>
        </>
    );
};
