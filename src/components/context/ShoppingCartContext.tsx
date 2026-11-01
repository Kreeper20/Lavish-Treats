import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
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
    cartItems: cartItem[];
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number, size?: string, price?: number) => void;
    increaseCartQuantityWithMinimum: (id: number, size: string | undefined, price: number) => void;
    decreaseCartQuantity: (id: number, size?: string, price?: number) => void;
    removeFromCart: ( id: number, size?: string, price?: number) => void;
    updateItemNote: (id: number, note: string) => void;
    addCartItem: (id: number, size: string | undefined, price: number) => void;

};

type cartItem = {
    id: number;
    quantity: number;
    note?: string;
    size?: string | undefined;
    price?: number;
};


const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const UseShoppingCart = () => {
    return useContext(ShoppingCartContext);
};



export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useLocalStorage<cartItem[]>(
        "shoppingCart",
        []
    );
    const [isOpen, setIsOpen] = useState(false);
    const minimumOrderQuantities: { [key: number]: number } = {
        6: 6,
        7: 6,
        13: 10,
        14: 6,
        16: 6,
    };


    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const clearCart = useCallback(() => setCartItems([]), [setCartItems]);
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
    const getMinimumOrderQuantity = (id: number): number => {
        return minimumOrderQuantities[id] || 1;
    };

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }
    const increaseCartQuantity = (id: number, size?: string, price?: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id && item.size === size && item.price === price) == null) {
                return [...currItems, { id, quantity: 1, size, price }]
            } else {
                return currItems.map(item => {
                    if (item.id === id && item.size === size && item.price === price) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const increaseCartQuantityWithMinimum = (id: number, size: string | undefined, price: number) => {
        const currentQuantity = getItemQuantity(id);
        const minimumQuantity = getMinimumOrderQuantity(id);

        if (currentQuantity < minimumQuantity) {
            setCartItems(currItems => {
                if (currItems.find(item => item.id === id && item.size === size && item.price === price) == null) {
                    return [...currItems, { id, quantity: minimumQuantity, size:size, price:price }] 
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
            addCartItem(id, size, price ); 
        }
    };

    const decreaseCartQuantity = (id: number, size?: string, price?: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id && item.size === size && item.price === price) == null) {
                return [...currItems, { id, quantity: 1, size, price }]
            } else {
                return currItems.map(item => {
                    if (item.id === id && item.size === size && item.price === price) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

   
    const removeFromCart = ( id: number,  size?: string,  price?: number
    ) => {
        setCartItems(items =>
            items.filter(
                item => !(
                        item.id === id &&
                        item.size === size &&
                        item.price === price
                    )
            )
        );
    };

    const updateItemNote = (id: number, note: string) => {
        setCartItems(currItems =>
            currItems.map(item =>
                item.id === id ? { ...item, note } : item
            )
        );

    };
    const addCartItem = (id: number, size: string | undefined, price: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id && item.size === size && item.price === price) == null) {
                return [...currItems, { id, quantity: 1 , size, price }]
            } else {
                return currItems.map(item => {
                    if (item.id === id && item.size === size && item.price === price) {
                        return { ...item, quantity: item.quantity + 1, size, price }
                    } else {
                        return item
                    }
                })
            }
        })
    }


            return (
                <ShoppingCartContext.Provider value={{addCartItem, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, increaseCartQuantityWithMinimum, removeFromCart, cartItems, cartQuantity, openCart, closeCart, updateItemNote, clearCart, }}>
                    {children}
                    <Cart isOpen={isOpen} />
                </ShoppingCartContext.Provider>
            )
        }