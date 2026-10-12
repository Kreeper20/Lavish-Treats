import { ShopBoxes } from "../ui/ShopBoxes"
import { ShopData } from "../data/ShopData"
import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"

export const Shop = () => {
  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const categories = [
    "Celebration Cakes",
    "Cupcakes & Cake Treats",
    "Pastries & Small Chops",
    "Treat Boxes & Gifts",
  ];

  return (
    <>
      <section className="bg-lilac-50 py-12 lg:py-28">
        <motion.div
          initial="hidden" animate="visible" variants={motionVariants}
          className="text-center items-center px-4 mx-auto"
        >
          <motion.h1 variants={motionVariants}
            className=" text-purple-bright font-light mb-3 uppercase tracking-widest">Shop</motion.h1>
          <motion.h2 variants={motionVariants}
            className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
            Order Your Treats
          </motion.h2>
          <p className=" text-text-body font-extralight text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Add what you'd like to your basket, tell us when you'd like to collect it, and we'll confirm everything with you directly. Payment is arranged with us once your order is confirmed.          </p>
        </motion.div>

        <div className=" px-4 md:px-8 mt-6 md:mt-12">
          <div className="mx-auto max-w-7xl space-y-14">
            {categories.map((category) => {
              const items = ShopData.filter((item) => item.category === category);

              return (
                <section key={category}>
                  <h2 className="mb-6 text-center font-serif text-3xl font-semibold text-purple-deep md:text-4xl">
                    {category}
                  </h2>
                  <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-4">
                    {items.map((item) => (
                      <ShopBoxes
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        imageUrl={item.image}
                        price={item.price}
                        product={item}
                        link={item.link}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-12 max-w-6xl mx-auto bg-lilac-panel grid grid-cols-1 lg:grid-cols-2 rounded-2xl p-6 md:p-12 items-center">
            <div className="text-left">
              <h2 className="text-purple-deep font-serif text-3xl lg:text-4xl mb-3 font-semibold">
                Got a Custom Order?
              </h2>
              <p className=" text-text-body font-extralight text-sm md:text-basel g:text-lg max-w-2xl ">
                If you have something specific in mind, we can create a custom order for you. Please contact us to discuss your requirements and we'll be happy to assist you.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-start lg:justify-center gap-2 text-center  items-center mt-6 lg:mt-0 ">
              <Link to="/custom-order" className="bg-purple-primary w-full  text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out ">
                ENQUIRE NOW
              </Link>
              <Link to="/cakes" className=" border border-purple-primary w-full text-purple-primary px-6 py-3 rounded-full hover:bg-purple-dark hover:text-white transition delay-100 duration-300 ease-in-out">
                EXPLORE OUR BAKERY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

