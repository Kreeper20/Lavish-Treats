import { Ose } from "../utils/imports"
import { motion } from 'framer-motion'

export const About = () => {

  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>

      <section className="  py-12 lg:py-28 items-center px-6">
        <div className="grid grid-cols-1 md:mt-0 sm:mt-8 lg:grid-cols-2 max-w-7xl mx-auto items-center gap-x-28">
          <motion.section initial="hidden" animate="visible" variants={motionVariants} >
            <motion.h1 variants={motionVariants} className="font-light uppercase text-purple-bright tracking-widest">
              About Lavish Treats
            </motion.h1>
            <motion.h2 variants={motionVariants} className="font-serif text-purple-deep text-4xl font-semibold lg:text-6xl mt-2">
              It All Started With One Birthday Cake
            </motion.h2>
            <motion.p
              initial="hidden" animate="visible" variants={motionVariants}
              className=" text-text-body font-extralight text-sm md:text-base lg:text-lg mt-4">

              Long before Lavish Treats became a bakery, baking had always been a passion.
              But everything changed after becoming a mum.
              Like many parents, I wanted my baby's birthday to feel unforgettable. I wanted a cake that
              wasn't just beautiful to look at but one that reflected the love behind the celebration.
            </motion.p>
            <motion.p
              initial="hidden" animate="visible" variants={motionVariants}
              className=" text-text-body font-extralight text-sm md:text-base lg:text-lg mt-4">
              Although I had been baking for years, that special moment inspired me to take my skills
              even further. I dedicated time to mastering the art of cake decorating, learning new
              techniques, refining every detail and creating bespoke cakes that looked every bit as
              beautiful as they tasted.
            </motion.p>
          </motion.section>
          <motion.aside
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="relative mt-8 lg:mt-0"
                    >
                        <div
                            className="relative w-full rounded-3xl aspect-square overflow-hidden z-10 shadow-xl shadow-lilac-panel"
                        >
                            <img
                                src={Ose}
                                alt="Lavish Treats"
                                className="w-full h-full  object-cover hover:scale-105 duration-500"
                            />
                        </div>
                    </motion.aside>
        </div>
        <div className="mx-auto max-w-5xl text-center mt-12 md:mt-18">
          <h1 className="font-serif italic text text-xl md:text-3xl mb-4">
            "If I can create beautiful cakes for my own family, why not <br className="hidden md:block" /> create them for other families too?"
          </h1>
          <h2 className="font-cursive text-gold text-xl md:text-2xl font-semibold ">
            That thought became Lavish Treats.
          </h2>
          <p className=" text-text-body font-extralight text-sm md:text-base lg:text-lg mt-4">
            Today, our bakery creates handcrafted celebration cakes, freshly baked pastries, cupcakes,
            dessert boxes, meat pies and small chops for families, businesses and celebrations across
            Kettering.
            Every order is made with care, every recipe is prepared with quality ingredients and every
            customer is welcomed like family.
            To us, baking has never been just about food. It's about helping people celebrate the
            moments they'll remember forever.
          </p>
        </div>
      </section>
      <section className="bg-purple-deep py-12  px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="tracking-widest uppercase text-gold font-light">
            Our values
          </h1>
          <h2 className="font-serif text-purple-soft text-4xl lg:text-5xl mb-3 font-semibold">
            What Guides Everything We Bake
          </h2>
          <p className=" text-text-body font-extralight text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Every cake, pastry, and dessert we create is guided by our values of quality, care, and creativity. We believe that every order is an opportunity to bring joy to our customers and their loved ones.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-7xl mx-auto">
          <div className="rounded-2xl  border-[0.1px] border-gold overflow-hidden p-6 left"
          style={{background: 'rgba(255, 255, 255, 0.08)'}}
          >
           <h1 className="text-xl md:text-2xl font-normal  text-gold-light font-serif">Quality Without Compromise</h1>
            <p className="text-text-muted font-extralight text-sm lg:text-base mt-2">
              Exceptional baking begins with exceptional ingredients. Every product is carefully prepared to taste just as wonderful as it looks.
            </p>
          </div>
          <div className="rounded-2xl  border-[0.1px] border-gold overflow-hidden p-6 left"
          style={{background: 'rgba(255, 255, 255, 0.08)'}}
          >
            <h1 className="text-xl md:text-2xl font-normal  text-gold-light font-serif">Creativity</h1>
            <p className="text-text-muted font-extralight text-sm lg:text-base mt-2">
              Every celebration is unique, and every cake should be too. We love transforming ideas into beautiful edible creations that reflect your style.
            </p>
          </div>
          <div className="rounded-2xl  border-[0.1px] border-gold overflow-hidden p-6 left"
          style={{background: 'rgba(255, 255, 255, 0.08)'}}
          >
            <h1 className="text-xl font-semibold  text-gold font-serif">Customer Care</h1>
            <p className="text-text-muted font-extralight text-sm lg:text-base mt-2">
              Every customer deserves a warm, friendly experience. We take time to understand your ideas and ensure your order is everything you hoped for.
            </p>
          </div>
        </div>
      </section>

    </>
  )
}