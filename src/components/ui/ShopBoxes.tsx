type ShopBoxesProps = {
    id: number;
    name: string;
    description?: string;
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
import { ShopData } from "../data/ShopData";

export const ShopBoxes = ({ id, name, description, imageUrl, price, link, product, }: ShopBoxesProps & { product: any;}) => {
    const show = useAlertPopup();
    const { increaseCartQuantityWithMinimum, } = UseShoppingCart();
     const item = ShopData.find((item) => item.id === id);
        if (item == null) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-b-2xl overflow-hidden flex h-full flex-col group"
            >
                <Link to={'/productDetails/' + product.id}>
                    <div className="overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={name}
                            width="400"
                            height="400"
                            className="w-full h-64 object-cover group-hover:scale-105 duration-700 ease-out"
                        />
                    </div>

                    <div className="px-1 pt-4 pb-1 flex-1">
                        <h1 className="text-lg font-medium font-sans text-purple-deep tracking-tight">
                            {name}
                        </h1>
                        <p className="text-text-dim font-light text-sm line-clamp-1 mt-0.5">
                            {description}
                        </p>
                    </div>
                </Link>



                <div className="px-1 pb-2 pt-3 border-t border-border-soft mt-auto flex items-center justify-between gap-3">
                    <span className="text-xl font-semibold text-purple-bright tabular-nums">
                        {formatCurrency(price)}
                    </span>
                    {link ? (
                        <Link to={link}>
                            <button
                            aria-label={`Custom order for ${name}`}
                             className="text-xs font-semibold text-purple-primary border border-purple-primary px-4 py-2 rounded-full hover:bg-purple-primary hover:text-white transition duration-300">
                                Custom Order
                            </button>
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                increaseCartQuantityWithMinimum(id);
                                show?.alertOpen(`${product.quantity}x ${name} has been added to your cart!`);
                            }}
                            aria-label={`Add ${name} to cart`}
                            className="bg-purple-primary hover:cursor-pointer text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-purple-dark transition duration-300 shrink-0"
                        >
                            <IconShoppingCartPlus className="h-5 w-5" />
                        </button>
                    )}
    
                </div>
            </motion.div>
        </>
    );
};