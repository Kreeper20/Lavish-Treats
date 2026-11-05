import { Route } from "../../routes/productDetails/$id";
import { UseShoppingCart } from "../context/ShoppingCartContext";
import { useAlertPopup } from "../context/Toast-context";
import { ShopData } from "../data/ShopData";
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "@tanstack/react-router";
import { IconArrowLeft, IconShoppingCartPlus, IconTruckDelivery, IconClock } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const ProductDetails = () => {
    const { increaseCartQuantityWithMinimum } = UseShoppingCart();
    const show = useAlertPopup();
    const { id } = Route.useParams();
    const product = ShopData.find((item) => item.id === Number(id));
    const [selectedSize, setSelectedSize] = useState(product?.size?.[0]);

    useEffect(() => {
        setSelectedSize(product?.size?.[0]);
    }, [product?.id]);

    if (!product) {
        return <main className="mx-auto max-w-7xl px-4 py-24 text-center text-text-body">Product not found.</main>;
    }

    const isCustomOrder = Boolean(product.link);
    const displayPrice = Array.isArray(product.price)
        ? product.price[Math.max(product.size?.indexOf(selectedSize ?? "") ?? 0, 0)]
        : product.price;
    const cakeIncludes = [
        "6-inch, two-layer celebration cake.",
        "Beautifully smooth American buttercream finish.",
        "Delicate piped buttercream borders.",
        "Gold Happy Birthday cake topper.",
        "Only in vanilla flavour.",
        "White or peach colour buttercream.",
        "Carefully boxed and presented, ready for your celebration."
    ];

    const handleAddToCart = () => {
        if (Array.isArray(product.price) && product.size) {
            const index = product.size.indexOf(selectedSize ?? "");
            if (index === -1) return;
            increaseCartQuantityWithMinimum(product.id, selectedSize, product.price[index]);
        } else if (typeof product.price === "number") {
            increaseCartQuantityWithMinimum(product.id, selectedSize, product.price);
        }
        show?.alertOpen(`${product.quantity}x ${product.name} has been added to your cart!`);
    };

    const relatedProducts = ShopData.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

    return (
        <main className="bg-lilac-50">
            <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:py-12">
                <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition hover:text-purple-primary">
                    <IconArrowLeft size={17} /> Back to shop
                </Link>

                <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)] lg:gap-16">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <div className="relative overflow-hidden border border-purple-light bg-lilac-100 p-3 md:p-5">
                            <img src={product.image} alt={product.name} width="800" height="800" className="aspect-square w-full object-cover" />
                            <div className="absolute bottom-7 left-7 bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-purple-deep shadow-sm">
                                {product.category}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-text-body">
                            <div className="border border-border-soft bg-white p-3"><IconTruckDelivery size={18} className="mb-2 text-purple-primary" /><span>Pick-up and delivery options available</span></div>
                            <div className="border border-border-soft bg-white p-3"><IconClock size={18} className="mb-2 text-purple-primary" /><span>Made fresh to order</span></div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="mb-5 flex flex-wrap items-center gap-2">
                            {product.preorder && <span className="bg-purple-deep px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-white">Pre-order</span>}
                            {product.category === "Christmas Menu" && <span className="bg-gold-panel px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-gold-dark">Christmas special</span>}
                        </div>
                        <h1 className="max-w-xl font-serif text-5xl font-semibold leading-none text-purple-deep md:text-6xl">{product.name}</h1>
                        <p className="mt-5 font-sans text-3xl font-semibold tabular-nums text-purple-bright">{formatCurrency(displayPrice)}</p>

                        <div className="mt-8 border-y border-border-soft py-6">
                            {product.size && (
                                <div>
                                    <label htmlFor="variant" className="mb-2 block text-sm font-semibold text-purple-deep">
                                        {product.size.length === 2 && product.size.includes("White") && product.size.includes("Peach") ? "Choose a colour" : "Choose an option"}
                                    </label>
                                    <select
                                        id="variant"
                                        name="variant"
                                        value={selectedSize}
                                        onChange={(event) => setSelectedSize(event.target.value)}
                                        className="w-full border border-border-soft bg-white px-4 py-3 text-sm text-text-body focus:border-purple-primary focus:outline-none"
                                    >
                                        {product.size.map((variant, index) => (
                                            <option key={variant} value={variant}>{variant} - {formatCurrency(product.price[index])}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="mt-6">
                                {isCustomOrder ? (
                                    <Link to={product.link!} className="flex w-full items-center justify-center bg-purple-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-purple-dark">Enquire about this cake</Link>
                                ) : (
                                    <button onClick={handleAddToCart} className="flex w-full items-center justify-center gap-2 bg-purple-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-purple-dark">
                                        <IconShoppingCartPlus size={19} /> Add to basket
                                    </button>
                                )}
                            </div>
                            <p className="mt-3 text-center text-xs text-text-muted">Secure payment processing</p>
                        </div>

                        {typeof product.description === "string" && <p className="mt-7 whitespace-pre-line text-base leading-7 text-text-body">{product.description}</p>}
                        {product.description === true && (
                            <div className="mt-7 text-base leading-7 text-text-body">
                                <p>Introducing The Lavish Classic, a beautifully finished 6-inch celebration cake from our Lavish Treats Signature Collection.</p>
                                <p className="mt-4">Designed for those who love something elegant without all the extras, this cake features smooth buttercream finishing, delicate piped details and a touch of gold for a timeless celebration look.</p>
                                <h2 className="mt-7 font-serif text-2xl font-semibold text-purple-deep">Cake includes</h2>
                                <ul className="mt-3 space-y-2 pl-5 marker:text-purple-primary">
                                    {cakeIncludes.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                                <p className="mt-6 text-sm"><strong className="text-purple-deep">Please note:</strong> This is a signature design with a set style. For a bespoke design, please enquire about a custom cake.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {relatedProducts.length > 0 && (
                <section className="border-t border-line bg-white px-4 py-16 md:px-8 lg:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 flex items-end justify-between gap-4">
                            <div><p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-purple-bright">Keep browsing</p><h2 className="font-serif text-4xl font-semibold text-purple-deep">You may also like</h2></div>
                            <Link to="/shop" className="hidden text-sm font-semibold text-purple-primary sm:block">View all treats</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Link key={relatedProduct.id} to="/productDetails/$id" params={{ id: String(relatedProduct.id) }} className="group overflow-hidden border border-line bg-lilac-50 transition hover:-translate-y-1 hover:shadow-lg">
                                    <img src={relatedProduct.image} alt={relatedProduct.name} width="400" height="400" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
                                    <div className="p-4"><h3 className="font-serif text-xl font-semibold leading-tight text-purple-deep">{relatedProduct.name}</h3><span className="mt-2 block font-sans text-sm font-semibold text-purple-bright">{formatCurrency(Array.isArray(relatedProduct.price) ? relatedProduct.price[0] : relatedProduct.price)}</span></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};
