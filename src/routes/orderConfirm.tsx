import { createFileRoute, Link } from '@tanstack/react-router'
import { IconShoppingBagCheck, IconChevronDown } from '@tabler/icons-react'
import { UseShoppingCart } from '../components/context/ShoppingCartContext';
import { ShopData } from '../components/data/ShopData';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../components/utils/formatCurrency';
import { getDiscountedTotal } from '../components/promotions/promotion';

export const Route = createFileRoute('/orderConfirm')({
  component: RouteComponent,
})

function RouteComponent() {
  const { cartItems, clearCart } = UseShoppingCart();
  const subtotal = cartItems.reduce((total, cartItem) => {
    const item = ShopData.find(item => item.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
}, 0);

const total = getDiscountedTotal(subtotal);
 

  useEffect(() => {
    return () => {
      clearCart();
    };
  }, []);
  
  const [summaryOpen, setSummaryOpen] = useState(true);
  return (
    <>
      <div className="space-y-5 max-w-5xl mx-auto p-6 lg:p-12">
        <div className="flex flex-col items-center justify-center gap-3">
          <IconShoppingBagCheck className="w-16 h-16 text-purple-primary" />
          <h1 className="text-2xl font-semibold text-purple-deep">Thank you for your order!</h1>
          <p className="text-text-body text-sm font-light max-w-xs text-center">Your order has been successfully placed. We will send you a confirmation email shortly.</p>
        </div>
        <div className="border rounded-xl border-line bg-lilac-50 p-6">
          <div className="flex items-center justify-between mb-4 border-b border-line pb-2">
            <h2 className="text-lg font-semibold text-purple-deep">Order Summary</h2>
            <IconChevronDown onClick={() => setSummaryOpen(!summaryOpen)} className={`w-5 h-5 text-purple-primary transition-transform ${summaryOpen ? 'rotate-180' : ''}`} />
          </div>
          <div className={`transition-all duration-300 ${summaryOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
            <div className="flex flex-col mb-4 transition">
              <div className="space-y-2 flex flex-col justify-between gap-6">
                {cartItems.map((cartItem) => {
                  const item = ShopData.find(item => item.id === cartItem.id);
                  if (!item) return null;
                  return (
                    <>
                      <div className="flex items-center gap-6 p-2 ">
                        <img src={item.image} alt="" className="h-18.75 w-31.25 rounded-xl "></img>
                        <div className="me-auto">
                          <div className="text-text-body text-xl font-semibold font-serif">
                            {item.name}{" "}
                          </div>
                          <div className="text-text-muted font-light text-xs left-0">{formatCurrency(getDiscountedTotal(item.price))} each</div>
                          <span className="min-w-2 text-center text-sm font-medium text-text-muted">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <p className="text-text-body text-lg font-semibold">{formatCurrency(getDiscountedTotal(item.price) * item.quantity)}</p>
                      </div>
                      <div className="border-t border-line" />
                    </>
                  );
                })}
                <div className="flex items-center justify-between mt-4">
                  <h2 className="text-base font-semibold text-purple-deep">Order Total</h2>
                  <p className="text-base font-semibold text-purple-deep">
                    {formatCurrency(total)}

                  </p>
                </div>
              </div>
            </div>
          </div>




        </div>
      </div>

      <div className="flex justify-center">
        <Link to="/shop" onClick={clearCart} className="px-4 py-2 bg-purple-primary text-white rounded-md hover:bg-purple-deep focus:outline-none focus:ring-2 focus:ring-purple-primary">
          Continue Shopping
        </Link>


      </div>
    </>
  )
}

