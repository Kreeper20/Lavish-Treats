import { UseShoppingCart } from "../context/ShoppingCartContext";
import { ShopData } from "../data/ShopData";
import { CartItems } from "./CartItems";
import { Link } from "@tanstack/react-router";

import { formatCurrency } from "../utils/formatCurrency";

type CartProps = {
  isOpen: boolean;
};

export const Cart = ({ isOpen }: CartProps) => {
  const { closeCart, cartItems, cartQuantity, } = UseShoppingCart();
  const subtotal = cartItems.reduce((total, cartItem) => {
    const item = ShopData.find(item => item.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const total = formatCurrency(subtotal);
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-purple-deep/85 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeCart}
      />


      <aside
        className={`fixed right-0 top-0 z-50 flex h-full max-h-screen w-full max-w-md flex-col bg-lilac-50 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b border-line p-6">
          <div className="me-auto">
            <h2 className="text-2xl font-serif font-semibold text-purple-deep">
              Your Basket
            </h2>
            <p className="text-sm text-text-muted">
              {cartQuantity} item{cartQuantity !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="text-text-body hover:text-purple-primary transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {cartItems.length === 0 ? (
            <div className="text-center">
              <h1 className="text-2xl font-serif mb-2">Your cart is empty</h1>
              <p className="text-text-body text-sm font-light max-w-xs mx-auto">Browse the shop for pastries, desserts, drinks, gift boxes and party packs.</p>
              <Link to="/shop" onClick={closeCart} className="bg-purple-primary text-white  uppercase text-xs px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out mt-4 inline-block">
                Go to shop
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItems
                  key={item.id}
                  id={item.id}
                  quantity={item.quantity}
                  note={item.note}
                />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-line bg-lilac-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-purple-deep">Order Total</h2>
              <p className="text-lg font-semibold text-purple-deep">
                {total}
              </p>
            </div>
            <p className="text-sm text-text-muted mb-4">
              Collection from Kettering. Payment is arranged directly with us once your order is confirmed.
            </p>
            <Link to="/checkout" onClick={closeCart} className="bg-purple-primary uppercase text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out w-full block text-center">
              Checkout
            </Link>
          </div>
        )}

      </aside>
    </>
  );
};