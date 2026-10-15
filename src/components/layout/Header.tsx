import Mobilenav from "./Nav";
import { Logo } from "../utils/imports";
import { Link } from "@tanstack/react-router";
import { IconShoppingBag } from "@tabler/icons-react";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { motion } from "framer-motion";

export const Navbar = () => {
  const { openCart, cartQuantity } = UseShoppingCart();
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className=" border-b border-line py-6 px-4 md:px-8 lg:px-12 sticky top-0 z-50 bg-white"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-18 justify-between w-full lg:w-auto">
          <Link to="/" className="flex items-center cursor-pointer">
            <motion.img
              whileHover={{ rotate: -4, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              src={Logo}
              loading="lazy"
              alt="Lavish Treats Logo"
              className="max-w-16 block cursor-pointer"
            />
          </Link>
          <div className="">
            <Mobilenav />
          </div>
        </div>
        <div className="hidden gap-6 lg:flex items-center">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            className="rounded-full border cursor-pointer items-center justify-center flex hover:bg-purple-mid hover:text-white transition delay-100 duration-300 ease-in-out"
          >
            <IconShoppingBag className="w-6 h-6" aria-label="Shopping Cart" />
            {cartQuantity > 0 && (
              <div
                className="rounded-full bg-purple-mid flex justify-center items-center"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  )

}