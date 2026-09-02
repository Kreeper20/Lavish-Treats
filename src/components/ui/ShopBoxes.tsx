type ShopBoxesProps = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    link?: string;
};
import { motion } from "framer-motion";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useAlertPopup } from "../context/Toast-context";
import { IconShoppingCartPlus } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router";

export const ShopBoxes = ({ id, name, description, imageUrl, price, link }: ShopBoxesProps) => {

    const show = useAlertPopup();
    const {increaseCartQuantityWithMinimum } = UseShoppingCart();


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, }} whileInView={{ opacity: 1, scale: 1, }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-border-soft overflow-hidden flex h-full flex-col">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-52 object-cover hover:scale-105 duration-500"
            />

            <div className="p-6 border-t border-border-soft flex-1">
                <h1 className="text-lg md:text-2xl font-medium font-sans text-purple-deep">{name}</h1>
                <p className="text-text-dim font-extralight text-sm md:text-base  whitespace-pre-line">{description}</p>
            </div>
            <div className="p-6 border-t border-border-soft mt-auto justify-between items-center">
                <h2 className="text-base justify-self-start flex text-left text-purple-bright font-normal mb-1">{formatCurrency(price)}</h2>
                {link ? (
                    <Link to={link}>
                    <button
                        className="bg-purple-primary w-full hover:cursor-pointer text-xs md:text-base font-semibold text-white px-6 py-3 rounded-xl hover:bg-purple-dark transition delay-100 duration-300 ease-in-out">
                        Custom Order Form
                    </button>
                    </Link>
                ) : (
                    <button onClick={() => {
                        increaseCartQuantityWithMinimum(id);
                        show?.alertOpen(`${name} has been added to your cart!`);}}
                         className="bg-purple-primary w-full hover:cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-purple-dark transition delay-100 duration-300 ease-in-out">
                        <IconShoppingCartPlus className="h-4 w-4 md:w-5 md:h-5 inline-block" /> Add
                    </button>
                )}

            </div>
        </motion.div>
    );
};

