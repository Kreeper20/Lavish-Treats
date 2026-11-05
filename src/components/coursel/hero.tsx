import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Cake from '../../assets/HeroCake.webp'


export const Hero = () => {
    const motionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=" py-12 lg:py-28 items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 px-6 max-w-7xl mx-auto gap-x-28 items-center">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    <motion.h1 variants={motionVariants} className="font-cursive text-purple-bright text-3xl">
                        Handcrafted in Kettering
                    </motion.h1>
                    <motion.h2 variants={motionVariants} className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                        Cakes & Sweet Treats Made for Every Celebration
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className=" text-purple-deep font-extralight text-lg lg:text-xl mb-4">
                        Not every milestone looks the same, but every one deserves something made with care. From elegant buttercream cakes to handcrafted pastries,
                        Lavish Treats creates desserts that become part of the memories you'll look back on long after the last slice is gone.
                    </motion.p>

                    <div className="flex flex-wrap gap-4 text-xl lg:text-lg font-serif font-light text-purple-bright">
                        <span>Beautiful to look at.</span>
                        <span className="text-gold">Delicious to taste.</span>
                        <span>Made fresh</span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-6">
                        <Link to="/custom-order" className="bg-purple-primary uppercase text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
                            request a cake quote
                        </Link>
                        <Link to="/gallery" className=" border border-purple-primary text-purple-primary px-6 py-3 rounded-full hover:bg-purple-dark hover:text-white transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
                            EXPLORE GALLERY
                        </Link>
                    </div>
                </motion.section>

                <motion.aside
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative  mt-8 lg:mt-0 "
                >
                    <div
                        className="relative w-full aspect-square rounded-3xl  overflow-hidden z-10 shadow-xl shadow-purple-lighter"
                    >
                        <motion.img
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            src={Cake}
                            alt="Lavish Treats"
                            width={1291}
                            height={1456}
                            fetchPriority="high"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.aside>

            </div>
        </motion.section>
    );
}
export const Hero2 = () => {
     const motionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=" py-12 lg:py-28 items-center">
            <div className=" md:text-center  px-6 max-w-5xl mx-auto gap-x-28 items-center mt-0 md:mt-14">        
                    <motion.h1 variants={motionVariants} className="font-cursive text-purple-bright text-3xl">
                        Christmas at Lavish Treats
                    </motion.h1>
                    <motion.h2 variants={motionVariants} className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                        Christmas sesson is here! Order your festive treats now.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className=" text-purple-deep font-extralight text-lg lg:text-xl mb-4">
                        Festive cakes, bakes and gift boxes for the table, the party and the people you love. Handcrafted in Kettering and baked fresh to order.
                    </motion.p>
                    <div className="flex flex-wrap md:justify-center mx-auto gap-4 mt-6">
                        <Link  to="/shop" className="bg-purple-primary uppercase text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
                            Preorder now
                        </Link>
                        <Link to="/gallery" className=" border border-purple-primary text-purple-primary px-6 py-3 rounded-full hover:bg-purple-dark hover:text-white transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
                            EXPLORE GALLERY
                        </Link>
                    </div>

            </div>
        </motion.section>
    )
}

