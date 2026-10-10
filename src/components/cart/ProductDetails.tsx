import { Route } from "../../routes/productDetails/$id";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { useAlertPopup } from "../context/Toast-context";
import { ShopData } from "../data/ShopData"
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react"
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "@tanstack/react-router";



export const ProductDetails = () => {
    const { increaseCartQuantityWithMinimum, increaseCartQuantity, decreaseCartQuantity, cartItems } = UseShoppingCart();
    const show = useAlertPopup();



    const { id } = Route.useParams();
    const product = ShopData.find((p) => p.id === Number(id));
    const link = ShopData.find((p) => p.id === Number(id))?.link;
    const quantity = cartItems.find((item) => item.id === product?.id)?.quantity || 0;

    if (!product) {
        return <p>Product not found.</p>;
    }


    return (
        <>
            <section className="px-4 lg:px-24 py-12 max-w-7xl mx-auto">
                <div className=" mb-8">
                    <a href="/shop" className="text-purple-600 hover:text-purple-800 font-semibold">
                        &larr; Back to Shop
                    </a>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-3">
                    <div className="p-4 bg-accent-lavender dark:bg-lilac-50 rounded-xl">
                        <div className=" h-full max-h-122.5 rounded-xl flex items-center justify-center overflow-hidden">
                            <img src={product.image} alt={product.name} className="drop-shadow-md hover:cursor-zoom-in drop-shadow-gray-900 w-full h-full object-cover" />

                        </div>
                    </div>
                    <div className="p-4">
                        <div className="mb-6 ">
                            <h1 className="text-xl lg:text-2xl mb-1 font-semibold">{product.name}</h1>
                            {formatCurrency(product.price)}
                        </div>
                        <p className="text-text-dim font-extralight mt-2 max-w-xs">{product.description}</p>

                        {link ? (
                            <Link to={link}>
                                <button
                                    aria-label={`Custom order for ${product.name}`}
                                    className="text-xs font-semibold mt-6  text-purple-primary border border-purple-primary px-4 py-2 rounded-full hover:bg-purple-primary hover:text-white transition duration-300">
                                    Custom Order
                                </button>
                            </Link>
                        ) : (
                            <div className="mt-6 flex items-center gap-4">
                                <div className=" inline-flex items-center border border-lilac-300 bg-white px-1 py-1  gap-6">
                                    <span className="min-w-2 text-center ml-3 text-sm font-medium text-text-muted">
                                        {quantity}
                                    </span>
                                    <div className="flex flex-col">
                                        <button
                                            type="button"
                                            onClick={() => increaseCartQuantity(product.id)}
                                            aria-label="Increase quantity"
                                            className=" rounded-t-md bg-accent-lavender/50 cursor-pointer text-text-body leading-none border-b border-purple-deep/25"
                                        >
                                            <IconChevronUp className="h-4 w-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => decreaseCartQuantity(product.id)}
                                            aria-label="Decrease quantity"
                                            disabled={quantity <= 1}
                                            className=" rounded-b-md bg-accent-lavender/50 cursor-pointer text-text-body leading-none border-t border-purple-deep/25"
                                        >
                                            <IconChevronDown className="h-4 w-4" />
                                        </button>
                                    </div>


                                </div>


                                <button onClick={() => {
                                    increaseCartQuantityWithMinimum(product.id);
                                    show?.alertOpen(`${product.quantity}x ${product.name} has been added to your cart!`);
                                }}
                                    className="bg-purple-primary text-white px-6 py-2.5 cursor-pointer  hover:bg-purple-dark transition delay-100 duration-300 ease-in-out">
                                    Add to Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="px-4 lg:px-24 py-12 max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
                <div className="grid grid-cols-2  lg:grid-cols-4 gap-6">
                    {ShopData.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4).map((relatedProduct) => (
                        <Link
                            key={relatedProduct.id}
                            to="/productDetails/$id"
                            params={{ id: String(relatedProduct.id) }}
                        >
                            <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{relatedProduct.name}</h3>
                                    <span className="text-purple-deep">£{relatedProduct.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </section >
        </>

    )
}
