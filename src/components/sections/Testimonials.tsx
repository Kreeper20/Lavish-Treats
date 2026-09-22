import { supabase } from "../utils/supabase"
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
            console.log("Testimonial inserted successfully:", data);
        }
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

    return (
        <>
            <div className="">
               
                {fetchError && <p className="text-red-500">{fetchError}</p>}
                {testimonialt && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-8">
                        {testimonialt.filter((_, i) => i < 2).map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                )}
                 <button onClick={() => setAddTestimonial(true)} className="bg-black mt-6 justify-start flex ml-12 text-white px-4 py-2 rounded-full hover:bg-gray-800">
                    Add Yours
                </button>
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
                                        onChange={(e)=> setName(e.target.value)}
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
                                <button type="submit" onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
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