import { Link } from '@tanstack/react-router'
import Cake from '../../assets/HeroCake.jpeg'
import { pastryData } from '../data/PastryData'
import { PastriesBoxes } from '../ui/PastriesBoxes'
import { GalleryBoxes } from '../ui/GalleryBoxes'
import { testimonials } from '../data/TestimonialData'
import { IconStarFilled } from '@tabler/icons-react';

export const Home = () => {
    return (
        <>
            <section className="relative overflow-hidden py-12 md:py-28 items-center">
                <div className="grid grid-cols-1 md:mt-0 sm:mt-8 lg:grid-cols-2 px-6 lg:px-12 max-w-7xl mx-auto items-center">
                    <section>
                        <h1 className="font-cursive text-purple-bright text-3xl">
                            Handcrafted in Kettering
                        </h1>
                        <h2 className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                            Cakes & Sweet Treats Made for Every Celebration
                        </h2>
                        <p className=" text-text-body font-light text-lg lg:text-xl mb-4">
                            Not every milestone looks the same, but every one deserves something made with care. From elegant buttercream cakes to handcrafted pastries,
                            Lavish Treats creates desserts that become part of the memories you'll look back on long after the last slice is gone.
                        </p>

                        <div className="flex flex-wrap gap-4 text-xl lg:text-lg font-serif font-light text-purple-bright">
                            <span>Beautiful to look at.</span>
                            <span className="text-gold">Delicious to taste.</span>
                            <span>Made fresh</span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6">
                            <Link to="/cakes" className="bg-purple-primary text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
                                ORDER YOUR TREATS
                            </Link>
                            <Link to="/contact" className=" border border-purple-primary text-purple-primary px-6 py-3 rounded-full hover:bg-purple-dark hover:text-white transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
                                EXPLORE OUR BAKREY
                            </Link>
                        </div>
                    </section>
                    <aside>
                        <img src={Cake} alt="Lavish Treats" className="justify-self-center mt-8 lg:justify-self-end rounded-full shadow-accent-lavender shadow-xl " />
                    </aside>
                </div>
            </section>

            <section className="bg-purple-deep py-12 md:py-28">
                <div className=" text-center items-center  px-6 mx-auto">

                    <h1 className=" text-gold font-light mb-3 uppercase tracking-widest">
                        We bake for moments that matter
                    </h1>
                    <p className="font-serif text-purple-soft text-2xl lg:text-4xl mb-4">
                        There are birthdays you will never forget. Baby showers filled with <br className='lg:block hidden' /> laughter. Anniversaries worth celebrating. Quiet Sundays <br className='lg:block hidden' /> that deserve something sweet.

                    </p>
                    <p className=" text-lg text-text-dim font-light mb-4">
                        At Lavish Treats, every order is created with one purpose, to make those moments feel <br className='lg:block hidden' /> even more special. Each cake is baked fresh to order.
                        Every pastry is prepared with care.<br className='lg:block hidden' /> Every detail matters, because we know it isn't just dessert.
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
                    <p className=" text-text-body font-extralight text-lg mb-4">
                        Whether you're planning an intimate gathering or a grand celebration, <br className='hidden lg:block' /> we have something special for every table.
                    </p>
                </div>
                <div className="grid grid-cols-1 justify-self-center md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-6 lg:px-4 max-w-7xl mx-auto">
                    {pastryData.map((pastry) => (
                        <PastriesBoxes
                            key={pastry.name}
                            name={pastry.name}
                            description={pastry.description}
                            imageUrl={pastry.image}
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
                        <div className="bg-white border border-border-soft rounded-2xl items-center flex p-4 gap-4">
                            <div className="bg-purple-dark w-2 h-2 rounded-full" />
                            <h1>
                                Freshly baked to order
                            </h1>
                        </div>
                        <div className="bg-white border border-border-soft rounded-2xl items-center flex p-4 gap-4">
                            <div className="bg-purple-dark w-2 h-2 rounded-full" />
                            <h1>
                                Premium quality ingredients
                            </h1>
                        </div>
                        <div className="bg-white border border-border-soft rounded-2xl items-center flex p-4 gap-4">
                            <div className="bg-purple-dark w-2 h-2 rounded-full" />
                            <h1>
                                Beautiful handcrafted designs
                            </h1>
                        </div>
                        <div className="bg-white border border-border-soft rounded-2xl items-center flex p-4 gap-4">
                            <div className="bg-purple-dark w-2 h-2 rounded-full" />
                            <h1>
                                Personalised celebrations
                            </h1>
                        </div>
                        <div className="bg-white border border-border-soft rounded-2xl items-center flex p-4 gap-4">
                            <div className="bg-purple-dark w-2 h-2 rounded-full" />
                            <h1>
                                Attention to every detail
                            </h1>
                        </div>
                        <div className="bg-white border border-border-soft rounded-2xl items-center flex p-4 gap-4">
                            <div className="bg-purple-dark w-2 h-2 rounded-full" />
                            <h1>
                                Reliable ordering process
                            </h1>
                        </div>

                    </aside>
                </div>
            </section>

            <section className="bg-lilac-50 py-12 md:py-28">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6 mx-auto max-w-7xl">
                    <section>
                        <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">
                            FEATURED CELEBRATION CAKES
                        </h1>
                        <h2 className="font-serif text-purple-deep text-4xl lg:text-5xl mb-3 font-semibold">
                            Buttercream Celebration Cakes
                        </h2>

                        <p className=" text-text-body font-extralight text-lg">
                            Our signature buttercream cakes combine elegant designs with rich flavours, making them the perfect centrepiece for your celebration.
                            Available in multiple sizes with custom design options to suit your occasion.
                        </p>
                        <Link to="/contact" className="text-purple-bright hover:text-purple-dark font-semibold hover:transition-colors duration-300">
                            View Pricing
                        </Link>
                    </section>
                    <aside className="order-first">
                        <div className="border border-border-soft w-fit rounded-2xl items-center overflow-hidden justify-self-center mb-4 ">
                            <img src={Cake} alt="Lavish Treats" className="object-cover hover:scale-105 duration-500 " />
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-purple-deep py-12 md:py-28">
                <div className="text-center items-center px-6 mx-auto max-w-7xl">
                    <h1 className=" text-gold font-light mb-3 uppercase tracking-widest">
                        Ready to order your treats?
                    </h1>
                    <h2 className="font-serif text-white text-4xl lg:text-6xl mb-3 font-semibold">
                        Let's make your celebration even sweeter.
                    </h2>
                    <p className=" text-text-body font-extralight text-lg mb-4">
                        Whether you're planning a birthday, wedding, or any special occasion, we're here to create the perfect dessert for your celebration.
                    </p>
                    <Link to="/contact" className="bg-purple-primary text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
                        CONTACT US
                    </Link>
                </div>
            </section>

            <section className="bg-lilac-panel py-12 md:py-28">
                <div className="text-center items-center px-6 mx-auto max-w-7xl">
                    <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">
                        How to order
                    </h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-5xl mb-3 font-semibold">
                        Ordering Is Easy
                    </h2>
                    <p className=" text-text-body font-extralight text-lg mb-4">
                        Follow these simple steps to order your custom desserts.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 items-center">
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
                        <img src={Cake} alt="Lavish Treats" className="justify-self-center mt-8 lg:justify-self-end rounded-sm shadow-accent-lavender shadow-xl " />
                    </div>
                </div>
            </section>

            <section className="bg-lilac-50 py-12 md:py-28">
                <div className="text-center items-center px-6 mx-auto">
                    <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">Gallery</h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-5xl mb-3 font-semibold">
                        Every Creation Is Made With Love
                    </h2>
                    <p className=" text-text-body font-extralight text-lg mb-4">
                        Browse a collection of some of our favourite cakes, pastries, and desserts created for <br className='hidden md:block' /> birthdays, weddings, baby showers, anniversaries, and special occasions.
                    </p>
                    <div className="grid grid-cols-1 mb-8 md:mb-12 justify-self-center md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-6 lg:px-4 max-w-7xl mx-auto">
                        {pastryData.map((pastry) => (
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
                <div className="text-center items-center px-6 mx-auto max-w-7xl">
                    <h1 className=" text-gold font-light mb-3 uppercase tracking-widest">Testimonials</h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-5xl mb-3 font-semibold">
                        Loved by Our Customers
                    </h2>
                    <p className=" text-text-body font-extralight text-lg mb-4">
                        Nothing makes us happier than seeing our customers celebrate life's special moments with our creations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                        {testimonials().map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white p-3 rounded-lg shadow-md flex flex-col">
                                <div className="flex text-gold mb-4">
                                    <IconStarFilled size={20} />
                                    <IconStarFilled size={20} />
                                    <IconStarFilled size={20} />
                                    <IconStarFilled size={20} />
                                    <IconStarFilled size={20} />
                                </div>
                                <p className="text-text-body font-light text-lg font-serif italic grow">
                                    {testimonial.testimonial}
                                </p>
                                <h3 className="text-purple-deep font-semibold font-serif text-xl mb-2 mt-4">
                                    {testimonial.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-lilac-50 py-12  px-6">
                <div className="homeContact relative  overflow-hidden rounded-4xl py-12 items-center px-10 text-center text-white mx-auto max-w-5xl">
                    <div className="absolute -top-12.5 -right-7.5 w-50 h-50 rounded-full bg-white/8" />
                    <div className="absolute -bottom-15 -left-5 w-60 h-60 rounded-full bg-accent-lavender/20" />
                     <h1 className="font-cursive text-gold text-3xl">
                            Ready to Order Something Special?
                        </h1>
                         <h2 className="font-serif text-white text-4xl lg:text-5xl mb-4 font-semibold">
                            Let's bake something <br className='hidden lg:block' /> beautiful just for you
                        </h2>
                        <p className=" text-white/85 font-light text-base  mb-4">
                           Whether you're celebrating a milestone or simply treating yourself, we'd love to <br className='hidden lg:block'/> create something unforgettable.
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