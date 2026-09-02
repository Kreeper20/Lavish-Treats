import { useState, type ChangeEvent, type FormEvent } from "react";
import { TAndCModal } from "../ui/T&Cmodal";
import { motion } from "framer-motion";


export const EnquiryForm = () => {

    const motionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hiddenr: { opacity: 0, x: -20 },
        visibler: { opacity: 1, x: 0 },
    };



    const boxStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-deep focus:border-purple-deep sm:text-sm"
    const [fileName, setFileName] = useState<string | null>(null);
    const [isSubmitted, setisSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({});
     const [error, setError] = useState<string | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName(null);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("/__forms.html", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Submission failed");

            setisSubmitted(true);
            form.reset();
            setFileName(null);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <motion.section className="py-12">
                <div className="max-w-4xl bg-white mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <motion.h1
                        initial="hidden" animate="visible" variants={motionVariants}
                        className="text-4xl md:text-5xl uppercase text-center font-extrabold text-text-heading mb-6">Request a Quote</motion.h1>
                    <motion.p
                        initial="hiddenr" animate="visibler" variants={motionVariants}
                        className="text-sm md:text-lg text-text-body text-center max-w-3xl mx-auto mb-12">
                        Planning a celebration or craving something sweet? Whether you know exactly what you're looking for or need help choosing the perfect
                        cake or dessert, we're here to help. Complete the enquiry form, and we'll be in touch as soon as possible.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
                        className="bg-lilac-100 p-6 md:p-12 w-fit mx-auto rounded-lg mb-6">
                        <h2 className="text-2xl font-serif text-gray-800 mb-4">Before You Order</h2>
                        <ul className="list-disc pl-5 space-y-1 font-semibold text-shadow-dark-text text-sm md:text-base">
                            <li>Minimum Notice:<span className="font-light pl-2">5 days prior to delivery</span></li>
                            <li>Rush orders:<span className="font-light pl-2">Within 48 hours from £20, subject to availability.</span></li>
                            <li>Collection:<span className="font-light pl-2">Kettering, United Kingdom.</span></li>
                        </ul>
                        <p className="font-light italic text-shadow-dark-text mt-4 text-sm md:text-base">
                            All products are freshly made to order; pricing may vary depending on customisation and design complexity.
                        </p>
                    </motion.div>
                    <motion.form
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
                        className="space-y-6 px-6 md:px-12" action="#" method="POST" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className={"block text-sm font-medium text-gray-700"}>
                                    Pickup/Delivery Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    placeholder="Pick a date"
                                    id="date"
                                    required
                                    className={boxStyles}
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className={"block text-sm font-medium text-gray-700"}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    required
                                    className={boxStyles}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className={"block text-sm font-medium text-gray-700"}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    className={boxStyles}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className={"block text-sm font-medium text-gray-700"}>
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    autoComplete="tel"
                                    placeholder="###-###-####"
                                    required
                                    className={boxStyles}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center">
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Order Details
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={3}
                                    required
                                    className={`resize-none ${boxStyles}`}
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label
                                        htmlFor="images"
                                        className={boxStyles + " cursor-pointer text-center bg-purple-deep hover:bg-purple-dark text-white font-semibold py-2 px-4 rounded-md transition duration-300"}
                                    >
                                        <span className="block truncate">
                                            {fileName || "Upload Reference Images (Optional)"}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        name="images"
                                        id="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <span
                                        className="block mt-1 text-sm text-gray-500">
                                        Upload supported file (Max 15MB)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cake Flavours
                                </label>
                                <div className="flex flex-col gap-3">
                                    {["Red Velvet", "Carrot Cake", "Cookies & Cream", "Classic Vanilla", "Rich Chocolate"].map((flavor) => {
                                        const id = `flavour-${flavor.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="flavours"
                                                    id={id}
                                                    className="w-5 h-5 mr-3 accent-black cursor-pointer"
                                                />
                                                <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                                                    {flavor}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Optional Toppings/Extras
                                </label>
                                <div className="flex flex-col gap-3">
                                    {["Cake Spheres", "Fondant Toppers", "Dried Florals", "Feathers", "Metallic Finishes", "Gold Leaf Details", "Personalised Names/Age Toppers"].map((topping) => {
                                        const id = `topping-${topping.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="toppings"
                                                    id={id}
                                                    className="w-5 h-5 mr-3 accent-black cursor-pointer"
                                                />
                                                <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                                                    {topping}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="order-first md:order-last">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icings
                                </label>
                                <div className="flex flex-col gap-3">
                                    {["Buttercream", "Ganache Frosting"].map((icing) => {
                                        const id = `icing-${icing.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="icings"
                                                    id={id}
                                                    className="w-5 h-5 mr-3 accent-black cursor-pointer"
                                                />
                                                <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                                                    {icing}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4 flex-col md:flex-row">
                            <label htmlFor="terms" className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    id="terms"
                                    required
                                    className="w-5 h-5 accent-black cursor-pointer block"
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                By submitting this form you agree to the
                            </label>
                            <a onClick={() => setShowModal(true)} target="_blank" rel="noopener noreferrer" className="text-purple-deep hover:text-purple-dark underline text-sm cursor-pointer">
                                Terms and Conditions
                            </a>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button type="submit" disabled={!termsAccepted || isSubmitting} className="bg-purple-deep disabled:bg-gray-300 hover:bg-purple-dark text-white font-semibold p-2 rounded-md transition duration-300 cursor-pointer w-full">
                                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                            </button>
                        </div>

                    </motion.form>

                </div>
                <p className="font-cursive text-2xl md:text-3xl mx-auto text-center text-purple-primary mt-3 md:mt-6 px-4">
                    Freshly baked. Handcrafted with care. Made to celebrate every moment.
                </p>
            </motion.section>
            <TAndCModal showModal={showModal} onClose={() => setShowModal(false)} />

        </>

    )
}