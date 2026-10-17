import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";

export const Contact = () => {

  const boxStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-deep focus:border-purple-deep sm:text-sm"

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      setError(null);
      setSuccessMessage(null);

      console.log("Form submitted successfully");
      setSuccessMessage("Thank you for your message! We'll get back to you soon.");
      
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Contact | Lavish Treats</title>
        <meta name="description" content="Get in touch with Lavish Treats for inquiries, orders, or any questions you may have. We're here to assist you with your custom cake and pastry needs." />
      </Helmet>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full py-12 lg:py-28 px-6"
      >
        <div className="grid grid-cols-1 gap-8 md:mt-0 sm:mt-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-left"
          >
            <motion.h1 className="font-light uppercase text-purple-bright tracking-widest">
              Contact Us
            </motion.h1>
            <motion.h2 className="font-serif text-purple-deep text-3xl font-semibold lg:text-6xl mt-2">
              We'd Love to Hear From You
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-text-body font-extralight text-sm md:text-base lg:text-lg mt-1 max-w-xl"
            >
              Whether you have a question about our products, need assistance with an order, or just want to say hello, we're here to help. Reach out to us and we'll get back to you as soon as possible.
            </motion.p>
            <div className="flex flex-col justify-start text-left">
              <h3 className="font-serif text-purple-deep text-2xl font-semibold lg:text-3xl mt-3">
                Contact Information
              </h3>
              <p className="text-text-body font-extralight text-sm md:text-base lg:text-lg mt-1">
                Email: <a href="mailto:info@lavishtreats.co.uk" className="text-purple-primary hover:underline">info@lavishtreats.co.uk</a>
                <br />
                Whatsapp: <a href="https://api.whatsapp.com/message/2JTPML3URTPUE1" className="text-purple-primary hover:underline">Chat on WhatsApp</a>
                <br />
                Address: Kettering, UK
              </p>
            </div>

          </motion.section>
          <motion.aside
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full max-w-lg justify-self-center"
          >
            <form className="w-full space-y-2 rounded-xl border border-lilac-panel bg-white p-6 shadow-sm sm:p-8 lg:p-10"
              name="Contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="Contact" />
              <input type="hidden" name="bot-field" />
              <div>
                <label htmlFor="name" className="mb-2 block text-base font-medium text-text-body">Name</label>
                <input type="text" required id="name" name="name" className={boxStyles} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-base font-medium text-text-body">Email</label>
                <input type="email" required id="email" name="email" className={boxStyles} />
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-base font-medium text-text-body">Subject</label>
                <input type="text" required id="subject" name="subject" className={boxStyles} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-base font-medium text-text-body">Message</label>
                <textarea id="message" required name="message" rows={5} className={`${boxStyles} resize-none`}></textarea>
              </div>
              {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={isSubmitting} className={`w-full rounded-xl bg-purple-deep px-5 py-4 text-xl font-medium text-white transition duration-300 ease-in-out hover:bg-purple-mid ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
          </motion.aside>
        </div>
        <div className="mt-12 max-w-6xl mx-auto bg-lilac-panel grid grid-cols-1 lg:grid-cols-2 rounded-2xl p-6 md:p-12 items-center">
          <div className="text-left">
            <h2 className="text-purple-deep font-serif text-3xl lg:text-4xl mb-3 font-semibold">
              Explore More of Our Bakery
            </h2>
            <p className=" text-text-body font-extralight text-sm md:text-basel g:text-lg max-w-2xl ">
              Visit our gallery to see our creations or explore our shop to place an order. We look forward to delighting you with our treats!
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-start lg:justify-center gap-2 text-center  items-center mt-6 lg:mt-0 ">
            <Link to="/gallery" className="bg-purple-primary w-full uppercase  text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out ">
              Gallery
            </Link>
            <Link to="/shop" className=" border border-purple-primary w-full text-purple-primary px-6 py-3 rounded-full hover:bg-purple-dark hover:text-white transition delay-100 duration-300 ease-in-out">
              EXPLORE SHOP
            </Link>
          </div>
        </div>
      </motion.section>


    </>
  )

}