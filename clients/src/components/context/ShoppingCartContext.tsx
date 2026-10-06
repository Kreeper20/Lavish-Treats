import { createContext, useContext, useState, type ReactNode } from "react";
import { Cart } from "../cart/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode;
};
type ShoppingCartContext = {

    openCart: () => void;
    closeCart: () => void;
    clearCart: () => void;
    cartQuantity: number;
    cartItems: cartItems[];
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    increaseCartQuantityWithMinimum: (id: number) => void; 
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    updateItemNote: (id: number, note: string) => void;
    
};

type cartItems = {
    id: number;
    quantity: number;
    note?: string;
    variants?: { size: string; price: number }[];
};


const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const UseShoppingCart = () => {
    return useContext(ShoppingCartContext);
};



export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useLocalStorage<cartItems[]>("shoppingCart", []);
    const [isOpen, setIsOpen] = useState(false);
    const minimumOrderQuantities: { [key: number]: number } = {
        6: 6,
        7: 6,
        13: 10, 
        14: 6, 
    };


    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const clearCart = () => setCartItems([]);
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
    const getMinimumOrderQuantity = (id: number): number => {
        return minimumOrderQuantities[id] || 1;
    };

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }
    const increaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const increaseCartQuantityWithMinimum = (id: number) => {
        const currentQuantity = getItemQuantity(id);
        const minimumQuantity = getMinimumOrderQuantity(id);

        if (currentQuantity < minimumQuantity) {
            setCartItems(currItems => {
                if (currItems.find(item => item.id === id) == null) {
                    return [...currItems, { id, quantity: minimumQuantity }]
                } else {
                    return currItems.map(item => {
                        if (item.id === id) {
                            return { ...item, quantity: item.quantity + 1 }
                        } else {
                            return item
                        }
                    })
                }
            })
        } else {
            increaseCartQuantity(id);
        }
    };

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const updateItemNote = (id: number, note: string) => {
        setCartItems(currItems =>
            currItems.map(item =>
                item.id === id ? { ...item, note } : item
            )
        );

    };
  



    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, increaseCartQuantityWithMinimum, removeFromCart, cartItems, cartQuantity, openCart, closeCart, updateItemNote, clearCart, }}>
            {children}
            <Cart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}