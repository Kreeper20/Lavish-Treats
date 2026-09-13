import { useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  product_name: string;
  quote: string;
  rating: number;
};
export const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [showFullQuote, setShowFullQuote] = useState(false);
  const toggleQuote = () => {
    setShowFullQuote(prevState => !prevState);
  }
  return (

    <>
      <div className="self-start h-fit bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row">
        <div
          className="flex-1 p-8 flex flex-col md:border-l border-gray-200 "
        >
         

          {showFullQuote ? <p className="text-lg text-gray-900 leading-snug mb-6 ">
            "{testimonial.quote}"
          </p> : <p className="text-lg text-gray-900 leading-snug mb-6 ">
            "{testimonial.quote.substr(0, 100)}..."
          </p>}

          <div className="flex items-center justify-between mt-auto pt-4">
            <span className="text-gray-400 text-sm">{testimonial.name}<span className="text-text-body font-light text-sm font-serif italic ml-2">
              {testimonial.product_name}
            </span></span>

            <button onClick={toggleQuote} className="text-sm font-bold text-black hover:underline">
              {showFullQuote ? "Read less" : "Read more"}
            </button>
          </div>
        </div>

      </div>

    </>
  );
}