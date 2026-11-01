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
import { useState } from "react";

export const ShopBoxes = ({ id, name, description, imageUrl, link, product, }: ShopBoxesProps & { product: any; }) => {
    const [selectedSize, setSelectedSize] = useState(product?.size ? product.size[0] : undefined);
    const displayPrice = Array.isArray(product.price)
        ? product.price[Math.max(product.size?.indexOf(selectedSize ?? "") ?? 0, 0)]
        : product.price;
    const show = useAlertPopup();

    const handleAddToCart = () => {
        if (Array.isArray(product?.price) && Array.isArray(product?.size)) {
            // product with sizes: find the chosen size, use the price at the same index
            const index = product.size.indexOf(selectedSize!);
            if (index === -1) return; // no size picked yet
            increaseCartQuantityWithMinimum(product.id, selectedSize, product.price[index]);
        } else if (typeof product?.price === "number") {
            // product with a single price, no sizes
            increaseCartQuantityWithMinimum(product.id, selectedSize, product.price);
        }
    };
    const { increaseCartQuantityWithMinimum } = UseShoppingCart();
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
                    <div className="relative overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={name}
                            width="400"
                            height="400"
                            className="h-64 w-full object-cover group-hover:scale-105 duration-700 ease-out"
                        />

                        {product.preorder && (
                            <div className="absolute right-2 top-2 z-10 rounded-full bg-purple-lighter text-purple-900 px-2 py-1 text-xs font-bold ">
                                Pre-order
                            </div>
                        )}
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
                    {product.size ? (
                        <span className="text-xl font-semibold text-purple-bright tabular-nums">
                            {formatCurrency(displayPrice)}
                        </span>
                    ) : (
                        <span className="text-xl font-semibold text-purple-bright tabular-nums">
                            {formatCurrency(displayPrice)}
                        </span>
                    )}
                    {product.size && product.size.length > 0 && (
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        >
                            {product.size.map((s: string) => (
                                <option key={s} value={s}>
                                    {s} - {formatCurrency(product.price?.[product.size.indexOf(s)] ?? 0)}
                                </option>
                            ))}
                        </select>
                    )}
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
                                handleAddToCart();
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