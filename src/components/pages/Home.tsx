import { Link } from '@tanstack/react-router'
import Cake from '../../assets/HeroCake.webp'
import { MultiLayered } from '../utils/imports'
import bake from '../../assets/Bg/bake.svg'
import { pastryData } from '../data/PastryData'
import { PastriesBoxes } from '../ui/PastriesBoxes'
import { GalleryBoxes } from '../ui/GalleryBoxes'
import { motion } from 'framer-motion'
import { TestimonialsBox } from '../sections/Testimonials'
import { Helmet } from "react-helmet-async";




export const Home = () => {
    const motionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },

    };

    const reasons = [
        "Freshly baked to order",
        "Premium quality ingredients",
        "Beautiful handcrafted designs",
        "Personalised celebrations",
        "Reliable ordering process",
        "5-star food hygiene rating",
    ]
   
    return (

        <>
            <Helmet>
                <title>Home | Lavish Treats</title>
                <meta name="description" content="Lavish Treats is a bakery that specializes in custom cakes and pastries based in Kettering UK." />
            </Helmet>

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
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.aside>

                </div>
            </motion.section>
            <section className="bg-purple-deep py-12 md:py-28">
                <div className=" text-center items-center px-6 mx-auto">

                    <h1 className=" text-gold font-light mb-3 uppercase tracking-widest">
                        We bake for moments that matter
                    </h1>
                    <p className="font-serif text-purple-soft text-xl md:text-2xl lg:text-4xl mb-3">
                        There are birthdays you will never forget. Baby showers filled with <br className='lg:block hidden' /> laughter. Anniversaries worth celebrating. Quiet Sundays <br className='lg:block hidden' /> that deserve something sweet.

                    </p>
                    <p className=" text-sm md:text-base lg:text-lg text-text-dim mx-auto max-w-2xl font-light mb-4">
                        At Lavish Treats, every order is created with one purpose, to make those moments feel even more special. Each cake is baked fresh to order.
                        Every pastry is prepared with care. Every detail matters, because we know it isn't just dessert.
                    </p>
                    <h2 className="font-cursive text-purple-light text-3xl">
                        It's part of your story.
                    </h2>
                </div>
            </section>

            <section className="py-12 md:py-28">
                <div className="text-center items-center px-6 mx-auto">
                    <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">Our Menu</h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                        Something for Every Occasion
                    </h2>
                    <p className=" text-text-body text-sm md:text-base lg:text-lg font-light mb-4">
                        Whether you're planning an intimate gathering or a grand celebration, <br className='hidden lg:block' /> we have something special for every table.
                    </p>
                </div>
                <div className="grid grid-cols-1 justify-self-center md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-6 lg:px-4 max-w-7xl mx-auto">
                    {pastryData.filter((_, i) => [0, 1, 2, 3].includes(i)).map((pastry) => (
                        <PastriesBoxes
                            key={pastry.id}
                            name={pastry.name}
                            description={pastry.description}
                            imageUrl={pastry.image}
                            link={pastry.link}
                        />
                    ))}
                </div>
            </section>

            <section className="bg-lilac-panel py-12 md:py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6 mx-auto max-w-7xl">
                    <section>
                        <h1 className=" text-purple-bright text-sm font-light mb-3 uppercase tracking-widest">
                            Why families keep coming back to Lavish Treats
                        </h1>
                        <h2 className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                            More Than a Bakery
                        </h2>
                        <h3 className="font-cursive text-gold font-extralight text-3xl mb-3">
                            Made with love and care.
                        </h3>
                        <p className=" text-text-body font-extralight text-lg">
                            Collection available in Kettering,freshly baked to order, every time.
                        </p>
                    </section>
                    <aside className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 md:mt-0 text-purple-deep">
                        {reasons.map((reason, index) => (
                            <div key={index} className="bg-white border border-border-soft rounded-2xl items-center flex p-4 gap-4">
                                <div className="bg-purple-dark w-2 h-2 rounded-full" />
                                <h1>
                                    {reason}
                                </h1>
                            </div>
                        ))}
                    </aside>
                </div>
            </section>

            <section className="bg-lilac-50 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6 gap-x-28  mx-auto max-w-7xl">
                    <section className="mt-8 lg:mt-0">
                        <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">
                            FEATURED CELEBRATION CAKES
                        </h1>
                        <h2 className="font-serif text-purple-deep text-4xl lg:text-5xl mb-3 font-semibold">
                            Buttercream Celebration Cakes
                        </h2>

                        <p className=" text-text-body font-extralight text-sm md:text-base lg:text-lg">
                            Our signature buttercream cakes combine elegant designs with rich flavours, making them the perfect centrepiece for your celebration.
                            Available in multiple sizes with custom design options to suit your occasion.
                        </p>
                        <Link to="/cakes" className="text-purple-bright hover:text-purple-dark font-semibold hover:transition-colors duration-300">
                            View Pricing
                        </Link>
                    </section>
                    <motion.aside
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="relative   order-first"
                    >
                        <div
                            className="relative w-full aspect-square rounded-3xl overflow-hidden z-10 "
                        >
                            <img
                                src={MultiLayered}
                                alt="Lavish Treats"
                                className="w-full h-full object-fit hover:scale-101 duration-500"
                            />
                        </div>
                    </motion.aside>
                </div>
            </section>

            <section className=" bg-lilac-panel grid grid-cols-1 md:grid-cols-2">
                <div className="items-center px-6  py-12 order-last mx-auto">
                    <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">
                        How to order
                    </h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-5xl mb-3 font-semibold">
                        Ordering Is Easy
                    </h2>
                    <p className=" text-text-body font-extralight text-lg mb-4">
                        Follow these simple steps to order your custom desserts.
                    </p>
                    <div className="mt-6 grid grid-cols-1  gap-12 items-center">
                        <div className=" border-t text-left  border-purple-primary">
                            <dl className="w-full  divide-y divide-purple-primary">
                                {[
                                    [0o1, "01", "Browse our cakes, pastries, and desserts."],
                                    [0o2, "02", "Choose your preferred size, flavour, and design."],
                                    [0o3, "03", "Send us your enquiry or place your order."],
                                    [0o4, "04", "Collect your freshly baked order from Kettering."],
                                ].map(([num, title, description]) => (
                                    <div key={num} className="flex flex-col gap-2 py-4 border-b border-purple-primary" >
                                        <dt className="font-cursive text-lg font-semibold text-accent-lavender">{title}</dt>
                                        <dd className="mt-1 text-text-body ">{description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
                <aside className="order-last hidden md:block" style={{ backgroundImage: `url(${bake})` }} />
            </section>

            <section className="bg-lilac-50 py-12 ">
                <div className="text-center items-center px-6 mx-auto">
                    <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">Gallery</h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-5xl mb-3 font-semibold">
                        Every Creation Is Made With Love
                    </h2>
                    <p className=" text-text-body font-extralight text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                        Browse a collection of some of our favourite cakes, pastries, and desserts created for birthdays, weddings, baby showers, anniversaries, and special occasions.
                    </p>
                    <div className="grid mb-8 md:mb-12 justify-self-center grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-8  max-w-6xl mx-auto">
                        {pastryData.filter((_, i) => [5, 6, 8, 9].includes(i)).map((pastry) => (
                            <GalleryBoxes
                                key={pastry.image}
                                name={pastry.name}
                                imageUrl={pastry.image}
                            />
                        ))}
                    </div>
                    <Link to="/gallery" className=" text-purple-bright border border-purple-bright px-6 py-3 rounded-full hover:bg-purple-dark hover:text-white transition-colors duration-300 uppercase tracking-widest">
                        VIew Gallery
                    </Link>
                </div>
            </section>

            <section className="testimonials py-12 md:py-28">
                <div className="text-center items-center px-6 mx-auto max-w-7xl ">
                    <h1 className=" text-gold font-light mb-3 uppercase tracking-widest">Testimonials</h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-5xl mb-3 font-semibold">
                        Loved by Our Customers
                    </h2>
                    <p className=" text-text-body font-extralight text-lg mb-4">
                        Nothing makes us happier than seeing our customers celebrate life's special moments with our creations.
                    </p>
                    <TestimonialsBox />
                </div>
             
            </section>

            <section className="bg-lilac-50 py-12  px-6 ">
                <div className="homeContact relative  overflow-hidden rounded-4xl py-12 items-center px-10 text-center text-white mx-auto max-w-5xl">
                    <div className="absolute -top-12.5 -right-7.5 w-50 h-50 rounded-full bg-white/8" />
                    <div className="absolute -bottom-15 -left-5 w-60 h-60 rounded-full bg-accent-lavender/20" />
                    <h1 className="font-cursive text-gold text-3xl">
                        Ready to Order Something Special?
                    </h1>
                    <h2 className="font-serif text-white text-3xl lg:text-5xl mb-4 font-semibold">
                        Let's bake something <br className='hidden lg:block' /> beautiful just for you
                    </h2>
                    <p className=" text-white/85 font-light text-base  mb-4">
                        Whether you're celebrating a milestone or simply treating yourself, we'd love to <br className='hidden lg:block' /> create something unforgettable.
                    </p>
                    <div className=" flex flex-wrap justify-center gap-3 md:gap-4 mt-6">
                        <Link to="/cakes" className="bg-white w-full md:w-fit text-purple-dark px-6 py-3 rounded-full hover:bg-gold hover:text-white transition delay-100 duration-300 ease-in-out">
                            ORDER TODAY
                        </Link>
                        <Link to="/contact" className=" border w-full md:w-fit text-white px-6 py-3 rounded-full hover:bg-purple-dark hover:text-white transition delay-100 duration-300 ease-in-out ">
                            CONTACT US
                        </Link>
                    </div>

                </div>
            </section>


        </>

    )
}