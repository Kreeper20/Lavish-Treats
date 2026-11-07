import { supabase } from "../../../src/supabase";
import { useEffect, useState, type FormEvent } from "react";

type Testimonial = { id: string | number; name: string; quote: string };

const INITIAL_COUNT = 3;
const MAX_QUOTE = 300;

export const TestimonialsBox = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [name, setName] = useState("");
    const [quote, setQuote] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // fetch
    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase.from("testimonials").select();
            if (error) {
                setFetchError("Could not fetch the testimonials");
                setTestimonials(null);
                console.log(error);
                return;
            }
            setTestimonials(data ?? []);
            setFetchError(null);
        };
        fetchTestimonials();
    }, []);

    // hide the thank-you message after a few seconds
    useEffect(() => {
        if (!submitted) return;
        const timer = setTimeout(() => setSubmitted(false), 6000);
        return () => clearTimeout(timer);
    }, [submitted]);

    // close the form with Escape
    useEffect(() => {
        if (!formOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeForm();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [formOpen]);

    const closeForm = () => {
        setFormOpen(false);
        setError(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!name.trim() || !quote.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setSubmitting(true);
        const { error } = await supabase
            .from("testimonials")
            .insert([{ name: name.trim(), quote: quote.trim() }]);
        setSubmitting(false);

        if (error) {
            setError("Failed to add testimonial. Please try again.");
            console.error(error);
            return;
        }

        setName("");
        setQuote("");
        setFormOpen(false);
        setSubmitted(true);
    };

    const visible = testimonials
        ? showAll
            ? testimonials
            : testimonials.slice(0, INITIAL_COUNT)
        : [];

    const inputStyles =
        "w-full rounded border border-gray-300 px-3 py-2.5 text-text-body leading-tight focus:border-purple-deep focus:outline-none focus:ring-1 focus:ring-purple-deep";

    return (
        <div>
            {fetchError && (
                <p className="text-center text-red-500">{fetchError}</p>
            )}

            {/* thank-you message */}
            {submitted && (
                <div
                    role="status"
                    className="mx-auto mb-6 flex max-w-xl items-center gap-3 rounded-2xl border border-lilac-panel bg-lilac-50 px-5 py-4 text-sm text-purple-deep"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 shrink-0 text-purple-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you for your testimonial! It has been submitted successfully.
                </div>
            )}

            {/* loading skeleton */}
            {!testimonials && !fetchError && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2].map((n) => (
                        <div
                            key={n}
                            className="h-56 animate-pulse rounded-2xl bg-lilac-panel"
                        />
                    ))}
                </div>
            )}

            {/* empty state */}
            {testimonials && testimonials.length === 0 && (
                <div className="mx-auto max-w-xl rounded-2xl border border-lilac-panel bg-lilac-50 px-8 py-12 text-center">
                    <p className="font-serif text-2xl text-purple-deep">
                        Be the first to share your experience
                    </p>
                    <p className="mt-2 text-sm text-text-muted">
                        We'd love to hear what you thought of your Lavish Treats order.
                    </p>
                </div>
            )}

            {/* testimonials */}
            {testimonials && testimonials.length > 0 && (
                <>
                    <p className="mb-8 text-center text-xs uppercase tracking-widest text-text-muted">
                        {testimonials.length} {testimonials.length === 1 ? "kind word" : "kind words"} from our customers
                    </p>

                    <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
                        {visible.map((t, i) => {
                            const featured = i === 0;
                            return (
                                <figure
                                    key={t.id}
                                    className={`mb-6 break-inside-avoid rounded-2xl border p-8 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg ${
                                        featured
                                            ? "border-purple-deep bg-purple-deep text-white"
                                            : "border-lilac-panel bg-white"
                                    }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`block select-none font-serif text-7xl leading-none ${
                                            featured ? "text-purple-bright" : "text-lilac-300"
                                        }`}
                                    >
                                        &ldquo;
                                    </span>
                                    <blockquote
                                        className={`-mt-4 font-serif text-lg leading-relaxed ${
                                            featured ? "text-white" : "text-text-card"
                                        }`}
                                    >
                                        {t.quote}
                                    </blockquote>
                                    <figcaption
                                        className={`mt-6 flex items-center gap-3 border-t pt-5 ${
                                            featured ? "border-white/20" : "border-lilac-panel"
                                        }`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-lg ${
                                                featured
                                                    ? "bg-white text-purple-deep"
                                                    : "bg-purple-primary text-white"
                                            }`}
                                        >
                                            {t.name.charAt(0).toUpperCase()}
                                        </span>
                                        <span>
                                            <span
                                                className={`block font-semibold ${
                                                    featured ? "text-white" : "text-purple-deep"
                                                }`}
                                            >
                                                {t.name}
                                            </span>
                                            <span
                                                className={`block text-xs uppercase tracking-widest ${
                                                    featured ? "text-white/70" : "text-text-muted"
                                                }`}
                                            >
                                                Happy customer
                                            </span>
                                        </span>
                                    </figcaption>
                                </figure>
                            );
                        })}
                    </div>
                </>
            )}

            {/* actions */}
            <div className="flex flex-row items-center justify-center gap-x-6">
                {testimonials && testimonials.length > INITIAL_COUNT && (
                    <button
                        onClick={() => setShowAll((prev) => !prev)}
                        className="mt-6 cursor-pointer rounded-2xl bg-purple-primary px-6 py-3 uppercase text-white transition delay-100 duration-300 ease-in-out hover:bg-purple-dark"
                    >
                        {showAll ? "Show Less" : "Show All"}
                    </button>
                )}
                <button
                    onClick={() => setFormOpen(true)}
                    className="mt-6 cursor-pointer rounded-2xl border border-purple-dark bg-white px-6 py-3 uppercase text-purple-primary transition delay-100 duration-300 ease-in-out hover:bg-white/40"
                >
                    Add Yours
                </button>
            </div>

            {/* add testimonial modal */}
            {formOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={closeForm}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="testimonial-title"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl"
                    >
                        <h2
                            id="testimonial-title"
                            className="font-serif text-2xl font-semibold text-purple-deep"
                        >
                            Share your experience
                        </h2>
                        <p className="mb-6 mt-1 text-sm text-text-muted">
                            Tell us about your Lavish Treats order.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="mb-1 block text-sm font-medium text-text-body"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    className={inputStyles}
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="mb-1 block text-sm font-medium text-text-body"
                                    htmlFor="quote"
                                >
                                    Your testimonial
                                </label>
                                <textarea
                                    className={`resize-none ${inputStyles}`}
                                    id="quote"
                                    rows={4}
                                    maxLength={MAX_QUOTE}
                                    placeholder="What did you love about your order?"
                                    onChange={(e) => setQuote(e.target.value)}
                                    value={quote}
                                />
                                <p className="mt-1 text-right text-xs text-text-muted">
                                    {quote.length}/{MAX_QUOTE}
                                </p>
                            </div>

                            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="cursor-pointer rounded-2xl bg-purple-primary px-6 py-2.5 text-white transition delay-100 duration-300 ease-in-out hover:bg-purple-dark disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitting ? "Submitting..." : "Submit"}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="ml-4 cursor-pointer rounded-2xl border border-purple-dark bg-white px-6 py-2.5 text-purple-primary transition delay-100 duration-300 ease-in-out hover:bg-white/40"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};