import { supabase } from "../../../src/supabase";
import { useEffect, useState } from "react"
import { TestimonialCard } from "../context/TestimonialCard"


export const TestimonialsBox = () => {
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [testimonialt, setTestimonialt] = useState<any[] | null>(null)
    const [addTestimonial, setAddTestimonial] = useState(false)
    const [name, setName] = useState('')
    const [quote, setQuote] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name || !quote) {
            setError("Please fill in all fields.");
            return;
        }

        const { data, error } = await supabase.from("testimonials").insert([{ name: name, quote: quote }]);

        if (error) {
            setError("Failed to add testimonial. Please try again.");
            console.error(error);
        } else {
            clearForm();
            success();
            console.log("Testimonial inserted successfully:", data);
        }
    }
    const [succesMessage, setSuccesMessage] = useState(false);
    const clearForm = () => {
        setName('');
        setQuote('');
    }
    const success = () => {
        setAddTestimonial(false);
        setError(null);
        setSuccesMessage(true);
    }

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase.from("testimonials").select()
            if (error) {
                setFetchError("Could not fetch the testimonials")
                setTestimonialt(null)
                console.log(error)
            };
            if (data) {
                console.log(data)
                setTestimonialt(data)
                setFetchError(null)
            }

        };

        fetchTestimonials()
    }, [])
    const [showAllTestimonials, setShowAllTestimonials] = useState(false);
    const toggleTestimonials = () => {
        setShowAllTestimonials(prevState => !prevState);
    }
    return (
        <>
            <div className="">

                {fetchError && <p className="text-red-500">{fetchError}</p>}
                <p className="text-center text-gray-500 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                    {succesMessage && "Thank you for your testimonial! It has been submitted successfully."}
                </p>
                {testimonialt && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">

                        {testimonialt.filter((_, i) => showAllTestimonials || i < 3).map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                )}
                <div className="flex flex-row gap-x-6 items-center justify-center">
                    <button onClick={toggleTestimonials} className="mt-6 uppercase cursor-pointer bg-purple-primary text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out">
                        {showAllTestimonials ? 'Show Less' : 'Show All'}
                    </button>
                    <button onClick={() => setAddTestimonial(true)} className="mt-6 cursor-pointer uppercase bg-white border border-purple-dark  text-purple-primary px-6 py-3 rounded-full hover:bg-white/40 transition delay-100 duration-300 ease-in-out">
                        Add Yours
                    </button>
                </div>

                {addTestimonial && (
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quote">
                                    Quote
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="quote"
                                    placeholder="Your Quote"
                                    onChange={(e) => setQuote(e.target.value)}
                                    value={quote}
                                />
                            </div>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            <button type="submit" onClick={handleSubmit} className="bg-black  text-white px-4 py-2 rounded hover:bg-gray-800">
                                Submit
                            </button>
                            <button type="button" onClick={() => setAddTestimonial(false)} className="ml-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}