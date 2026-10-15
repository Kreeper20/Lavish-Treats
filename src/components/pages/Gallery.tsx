import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { pastryData } from "../data/PastryData"
import { Helmet } from "react-helmet-async";

export const Gallery = () => {
    const motionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <>
            <Helmet>
                <title>Gallery | Lavish Treats</title>
                <meta name="description" content="Browse a collection of some of our favourite cakes, pastries, and desserts created for birthdays, weddings, baby showers, anniversaries, and special occasions." />
            </Helmet>
            <section className="bg-lilac-50 py-12 lg:py-28">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={motionVariants}
                    className="text-center items-center px-4 mx-auto"
                >
                    <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">Gallery</h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                        Every Creation Is Made With Love
                    </h2>
                    <p className=" text-text-body font-extralight text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                        Browse a collection of some of our favourite cakes, pastries, and desserts created for <br className='hidden md:block' /> birthdays, weddings, baby showers, anniversaries, and special occasions.
                    </p>
                </motion.div>


                <div aria-labelledby="gallery-heading" className="px-4 md:px-8 mt-6 md:mt-12">
                    <h2 id="gallery-heading" className="sr-only">Image Gallery</h2>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {pastryData.map((image) => (
                                <motion.div initial={{ opacity: 0, scale: 0.95, }} whileInView={{ opacity: 1, scale: 1, }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                                    key={image.id}
                                    className="aspect-3/4 overflow-hidden  bg-gray-100">
                                    <motion.img
                                        src={image.image}
                                        alt={image.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center max-w-xl mt-6 mx-auto justify-center gap-y-2 gap-x-2 flex-col md:flex-row">
                        <Link to="/custom-order" className="bg-purple-primary uppercase text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out hover:-translate-y-1 ">
                            Order something like this
                        </Link>
                        <Link to="/shop" className=" uppercase border border-purple-primary text-purple-primary px-6 py-3 rounded-full hover:bg-purple-dark hover:text-white transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
                            Explore Shop
                        </Link>
                    </div>

                </div>

            </section >


        </>
    )
}