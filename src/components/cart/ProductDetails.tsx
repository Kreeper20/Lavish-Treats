import { Route } from "../../routes/productDetails/$id";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { useAlertPopup } from "../context/Toast-context";
import { ShopData } from "../data/ShopData"
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "@tanstack/react-router";
import {  useState } from "react";



export const ProductDetails = () => {
    const { increaseCartQuantityWithMinimum, } = UseShoppingCart();
    const show = useAlertPopup();



    const { id } = Route.useParams();
    const product = ShopData?.find((p) => p.id === Number(id));
    const link = ShopData.find((p) => p.id === Number(id))?.link;
    const [selectedSize, setSelectedSize] = useState(product?.size ? product.size[0] : undefined);

    if (!product) {
        return <p>Product not found.</p>;
    }
    

    const handleAddToCart = () => {
        if (Array.isArray(product?.price) && Array.isArray(product?.size)) {
            // product with sizes: find the chosen size, use the price at the same index
            const index = product.size.indexOf(selectedSize!);
            if (index === -1) return; // no size picked yet
            increaseCartQuantityWithMinimum(product.id, selectedSize, product.price[index] );
        } else if (typeof product?.price === "number") {
            // product with a single price, no sizes
             increaseCartQuantityWithMinimum(product.id, selectedSize, product.price);
        }
    };
   



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
                            <img src={product.image} alt={product.name} width="600" height="600" className="drop-shadow-md hover:cursor-zoom-in drop-shadow-gray-900 w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="mb-6 ">
                            {product.preorder && (
                                <div className="bg-purple-lighter text-purple-900 text-sm font-bold py-1 px-2 rounded-full inline-block mb-2">
                                    Pre-order
                                </div>
                            )}
                            <h1 className="text-xl lg:text-2xl mb-1 font-semibold">{product.name}</h1>
                            <p className="text-text-dim font-extralight">
                                {formatCurrency(Array.isArray(product.price) ? product.price[0] : product.price)}
                            </p>
                        </div>
                        <p className="text-text-dim font-extralight mt-2 max-w-xs whitespace-pre-line">{product.description}</p>

                        {product.size && (
                            <div className="mt-6">
                                <label htmlFor="variant" className="block text-sm font-medium text-text-dim mb-1">
                                    Select Size:
                                </label>
                                <select
                                    id="variant"
                                    name="variant"
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                    className="block w-fit rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-purple-primary focus:outline-none focus:ring-purple-primary sm:text-sm"
                                >
                                    {product.size.map((variant, index) => (
                                        <option key={index} value={variant}
                                        >
                                            {variant} - {formatCurrency(product.price[index])}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
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
                                <button onClick={() => {
                                    handleAddToCart();
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
                                <img src={relatedProduct.image} alt={relatedProduct.name} width="400" height="400" className="w-full h-48 object-cover" />
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
