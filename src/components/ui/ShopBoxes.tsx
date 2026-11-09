type ShopBoxesProps = {
    id: number;
    name: string;
    description?: Description;
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
import { type Description } from "../data/productDescription";
import { descriptionSummary } from "../data/productDescriptions";


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
                className="group flex h-full rounded-t-2xl flex-col overflow-hidden border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

                <Link to={'/productDetails/' + product.id}>
                    <div className="relative overflow-hidden rounded-2xl">
                        <img
                            src={imageUrl}
                            alt={name}
                            width="400"
                            height="400"
                            className="aspect-square w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        />

                        <div className="grid grid-cols-2 gap-2 p-3">
                            {product.preorder && (
                                <div className="absolute left-3 top-3 z-10 bg-white px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-purple-deep shadow-sm">
                                    Pre-order
                                </div>
                            )}
                            {product.category === "Christmas Menu" && (
                                <div className="absolute right-3 top-3 z-10 bg-purple-deep px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                                    Seasonal
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="flex-1 px-4 pb-3 pt-4 ">
                        <h2 className="line-clamp-2  font-serif text-xl font-semibold leading-tight text-purple-deep">
                            {name}
                        </h2>
                        <p className="mt-2 line-clamp-2 min-h-10 text-sm font-light leading-5 text-text-dim">
                            {descriptionSummary(description)}
                        </p>
                    </div>
                </Link>



                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border-soft px-4 py-4">
                    <span className="font-sans text-lg font-semibold tabular-nums text-purple-bright">
                        {formatCurrency(displayPrice)}
                    </span>
                    {product.size && product.size.length > 0 && (
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            aria-label={`Choose an option for ${name}`}
                            className="min-w-0 flex-1 border rounded-xl cursor-pointer border-border-soft bg-lilac-50 p-2 text-xs text-text-body focus:border-purple-primary focus:outline-none"
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
                                className="border rounded-xl cursor-pointer border-purple-primary px-3 py-2 text-xs font-semibold text-purple-primary transition duration-300 hover:bg-purple-primary hover:text-white">
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
                            className="flex h-10 w-10 shrink-0 rounded-xl cursor-pointer items-center justify-center bg-purple-primary text-white transition duration-300 hover:bg-purple-dark"
                        >
                            <IconShoppingCartPlus className="h-5 w-5" />
                        </button>
                    )}

                </div>
            </motion.div>
        </>
    );
};