import { useState, type FormEvent, } from "react";
import { useNavigate } from "@tanstack/react-router";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { ShopData } from "../data/ShopData";
import { formatCurrency } from "../utils/formatCurrency";
import { supabase } from '../utils/supabase'




export const Checkout = () => {

      const motionVariants = {
    hidden: { opacity: 0,  y: 20 },
    visible: { opacity: 1,  y: 0 },
  };

    //cart access
    const { cartItems, openCart, clearCart } = UseShoppingCart();
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, cartItem) => {
        const product = ShopData.find(item => item.id === cartItem.id);
        return sum + (product?.price ?? 0) * cartItem.quantity;
    }, 0);

    const boxStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-deep focus:border-purple-deep sm:text-sm"
    //supabase form 
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [collectionDate, setCollectionDate] = useState("");
    const [collectionTime, setCollectionTime] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!customerName || !email || !phone || !collectionDate || !collectionTime) {
            setError("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }


        const { data, error } = await supabase.from('orders').insert([
            {
                customer_name: customerName,
                email: email,
                phone: phone,
                collection_date: collectionDate,
                collection_time: collectionTime,
                notes: notes,
                total_amount: total,
                items: cartItems.map(item => {
                    const product = ShopData.find(p => p.id === item.id);
                    return {
                        id: item.id,
                        name: product?.name || "",
                        quantity: item.quantity,
                        note: item.note || ""
                    };
                })

            }
        ])

        if (error) {
            console.error("Error inserting order:", error);
            setError(error.message);
            setIsSubmitting(false);
            return;
            
        }
        
        console.log("Order inserted successfully:", data);
        setIsSubmitting(false);
        clearCart();
        navigate({ to: "/orderConfirm" });
        
    }
    return (
        <>
            <section className="bg-lilac-50 py-12 lg:py-28">
                <div className="text-center items-center px-4 mx-auto">
                    <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">STEP 2 OF 2</h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                        Your Collection Details
                    </h2>
                    <p className=" text-text-body font-extralight text-base lg:text-lg max-w-2xl mx-auto">
                        Please provide your details below and we will be in touch to confirm your order and arrange payment.
                    </p>
                </div>
            </section>

            <section className="px-4 md:px-8 py-12 flex flex-col lg:flex-row max-w-6xl gap-12 mx-auto ">
                <section>
                    <form className="space-y-4 border rounded-3xl p-10 bg-white shadow-sm border-lilac-panel" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="customerName" className="block text-sm font-medium text-text-body">Name</label>
                                <input type="text" name="customerName" id="customerName"
                                    className={boxStyles}
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-body">Email</label>
                                <input type="email" name="email" id="email"
                                    className={boxStyles}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-text-body">Phone</label>
                                <input type="tel" name="phone" id="phone"
                                    className={boxStyles}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="collectionDate" className="block text-sm font-medium text-text-body">Collection Date</label>
                                <input type="date" name="collectionDate" id="collectionDate"
                                    className={boxStyles}
                                    value={collectionDate}
                                    onChange={(e) => setCollectionDate(e.target.value)} />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="collectionTime" className="block text-sm font-medium text-text-body">Collection Time</label>
                            <select name="collectionTime" id="collectionTime"
                                className={boxStyles}
                                value={collectionTime}
                                onChange={(e) => setCollectionTime(e.target.value)}>
                                <option value="" disabled  >
                                    Select a time
                                </option>
                                <option value="9:30am - 9:55am">9:30am - 9:55am</option>
                                <option value="10am - 10:25am">10am - 10:25am</option>
                                <option value="10:30am - 11am">10:30am - 11am</option>
                                <option value="5pm - 6pm">5pm - 6pm</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-text-body">Additional Notes</label>
                            <textarea name="notes" id="notes" rows={4}
                                className={`resize-none ${boxStyles}`}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}></textarea>
                        </div>


                        <button type="submit" disabled={isSubmitting} className="bg-purple-primary cursor-pointer text-white px-6 py-3 uppercase w-full rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out">
                            {isSubmitting ? "Submitting..." : "Submit Order"}
                        </button>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <p className="text-xs text-text-muted mt-2">Minimum 5 days notice. Rush orders within 48 hours from £20, subject to availability.</p>
                    </form>
                </section>
                <aside className="h-fit md:w-md rounded-3xl bg-lilac-panel p-6 md:p-8 ">
                    <h2 className="mb-6 font-serif text-3xl font-semibold text-purple-deep">
                        Order Summary
                    </h2>

                    <div className="divide-y divide-lilac-300">
                        {cartItems.map((cartItem) => {
                            const product = ShopData.find(item => item.id === cartItem.id);

                            if (!product) return null;

                            return (
                                <div key={cartItem.id} className="flex justify-between gap-4 py-4">
                                    <div>
                                        <p className="font-medium text-text-card">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-text-muted">
                                            Qty {cartItem.quantity} · {formatCurrency(product.price)} each
                                        </p>

                                        {cartItem.note && (
                                            <p className="mt-1 text-xs text-text-muted">
                                                Note: {cartItem.note}
                                            </p>
                                        )}
                                    </div>

                                    <p className="font-semibold text-purple-dark">
                                        {formatCurrency(product.price * cartItem.quantity)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex items-end justify-between border-t border-lilac-300 pt-5">
                        <span className="text-xs uppercase tracking-widest text-text-muted">
                            Total
                        </span>
                        <strong className="font-serif text-4xl text-purple-primary">
                            {formatCurrency(total)}
                        </strong>
                    </div>

                    <button
                        onClick={openCart}
                        className="mt-5 block rounded-full w-full border cursor-pointer border-purple-primary px-5 py-3 text-center text-sm font-semibold uppercase tracking-widest text-purple-primary transition hover:bg-purple-primary hover:text-white duration-300 ease-in-out"
                    >
                        Edit Basket
                    </button>
                </aside>
            </section>
        </>
    )
}