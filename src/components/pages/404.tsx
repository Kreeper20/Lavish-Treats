import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const NotFound = () => {
  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-lilac-50 py-12 lg:py-28">
      <motion.div
        initial="hidden" animate="visible" variants={motionVariants}
        className="text-center items-center px-4 mx-auto"
      >
        <motion.h1 variants={motionVariants}
          className=" text-purple-bright font-light mb-3 uppercase tracking-widest">404</motion.h1>
        <motion.h2 variants={motionVariants}
          className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
          Page Not Found
        </motion.h2>
        <p className=" text-text-body font-extralight text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
          Sorry, the page you are looking for does not exist. Please check the URL or return to the homepage.
        </p>
        <Link to="/" className="mt-6 inline-block bg-purple-deep text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-bright transition-colors duration-300">
          Go to Homepage
        </Link>
      </motion.div>
    </section>
  );
}
