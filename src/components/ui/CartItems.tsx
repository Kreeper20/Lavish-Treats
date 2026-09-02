import { UseShoppingCart } from "../context/ShoppingCartContext";
import { ShopData } from "../../components/data/ShopData";
import { formatCurrency } from "../utils/formatCurrency";

type CartItemsProps = {
    id: number;
    quantity: number;
    note?: string;
};

export const CartItems = ({ id, quantity, note }: CartItemsProps) => {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, updateItemNote } = UseShoppingCart();
    const item = ShopData.find(item => item.id === id);
    if (item == null) return null;
    return (
        <div className="flex justify-between items-center gap-2 border p-2 rounded-xl bg-white shadow-xs border-lilac-500">
            <img src={item.image} alt="" className="h-18.75 w-31.25 rounded-xl "></img>
            <div className="me-auto">
                <div className="text-text-body text-xl font-semibold font-serif">
                    {item.name}{" "}
                </div>
                <div className="text-text-muted font-light text-xs">{formatCurrency(item.price)} each</div>
                <div className="mt-2 inline-flex items-center rounded-full border border-lilac-300 bg-white px-1 py-1  gap-2">
                    <button
                        type="button"
                        onClick={() => increaseCartQuantity(item.id)}
                        className="h-5 w-5 rounded-full hover:bg-accent-lavender/50 cursor-pointer text-text-body font-semibold leading-none hover:opacity-90 transition duration-200"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                    <span className="min-w-2 text-center text-sm font-medium text-text-muted">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => decreaseCartQuantity(item.id)}
                        disabled={quantity <= 1}
                        className="h-5 w-5 rounded-full hover:bg-accent-lavender/50 cursor-pointer text-text-body font-semibold leading-none hover:opacity-90 transition duration-200"
                        aria-label="Decrease quantity"
                    >
                        -
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
                <span onClick={() => removeFromCart(item.id)} className="hover:cursor-pointer text-xs text-text-muted hover:text-purple-primary transition duration-200 ml-2 underline">
                    Remove
                </span>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
        </div>
    );
}
