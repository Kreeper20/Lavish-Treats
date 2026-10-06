import { useState, type ChangeEvent, type FormEvent } from "react";
import { TAndCModal } from "../ui/T&Cmodal";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";


export const EnquiryForm = () => {

    const motionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hiddenr: { opacity: 0, x: -20 },
        visibler: { opacity: 1, x: 0 },
    };



    const boxStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-deep focus:border-purple-deep text-xs md:text-sm";
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [firstFileName, setFirstFileName] = useState<string | null>(null);
    const [secondFileName, setSecondFileName] = useState<string | null>(null);

    const handleFirstFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstFileName(e.target.files?.[0]?.name ?? null);
    };

    const handleSecondFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSecondFileName(e.target.files?.[0]?.name ?? null);
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

            form.reset();
            setFirstFileName(null);
            setSecondFileName(null);
            console.log("Form submitted successfully");
            navigate({ to: "/orderConfirm" });
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [celebration, setCelebration] = useState("");
    const [cakeTier, setCakeTier] = useState(false);
    const [Orderaddon, setOrderaddon] = useState(false);
    const [collection, setCollection] = useState("");
    const [cakeSizeCustom, setCakeSizeCustom] = useState(false);
    const [cakeInscription, setCakeInscription] = useState(false);
    const [cakeStyle, setCakeStyle] = useState("");

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
                            <li>Payment:<span className="font-light pl-2">A deposit of 70% is required to confirm your order. The balance is due 2 days before the scheduled collection date.</span></li>
                        </ul>
                        <p className="font-light italic text-shadow-dark-text mt-4 text-sm md:text-base">
                            All products are freshly made to order; pricing may vary depending on customisation and design complexity.
                        </p>
                    </motion.div>
                    <motion.form
                        initial={false}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 px-6 md:px-12"
                        name="Custom-Order-Enquiry"
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <input type="hidden" name="form-name" value="Custom-Order-Enquiry" />
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
                                    Phone/WhatsApp Number
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
                                    placeholder="Please describe the colours, theme, style, decorations and any specific details you would like."
                                    rows={3}
                                    required
                                    className={`resize-none ${boxStyles}`}
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label
                                        htmlFor="images"
                                        className={boxStyles + " cursor-pointer text-center bg-purple-deep hover:bg-purple-dark text-white font-semibold py-2 px-4 rounded-md transition duration-300 block"}
                                    >
                                        <span className="block truncate">
                                            {firstFileName || "Upload Reference Images (Optional)"}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        name="images"
                                        id="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFirstFileChange}
                                        className="hidden"
                                    />

                                    <label
                                        htmlFor="images-2"
                                        className={boxStyles + " cursor-pointer text-center bg-purple-deep hover:bg-purple-dark text-white font-semibold py-2 px-4 rounded-md transition duration-300 block"}
                                    >
                                        <span className="block truncate">
                                            {secondFileName || "Upload Reference Images (Optional)"}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        name="images-2"
                                        id="images-2"
                                        accept="image/*"
                                        multiple
                                        onChange={handleSecondFileChange}
                                        className="hidden"
                                    />

                                    <span className="block mt-1 text-sm text-gray-500">
                                        Upload supported file (Max 15MB)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <label className="text-sm font-medium text-gray-700">Addons Interested in Ordering...</label>
                            <div className="flex flex-col md:flex-row gap-3">

                                {["Cupcakes", "Cake pops", "Treats / Small Chops", "Other"].map((addon) => {

                                    const id = `topping-${addon.replace(/\s+/g, "-").toLowerCase()}`;
                                    return (

                                        <div key={id} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="addons"
                                                value={addon}
                                                id={id}
                                                className="w-5 h-5 mr-3 accent-black cursor-pointer"
                                                onChange={() => setOrderaddon(addon === "Other")}
                                            />
                                            <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                                                {addon}
                                            </label>
                                            {addon === "Other" && Orderaddon && (
                                                <input
                                                    type="text"
                                                    name="addons-other"
                                                    placeholder="Please specify"
                                                    className={`${boxStyles} w-full ml-2`}
                                                />
                                            )}
                                        </div>
                                    );

                                })}

                            </div>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div>
                                <label htmlFor="celebration" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Celebration
                                </label>

                                <select
                                    name="celebration"
                                    id="celebration"
                                    value={celebration}
                                    required
                                    className={boxStyles}
                                    onChange={(e) => setCelebration(e.target.value)}
                                >
                                    <option value=""  disabled>
                                        Please select an option
                                    </option>
                                    {[
                                        "Birthday",
                                        "Wedding",
                                        "Anniversary",
                                        "Baby Shower",
                                        "Bridal Shower",
                                        "Christening/Naming Ceremony",
                                        "Graduation",
                                        "Corporate Event",
                                        "Engagement",
                                        "Other",
                                    ].map((event) => (
                                        <option key={event} value={event}>
                                            {event}
                                        </option>
                                    ))}
                                </select>

                                {celebration === "Other" && (
                                    <input
                                        type="text"
                                        name="celebration-other"
                                        placeholder="Please specify"
                                        required
                                        className={boxStyles}
                                    />
                                )}
                                <div>
                                    <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                                        Number of Servings *
                                    </label>
                                    <input
                                        type="number"
                                        name="servings"
                                        id="servings"
                                        placeholder="Please specify the number of servings"
                                        required
                                        className={boxStyles}
                                    />
                                    <label htmlFor="wording" className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                                        Cake inscription / wording (Optional)
                                    </label>
                                    <textarea
                                        name="wording"
                                        id="wording"
                                        placeholder="Please specify inscription you would like (if applicable)"
                                        rows={2}
                                        className={`resize-none ${boxStyles} mt-2`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cake Details <span className="text-xs font-light">(Choose One)</span>
                                </label>
                                <div className="flex flex-col">

                                    {[" 4 inch", " 6 inch", " 8 inch", " 10 inch", "Tiered cake", "Not Sure - Please advise"].map((cakeSize) => {

                                        const id = `cakeSize-${cakeSize.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (

                                            <div key={id} className="block">
                                                <input
                                                    type="radio"
                                                    name="cakeSize"
                                                    value={cakeSize.trim()}
                                                    id={id}
                                                    className="w-5 h-5 mr-3 accent-black cursor-pointer"
                                                    onChange={() => {
                                                        setCakeTier(cakeSize === "Tiered cake");
                                                        setCakeSizeCustom(cakeSize === "Not Sure - Please advise");
                                                    }}

                                                />
                                                <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                                                    {cakeSize}
                                                </label>
                                                {cakeSize === "Not Sure - Please advise" && cakeSizeCustom && (
                                                    <p className="text-sm text-gray-500 ml-3 ">
                                                        (We'll contact you to discuss your options)
                                                    </p>
                                                )}
                                                {cakeSize === "Tiered cake" && cakeTier && (
                                                    <div className="flex flex-col gap-2 ml-3">
                                                        <p className="text-sm text-gray-600">
                                                            Please tell us your preferred flavour for each tier:
                                                        </p>

                                                        <p className="text-sm text-gray-600">
                                                            <input type="text" name="Top-Tier" placeholder="Top Tier" className={`${boxStyles} w-full`} />
                                                        </p>

                                                        <p className="text-sm text-gray-600">
                                                            <input type="text" name="Middle-Tier" placeholder="Middle Tier" className={`${boxStyles} w-full`} />
                                                        </p>

                                                        <p className="text-sm text-gray-600">
                                                            <input type="text" name="Bottom-Tier" placeholder="Bottom Tier" className={`${boxStyles} w-full`} />
                                                        </p>

                                                    </div>

                                                )}
                                            </div>
                                        );

                                    })}

                                </div>
                            </div>

                            <div className="order-first md:order-last">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cake shape <span className="text-xs font-light">(Choose One)</span>
                                </label>
                                <div className="flex flex-col gap-3">
                                    {["Round", "Square", "Heart", "Oval"].map((cakeShape) => {
                                        const id = `cake-shape-${cakeShape.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={id} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="cake-shapes"
                                                    value={cakeShape}
                                                    id={id}
                                                    className="w-5 h-5 mr-3 accent-black cursor-pointer"
                                                />
                                                <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                                                    {cakeShape}
                                                </label>
                                            </div>
                                        );
                                    })}
                                    <div>
                                        <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                                            What style are you looking for?
                                        </label>

                                        <select
                                            name="style"
                                            id="style"
                                            value={cakeStyle}
                                            required
                                            className={boxStyles}
                                            onChange={(e) => setCakeStyle(e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Please select an option
                                            </option>
                                            {[
                                                "Elegant & Minimal",
                                                "Luxury",
                                                "Vintage / Piped",
                                                "Floral",
                                                "Character / Themed",
                                                "Modern",
                                                "Fun & Colourful",
                                                "Corporate / Branded",
                                                "Other",
                                            ].map((style) => (
                                                <option key={style} value={style}>
                                                    {style}
                                                </option>
                                            ))}
                                        </select>
                                        {cakeStyle === "Other" && (
                                            <input
                                                type="text"
                                                name="cakeStyle-other"
                                                placeholder="Please specify"
                                                required
                                                className={boxStyles}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cake Flavours <span className="text-xs font-light">(Choose One)</span>
                                </label>
                                <div className="flex flex-col gap-3">
                                    {["Red Velvet", "Carrot Cake", "Cookies & Cream", "Classic Vanilla", "Rich Chocolate"].map((flavor) => {
                                        const id = `flavour-${flavor.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={id} className="flex ">
                                                <input
                                                    type="radio"
                                                    name="flavours"
                                                    value={flavor}
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
                                <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                                    Preferred Colour Scheme
                                </label>
                                <input type="text" name="preferred-colour-scheme" id="preferred-colour-scheme" className={boxStyles} placeholder="Please specify your preferred colour scheme" />

                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Optional Toppings/Extras
                                </label>
                                <div className="flex flex-col gap-1">

                                    {["Cake Spheres ", "Fondant Toppers", "Dried Florals", "Feathers", "Metallic Finishes", "Gold Leaf Details", "Personalised Names/Age Toppers"].map((topping) => {

                                        const id = `topping-${topping.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={id} className="block items-center">
                                                <input
                                                    type="checkbox"
                                                    name="toppings"
                                                    value={topping}
                                                    id={id}
                                                    className="w-5 h-5 mr-3 accent-black cursor-pointer"
                                                    onChange={(event) => {
                                                        if (topping === "Personalised Names/Age Toppers") {
                                                            setCakeInscription(event.target.checked);
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                                                    {topping}
                                                </label>

                                                {topping === "Personalised Names/Age Toppers" && cakeInscription && (
                                                    <div className="flex flex-col gap-2 ml-3 " >
                                                        <p className="text-sm text-gray-600">
                                                            Please specify the name and age for the topper (leave blank if not applicable):
                                                        </p>
                                                        <input
                                                            type="text"
                                                            name="Name-Inscription"
                                                            placeholder="Please specify Name"
                                                            className={`${boxStyles} w-full ml-2`}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="Age-Inscription"
                                                            placeholder="Please specify Age"
                                                            className={`${boxStyles} w-full ml-2`}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                        );

                                    })}

                                </div>
                            </div>

                            <div className="order-first md:order-last">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icings <span className="text-xs font-light">(Choose One)</span>
                                </label>
                                <div className="flex flex-col gap-3">
                                    {["Buttercream", "Ganache Frosting"].map((icing) => {
                                        const id = `icing-${icing.replace(/\s+/g, "-").toLowerCase()}`;
                                        return (
                                            <div key={id} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="icings"
                                                    value={icing}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="collection" className="block text-sm font-medium text-gray-700">
                                    How will you be collecting your order?
                                </label>
                                <select
                                    name="collection"
                                    id="collection"
                                    value={collection}
                                    required
                                    className={boxStyles}
                                    onChange={(e) => setCollection(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Please select an option
                                    </option>
                                    {[
                                        "Collection From Kettering",
                                        "Delivery to Address",
                                        "Not Sure Yet",
                                    ].map((collectionOption) => (
                                        <option key={collectionOption} value={collectionOption}>
                                            {collectionOption}
                                        </option>
                                    ))}
                                </select>
                                {collection === "Delivery to Address" && (
                                    <div>
                                        <input
                                            type="text"
                                            name="collection-delivery-address"
                                            placeholder="Delivery Address"
                                            required
                                            className={boxStyles}
                                        />
                                        <textarea
                                            name="collection-delivery-notes"
                                            placeholder="Delivery Notes"
                                            rows={2}
                                            required
                                            className={`resize-none ${boxStyles}`}
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Please note that delivery charges are calculated based on location and are added separately to the cake price.
                                        </p>
                                    </div>
                                )}
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
                        <p className="text-red-500 text-sm mt-2">{error}</p>

                    </motion.form>

                </div>
                <p className="font-cursive text-2xl md:text-3xl mx-auto text-center text-purple-primary mt-3 md:mt-6 px-4">
                    Freshly baked. Handcrafted with care. Made to celebrate every moment.
                </p>
            </motion.section >
            <TAndCModal showModal={showModal} onClose={() => setShowModal(false)} />

        </>

    )
}