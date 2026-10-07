import { UseShoppingCart } from "../context/ShoppingCartContext";
import { ShopData } from "../data/ShopData";
import { formatCurrency } from "../utils/formatCurrency";
import { IconTrash } from "@tabler/icons-react";

type CartItemsProps = {
    id: number;
    quantity: number;
    note?: string;
};

export const CartItems = ({ id, quantity, note }: CartItemsProps) => {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, updateItemNote } =
        UseShoppingCart();
    const item = ShopData.find((item) => item.id === id);
    if (item == null) return null;

    return (
        <div className="flex items-start justify-between gap-3 border border-lilac-300 bg-white p-3 rounded-xl shadow-xs">
            <div className="relative shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover border border-lilac-300"
                />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-deep text-[11px] font-semibold text-white">
                    {quantity}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-text-body text-xl font-semibold font-serif">
                        {item.name}
                    </p>
                    <span className="shrink-0 font-semibold text-purple-dark">
                        {formatCurrency(item.price * quantity)}
                    </span>
                </div>

                <div className="text-text-muted font-light text-xs">
                    {formatCurrency(item.price)} each
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full border border-lilac-300 bg-white px-1 py-1 gap-2">
                        <button
                            type="button"
                            onClick={() => decreaseCartQuantity(item.id)}
                            disabled={quantity <= 1}
                            className="h-5 w-5 rounded-full text-text-body font-semibold leading-none transition duration-200 hover:bg-accent-lavender/50 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            aria-label={`Decrease quantity of ${item.name}`}
                        >
                            -
                        </button>
                        <span
                            className="min-w-2 text-center text-sm font-medium text-text-muted"
                            aria-live="polite"
                        >
                            {quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => increaseCartQuantity(item.id)}
                            className="h-5 w-5 rounded-full text-text-body font-semibold leading-none transition duration-200 hover:bg-accent-lavender/50 hover:opacity-90"
                            aria-label={`Increase quantity of ${item.name}`}
                        >
                            +
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-text-muted underline transition duration-200 hover:cursor-pointer hover:text-purple-primary"
                    >
                        <IconTrash className="h-4 w-4 text-red-500" />
                    </button>
                </div>

                {item.allowsPersonalisation && (
                    <input
                        type="text"
                        value={note ?? ""}
                        onChange={(event) => updateItemNote(item.id, event.target.value)}
                        placeholder="Message on cake / personalisation"
                        className="mt-3 w-full rounded-xl border border-lilac-300 bg-lilac-50 px-4 py-3"
                    />
                )}
            </div>
        </div>
    );
};