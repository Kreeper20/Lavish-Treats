import { SixCupCake } from "../utils/imports"
import { CakeBoxes } from "../ui/CakesBoxes"
import { CakeData } from "../data/CakeBoxesData"
import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import confetti from "../../assets/bg/confetti.svg"
export const Cakes = () => {
  const motionVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -20 },
    visible: { opacity: 1, scale: 1, x: 0 },
  };
  return (
    <>
      <section className=" py-12 lg:py-28 px-6 text-shadow-2xs"
      style={{ backgroundImage: `url(${confetti})`, backgroundSize: "cover", backgroundPosition: "center"}}
      >
        <motion.div
          initial="hidden" animate="visible" variants={motionVariants}
          className="mx-auto max-w-7xl items-center text-center">
          <motion.h1 variants={motionVariants}
            className="text-purple-bright font-light mb-3 uppercase tracking-widest">
            Celebration Cakes
          </motion.h1>
          <motion.h2
            variants={motionVariants}
            className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
            Cakes for Every Occasion
          </motion.h2>
          <p className=" text-text-body font-extralight text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Beautifully handcrafted buttercream cakes designed to become the centrepiece of your celebration. Every cake is made fresh to order and customised to match your theme, colours, and occasion.
          </p>
          <div className="flex items-center max-w-xl mt-6 mx-auto justify-center gap-y-2 gap-x-4 flex-col md:flex-row">
            <Link to="/custom-order" className="bg-purple-primary w-full  text-white uppercase  px-6 py-3 rounded-full  hover:bg-purple-dark transition duration-300 ease-in-out">
              Enquire about your Cake
            </Link>
            <Link to="/shop" className="border border-purple-primary text-purple-primary w-full uppercase  px-6 py-3 rounded-full hover:bg-purple-primary hover:text-white transition duration-300 ease-in-out">
              Explore Shop
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="testimonials py-12 items-center">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-gold font-cursive font-light mb-3 text-2xl md:text-4xl uppercase tracking-widest">
            Flavours / Extras
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 justify-center max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-border-soft overflow-hidden p-6">
              <h1 className="text-xl font-semibold  text-purple-deep uppercase ">Available Flavours</h1>
              <p className="text-text-dim text-lg font-extralight mt-2">Red Velvet
                <span className="block">Carrot Cake</span>
                <span className="block">Classic Vanilla</span>
                <span className="block">Rich Chocolate</span>
                <span className="block">Cookies & Cream</span>
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-border-soft overflow-hidden p-6">
              <h1 className="text-xl font-bold  text-purple-deep uppercase">Optional Extras</h1>
              <p className="text-text-dim text-lg font-extralight mt-2">
                Cake Spheres
                <span className="block">Fondant Toppers</span>
                <span className="block">Dried Florals/Feathers</span>
                <span className="block">Gold Leaf Details/Metallic Finishes</span>
                <span className="block">Personalised Names/Age Toppers</span>
              </p>
            </div>
          </div>
        </div>

        <div className="md:px-6">
          <div className="text-center font-cursive text-5xl md:text-6xl text-gold mt-6">
            <h1>Starting Prices</h1>
          </div>
          <div className="py-8 text-center mt-6 bg-purple-light p-6 md:rounded-2xl">
            <div className="mx-auto max-w-3xl text-center grid grid-cols-1 md:grid-cols-2 gap-6">

              {CakeData.map((cake) => (
                <CakeBoxes
                  key={cake.image}
                  name={cake.name}
                  description1={cake.description1}
                  description2={cake.description2}
                  description3={cake.description3}
                  price1={cake.price1}
                  price2={cake.price2}
                  price3={cake.price3}
                  image={cake.image}
                />
              ))}
              <div className="relative">
                <img src={SixCupCake} className="w-full h-80 object-cover rounded-2xl" />
                <div className="bg-white shadow-xl rounded-xl p-6 -mt-16 mx-6 relative z-10">
                  <h3 className="text-xl font-bold tracking-wide uppercase text-left">Pastries/Desserts</h3>
                  <p className="text-left mb-4">View our menu here:</p>
                  <Link
                    to="/shop" className="bg-white cursor-pointer shadow-sm shadow-accent-lavender text-purple-deep uppercase  px-6 py-3 rounded-full mt-6 hover:bg-purple-deep hover:text-white transition duration-300 ease-in-out">
                    View offerings
                  </Link>
                </div>
              </div>
            </div>
            <p className="text-white font-extralight mt-6 text-center">
              *Please note that final pricing may vary depending on design complexity.
            </p>
          </div>
        </div>
      </section>


    </>
  )
}